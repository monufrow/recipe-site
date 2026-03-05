const express = require('express');
const router = express.Router();
const db = require('../database');

// Recipes page
router.get('/', (req, res) => {
    const sql = `
        SELECT * FROM recipes
        ORDER BY protein_type, name
    `;

    db.query(sql, (err, results) => {
        if (err) throw err;

        // Group by protein type
        const grouped = {};

        results.forEach(recipe => {
            if (!grouped[recipe.protein_type]) {
                grouped[recipe.protein_type] = [];
            }
            grouped[recipe.protein_type].push(recipe);
        });

        res.render('pages/recipes', {
            groupedRecipes: grouped
        });
    });
});

// Get for adding new recipe
router.get('/add', (req, res) => {
    const sql = 'SELECT * FROM ingredients ORDER BY name';

    db.query(sql, (err, ingredients) => {
        if (err) throw err;

        res.render('pages/addRecipe', {
            ingredients: ingredients
        });
    });
});
// Post for adding new recipe
router.post('/add', (req, res) => {
    const { name, protein_type, instructions } = req.body;

    let selectedIngredients = req.body.ingredients;

    // Normalize ingredient selection
    if (!selectedIngredients) {
        selectedIngredients = [];
    } else if (!Array.isArray(selectedIngredients)) {
        selectedIngredients = [selectedIngredients];
    }

    const recipeSql = `
        INSERT INTO recipes (name, protein_type, instructions)
        VALUES (?, ?, ?)
    `;

    db.query(recipeSql, [name, protein_type, instructions], (err, result) => {
        if (err) throw err;

        const recipeId = result.insertId;

        if (selectedIngredients.length === 0) {
            return res.redirect('/recipes/' + recipeId);
        }

        const values = selectedIngredients.map(ingredientId => {
            return [recipeId, ingredientId];
        });

        const joinSql = `
            INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
            VALUES ?
        `;

        db.query(joinSql, [values], (err) => {
            if (err) throw err;

            res.redirect('/recipes/' + recipeId);
        });
    });
});

//Edit recipe page
router.get('/:id/edit', (req, res) => {
    const recipeId = req.params.id;

    const recipeSql = `
        SELECT * FROM recipes WHERE id = ?
    `;

    const ingredientsSql = `
        SELECT * FROM ingredients ORDER BY name
    `;

    const selectedSql = `
        SELECT ingredient_id
        FROM recipe_ingredients
        WHERE recipe_id = ?
    `;

    db.query(recipeSql, [recipeId], (err, recipeResults) => {
        if (err) throw err;
        if (recipeResults.length === 0) return res.send("Recipe not found");

        db.query(ingredientsSql, (err, allIngredients) => {
            if (err) throw err;

            db.query(selectedSql, [recipeId], (err, selectedIngredients) => {
                if (err) throw err;

                const selectedIds = selectedIngredients.map(i => i.ingredient_id);

                res.render('pages/editRecipe', {
                    recipe: recipeResults[0],
                    ingredients: allIngredients,
                    selectedIds: selectedIds
                });
            });
        });
    });
});
// Post for editing recipe
router.post('/:id/edit', (req, res) => {
    const recipeId = req.params.id;
    const { name, protein_type, instructions } = req.body;

    let selectedIngredients = req.body.ingredients;

    if (!selectedIngredients) {
        selectedIngredients = [];
    } else if (!Array.isArray(selectedIngredients)) {
        selectedIngredients = [selectedIngredients];
    }

    const updateSql = `
        UPDATE recipes
        SET name = ?, protein_type = ?, instructions = ?
        WHERE id = ?
    `;

    db.query(updateSql, [name, protein_type, instructions, recipeId], (err) => {
        if (err) throw err;

        const deleteJoinSql = `
            DELETE FROM recipe_ingredients
            WHERE recipe_id = ?
        `;

        db.query(deleteJoinSql, [recipeId], (err) => {
            if (err) throw err;

            if (selectedIngredients.length === 0) {
                return res.redirect('/recipes/' + recipeId);
            }

            const values = selectedIngredients.map(ingredientId => {
                return [recipeId, ingredientId];
            });

            const insertJoinSql = `
                INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
                VALUES ?
            `;

            db.query(insertJoinSql, [values], (err) => {
                if (err) throw err;

                res.redirect('/recipes/' + recipeId);
            });
        });
    });
});

// Individual recipe page
router.get('/:id', (req, res) => {
    const recipeId = req.params.id;

    const recipeSql = `
        SELECT * FROM recipes
        WHERE id = ?
    `;

    db.query(recipeSql, [recipeId], (err, recipeResults) => {
        if (err) throw err;

        if (recipeResults.length === 0) {
            return res.send("Recipe not found");
        }

        const ingredientSql = `
            SELECT ingredients.id, ingredients.name, ingredients.info
            FROM ingredients
            JOIN recipe_ingredients
                ON ingredients.id = recipe_ingredients.ingredient_id
            WHERE recipe_ingredients.recipe_id = ?
        `;

        db.query(ingredientSql, [recipeId], (err, ingredientResults) => {
            if (err) throw err;

            res.render('pages/recipe', {
                recipe: recipeResults[0],
                ingredients: ingredientResults
            });
        });
    });
});

module.exports = router;