import React from 'react';
import './RecipeList.css';

const RecipeList = ({ recipes, onSelectRecipe }) => {
    return (
        <div className="recipe-list-section">
            <h3 className="recipe-list-title">Saved Recipes</h3>
            {recipes.length === 0 ? (
                <p>No recipes added yet.</p>
            ) : (
                <ul className="recipe-list">
                    {recipes.map((recipe, index) => (
                        <li key={index} className="recipe-item">
                            {recipe.name}
                            <button className="view-btn" onClick={() => onSelectRecipe(recipe)}>+</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecipeList;