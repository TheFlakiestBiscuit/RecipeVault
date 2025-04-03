import React, { useState, useEffect } from 'react';
import Header from './Header';
import Controls from './Controls';
import DonutChart from './DonutChart';
import RecipeList from './components/RecipeList';
import RecipeCard from './components/RecipeCard';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [newRecipe, setNewRecipe] = useState('');
  const [ingredients, setIngredients] = useState ([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newImage, setNewImage] = useState('');

  // Sync recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleAdd = () => {
    if (newRecipe.trim() !== '') {
      const recipeData = {
        name: newRecipe,
        ingredients,
        category: selectedCategory || 'Uncategorized',
        image: newImage,
      };
      setRecipes([...recipes, recipeData]);
      setNewRecipe('');
      setIngredients([]);
      setSelectedCategory('');
      setNewImage('');
    }
  };

  const handleDelete = () => {
    if (recipes.length > 0) {
      setRecipes(recipes.slice(0, -1));
    }
  };

  // Update existing recipe
  const handleUpdateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.name === updatedRecipe.name ? updatedRecipe : r
    );
    setRecipes(updatedRecipes);
    if (selectedRecipe && selectedRecipe.name === updatedRecipe.name) {
      setSelectedRecipe(updatedRecipe);
    }
  };

  const handleRandom = () => {
    if (recipes.length > 0) {
      const random = recipes[Math.floor(Math.random() * recipes.length)];
      setSelectedRecipe(random);
    }
  };

  // Recipe card display trigger
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseCard = () => {
    setSelectedRecipe(null);
  };

  const handleDeleteRecipeFromCard = (nameToDelete) => {
    setRecipes(recipes.filter((r) => r.name !== nameToDelete)); // Delete by name match
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Header />
      <div className="main-layout">
        <div className="left-panel">
          <Controls
            newRecipe={newRecipe}
            setNewRecipe={setNewRecipe}
            ingredients={ingredients}
            setIngredients={setIngredients}
            handleAdd={handleAdd}
            handleRandom={handleRandom}
            handleDelete={handleDelete}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            newImage={newImage}
            setNewImage={setNewImage}
          />
          <DonutChart recipes={recipes} />
        </div>
        <div className="right-panel">
          <RecipeList recipes={recipes} onSelectRecipe={handleSelectRecipe} />
        </div>
      </div>

      {/* Recipe Card Popup */}
      {selectedRecipe && (
        <RecipeCard recipe={selectedRecipe} onClose={handleCloseCard} onDelete={handleDeleteRecipeFromCard} onUpdate={handleUpdateRecipe} />
      )}
    </div>
  );
}

export default App;