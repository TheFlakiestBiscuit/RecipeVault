import React, { useState } from 'react';
import Buttons from './Buttons';

const Controls =({ newRecipe, setNewRecipe, ingredients, setIngredients, handleAdd, handleRandom, handleDelete, selectedCategory, setSelectedCategory, newImage, setNewImage }) => {
    const [ingredientInput, setIngredientInput] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value.trimStart();
        if (value.length > 50) return; // extra safety check
        setNewRecipe(value);
        if (error) setError(''); //clear error on typing
    };

    const handleAddIngredient = () => {
        if (ingredientInput.trim() !== '') {
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput('');
        }
    };

    const handleRemoveIngredient = (index) => {
        const updated = ingredients.filter((_, i) => i !== index);
        setIngredients(updated);
    };

    const handleAddWithValidation = () => {
        if (newRecipe.trim() === '') {
            setError('Please enter a recipe name.');
            return;
        }
        handleAdd(); // call parent handler
    }

    return (
        <div>
            {/* Category Dropdown */}
            <select
                className="category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Recipe Category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack/Other">Snack/Other</option>
            </select>

            {/* Recipe Input */}
            <input 
                type="text"
                placeholder="Enter recipe name..."
                value={newRecipe}
                onChange={handleInputChange}
                className="input-field"
                maxLength={50}
            />
            {error && (
                <div style={{ color: 'red', fontSize: '16px', marginTop: '4px'}}>
                    {error}
                </div>
            )}

                {/* Image Upload Input */}
                <label style={{ display: 'block', margin: '8px 0 4px', fontSize: '18px' }}>Recipe Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setNewImage(reader.result); // stores base64 string
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                    className="input-field"
                />
                {newImage && (
                    <img
                        src={newImage}
                        alt="Preview"
                        style={{
                            marginTop: '8px',
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: '1px solid #0F7173'
                        }}
                    />
                )}
            <div className="ingredient-section">
                <input
                    type="text"
                    placeholder="Enter ingredient..."
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    className="input-field ingredient-input"
                    maxLength={50}
                />
                <button className="btn-secondary" onClick={handleAddIngredient}>
                    Add ingredient
                </button>
            </div>
            {ingredients.length > 0 && (
                <ul className="ingredient-list">
                    {ingredients.map((item, index) => (
                        <li key={index} className="ingredient-item">
                            {item}
                            <button className="remove-btn" onClick={() => handleRemoveIngredient(index)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <Buttons
                handleAdd={handleAddWithValidation}
                handleRandom={handleRandom}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default Controls;