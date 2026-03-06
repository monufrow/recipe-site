CREATE DATABASE IF NOT EXISTS recipe_site;
USE recipe_site;

-- --------------------
-- Table: ingredients
-- --------------------
CREATE TABLE `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `info` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `ingredients` (`id`, `name`, `info`) VALUES
(1, 'Garlic', 'Used worldwide. Adds strong flavor.'),
(2, 'Chicken Breast', 'Lean protein. Cook to 165°F for safety.'),
(3, 'Yogurt', 'Yummy'),
(4, 'Water', 'I hear its very good for cows'),
(5, 'Tofu', 'A great vegan protein option'),
(6, 'Grains', 'Dried stuff that comes from the dirt, m-mm-mmm'),
(7, 'Beef', 'A classic bit of cow'),
(8, 'Basil', 'Add a fresh, sweet, peppery flavor to a dish'),
(9, 'Tomato', 'Uhhh, I guess its red and juicy?');


-- --------------------
-- Table: recipes
-- --------------------
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `protein_type` varchar(100) DEFAULT NULL,
  `instructions` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `recipes` (`id`, `name`, `protein_type`, `instructions`) VALUES
(1, 'Garlic Chicken', 'Chicken', 'Season chicken and cook thoroughly.'),
(2, 'Garlic Beef', 'Beef', 'Season the beef with garlic, cook in an oven with cherry tomatoes'),
(4, 'Beef n Basil', 'Beef', 'Toss some basil on the beef. Cook for 60 minutes at 400 degrees F'),
(5, 'Tofu Water', 'Tofu', 'Mince tofu into a paste, then add to water and mix as much or as little as you want.'),
(6, 'Grains', 'Grains', 'Eat the grains, yummerzzzz'),
(7, 'Chicken Yogurt', 'Chicken', 'Shred the cooked chicken, put it in the yogurt. Enjoy!');


-- --------------------
-- Table: recipe_ingredients
-- --------------------
CREATE TABLE `recipe_ingredients` (
  `recipe_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`ingredient_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `recipe_ingredients_ibfk_1`
    FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT `recipe_ingredients_ibfk_2`
    FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `recipe_ingredients` (`recipe_id`, `ingredient_id`) VALUES
(1,1),
(1,2),
(7,2),
(2,3),
(7,3),
(2,4),
(5,4),
(5,5),
(6,6),
(4,7),
(4,8);