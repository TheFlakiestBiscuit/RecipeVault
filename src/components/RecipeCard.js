import React, { useState, useEffect } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClose, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
    const [editedName, setEditedName] = useState(recipe.name);
    const [editedCategory, setEditedCategory] = useState(recipe.category);
    const [editedIngredients, setEditedIngredients] = useState(recipe.ingredients);
    const [editedImage, setEditedImage] = useState(recipe.image || '');

    useEffect(() => {
        let fileUrl;
        
        // If it's an object URL, set it and prepare to clean up
        if (editedImage && editedImage.startsWith('blob:')) {
            fileUrl = editedImage;
        }
        
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [editedImage]);

    if (!recipe) return null;

    const handleSaveEdit = () => {
        const updatedRecipe = {
            ...recipe,
            name: editedName,
            category: editedCategory,
            ingredients: editedIngredients,
            image: editedImage,
        };

        onUpdate(updatedRecipe); 
        setIsEditing(false);
    };

    return (
        <div className="recipe-card-overlay">
            <div className="recipe-card">
                <button className="close-btn" onClick={onClose}>X</button>
                {/* Edit Controls */}
                {!isEditing ? (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                        Edit Recipe
                    </button>
                ) : (
                    <div className="edit-controls">
                    <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                )}
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="input-field"
                        />
                        <select
                            value={editedCategory}
                            onChange={(e) => setEditedCategory(e.target.value)}
                            className="category-dropdown"
                        >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Snack/Other">Snack/Other</option>
                        </select>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setEditedImage(reader.result); // base64 string
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="input-field"
                        />
                    </>
                ) : (
                    <>
                        {!isEditing && recipe.image && (
                            <img
                                src={recipe.image}
                                alt={recipe.name}
                                className="recipe-thumbnail"
                            />
                        )}
                        <h2 className="recipe-card-title">{recipe.name}</h2>
                        <p className="recipe-card-category">
                            <span className="ingredients-label">Category:</span>{' '}
                            <span className="category-value">{recipe.category}</span>
                        </p>
                    </>
                )}
                <div className="ingredients-label">Ingredients:</div>
                <div className="ingredients-container">
                {isEditing ? (
                    <ul>
                        {editedIngredients.map((item, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                        const updated = [...editedIngredients];
                                        updated[index] = e.target.value;
                                        setEditedIngredients(updated);
                                    }}
                                    className="input-field"
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        <ul>
                            {recipe.ingredients.length > 0 ? (
                                recipe.ingredients.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            ) : (
                                <li>No ingredients listed</li>
                            )}
                        </ul>
                    </>
                    )}
                </div>
                <button className="delete-btn" onClick={() => { onDelete(recipe.name); onClose(); }}>Delete Recipe</button>
            </div>
        </div>
    );
};

export default RecipeCard;