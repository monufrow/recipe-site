# Recipe Site – Multi-Page Interactive Web Application

## Overview

This project is a dynamic multi-page recipe website built using **Express.js**, **EJS templates**, **MySQL**, and **client-side JavaScript**.

The application allows users to browse recipes categorized by protein type, view detailed recipe pages with ingredient information, and add or edit recipes stored in a MySQL database.

This project was created for a Software Engineering assignment focusing on server-side routing, database integration, and interactive front-end features.

---

# Features

### Dynamic Recipe Pages

* Recipes are stored in a MySQL database.
* Each recipe page is generated dynamically using route parameters.

### Ingredient Information Hover

* Hovering over an ingredient displays a tooltip containing additional information about the ingredient.

### Categorized Recipe List

* Recipes are grouped by **protein type**:

  * Chicken
  * Beef
  * Tofu
  * Grains

### Add New Recipes

* Users can add new recipes using a form.
* Recipes can include multiple ingredients stored in the database.

### Edit Recipes

* Existing recipes can be edited through a dedicated form.

### Database Integration

The project uses three tables:

* `recipes`
* `ingredients`
* `recipe_ingredients` (join table)

---

# Technology Stack

Backend

* Node.js
* Express.js

Frontend

* EJS templating
* HTML/CSS
* Client-side JavaScript

Database

* MySQL

Development Tools

* Nodemon
* dotenv

---

# Project Structure

```
recipe-site
│
├── database
│   └── recipe_site.sql
│
├── public
│   ├── css
│   │   └── style.css
│   └── js
│       └── main.js
│
├── routes
│   ├── home.js
│   └── recipes.js
│
├── views
│   ├── pages
│   │   ├── home.ejs
│   │   ├── recipes.ejs
│   │   ├── recipe.ejs
│   │   ├── addRecipe.ejs
│   │   └── editRecipe.ejs
│   │
│   └── partials
│       ├── header.ejs
│       └── footer.ejs
│
├── database.js
├── app.js
├── package.json
└── README.md
```

---

# Installation Instructions

## 1. Clone the repository

```
git clone https://github.com/monufrow/recipe-site.git
cd recipe-site
```

---

## 2. Install dependencies

```
npm install
```

---

## 3. Configure environment variables

Create a `.env` file in the project root:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=recipe_site
```

---

## 4. Import the database

Open MySQL and run:

```
SOURCE database/recipe_site.sql;
```

This will create the database and populate it with sample data.

---

## 5. Start the server

```
npm run dev
```

or

```
node app.js
```

---

## 6. Open the website

Visit:

```
http://localhost:3000
```

---

# Interactive Features

Ingredient Tooltips
Hovering over ingredients reveals additional information stored in the database.

Dynamic Routing
Recipes are loaded using URL parameters:

```
/recipes/:id
```

Example:

```
/recipes/1
```

---

# Author
Mitch Onufrow
Software Engineering
Trinity University 2026
