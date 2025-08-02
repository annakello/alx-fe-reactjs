import { useRecipeStore } from './recipeStore';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div>
      <SearchBar />
      {filteredRecipes.length === 0 ? (
        <p>No recipes found. Try a different search term.</p>
      ) : (
        filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-item">
            <div className="recipe-header">
              <h3>{recipe.title}</h3>
              <FavoriteButton recipeId={recipe.id} />
            </div>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;