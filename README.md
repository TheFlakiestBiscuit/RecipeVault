# 🍽️ RecipeVault

RecipeVault is a clean, user-friendly recipe management application built with React. It allows users to add, categorize, visualize, and manage their favorite recipes—all saved locally in the browser using `localStorage`.

## 🚀 Live Demo

Check it out here: [https://theflakiestbiscuit.github.io/RecipeVault/](https://theflakiestbiscuit.github.io/RecipeVault/)

## 🛠️ Features

- Add new recipes with:
  - Name
  - Category (Breakfast, Lunch, Dinner, Dessert, Snack/etc.)
  - List of ingredients
  - Optional image URL
- View saved recipes in a styled card layout
- Edit existing recipes directly within the card
- Delete recipes individually
- Visualize recipe categories using a DonutChart
- Data persists via `localStorage` even after browser refresh

## 📊 Tech Stack

- **Frontend:** React (with `useState`, `useEffect`)
- **Storage:** Browser `localStorage`
- **Styling:** Tailwind CSS (custom layout and color scheme)
- **Visualization:** DonutChart component for category tracking

## 📂 Folder Structure

RecipeVault/

├── public/

├── src/

│   ├── components/

│   │   ├── RecipeCard.js

│   │   ├── RecipeCard.css

│   │   ├── RecipeCard.test.js

│   │   ├── RecipeList.js

│   │   ├── RecipeList.css

│   │   ├── RecipeList.test.js

│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── Buttons.js
│   ├── Controls.js
│   ├── DonutChart.js
│   ├── DonutChart.css
│   ├── Header.js
├── package.json
├── README.md

## 🧠 What I Learned

- Managing component state and side effects in React
- Storing and retrieving persistent data with `localStorage`
- Handling conditional rendering and controlled forms
- Designing a responsive, user-friendly layout
- Visualizing data using chart components

## 🧪 Future Improvements

- Database Integration for recipes from other users
- Tag-based search/filtering system


---

**Created by [Will] – 2025**

