import React from 'react';

const Buttons =({ handleAdd, handleRandom, handleDelete }) => {
    return (
        <div>
            <button className="btn-primary" onClick={handleAdd}>Submit Recipe</button>
            <button className="btn=primary" onClick={handleRandom}>Random Recipe</button>
        </div>
    );
};

export default Buttons;