import { render, screen, fireEvent } from '@testing-library/react';
import RecipeList from './RecipeList';

describe('RecipeList Component', () => {
  test('displays message when no recipes are provided', () => {
    render(<RecipeList recipes={[]} onSelectRecipe={() => {}} />);
    expect(screen.getByText(/No recipes added yet/i)).toBeInTheDocument();
  });
    
  test('renders a list of recipes and triggers onSelectRecipe when view button is clicked', () => {
    const mockRecipes = [
        { name: 'Pizza' },
        { name: 'Tacos' }
    ];
    const mockSelect = jest.fn();

    render(<RecipeList recipes={mockRecipes} onSelectRecipe={mockSelect} />);

    // Check if both recipe names are rendered
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Tacos')).toBeInTheDocument();

    // Click the '+' button next to Pizza
    const buttons = screen.getAllByRole('button', { name: '+' });
    fireEvent.click(buttons[0]);

    // Ensure the click handler is called with the correct recipe
    expect(mockSelect).toHaveBeenCalledWith(mockRecipes[0]);
});
});