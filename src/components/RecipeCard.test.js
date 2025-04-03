import { render, screen, fireEvent } from '@testing-library/react';
import RecipeCard from './RecipeCard';

describe('RecipeCard Component', () => {
  test('does not render if recipe prop is null', () => {
    const { container } = render(<RecipeCard recipe={null} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders recipe name and category', () => {
    const sampleRecipe = {
      name: 'Avocado Toast',
      category: 'Breakfast',
      ingredients: ['Bread', 'Avocado', 'Salt'],
    };

    render(<RecipeCard recipe={sampleRecipe} onClose={() => {}} />);
    
    expect(screen.getByText(/Avocado Toast/i)).toBeInTheDocument();
    expect(screen.getByText(/Breakfast/i)).toBeInTheDocument();
  });

  test('renders ingredients list when available', () => {
    const sampleRecipe = {
      name: 'Salad',
      category: 'Lunch',
      ingredients: ['Lettuce', 'Tomato'],
    };

    render(<RecipeCard recipe={sampleRecipe} onClose={() => {}} />);
    
    expect(screen.getByText('Lettuce')).toBeInTheDocument();
    expect(screen.getByText('Tomato')).toBeInTheDocument();
  });

  test('displays fallback message when no ingredients', () => {
    const sampleRecipe = {
      name: 'Water',
      category: 'Drink',
      ingredients: [],
    };

    render(<RecipeCard recipe={sampleRecipe} onClose={() => {}} />);
    expect(screen.getByText(/No ingredients listed/i)).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const sampleRecipe = {
      name: 'Omelette',
      category: 'Breakfast',
      ingredients: ['Eggs'],
    };

    const mockClose = jest.fn();

    render(<RecipeCard recipe={sampleRecipe} onClose={mockClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'X' }));

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});