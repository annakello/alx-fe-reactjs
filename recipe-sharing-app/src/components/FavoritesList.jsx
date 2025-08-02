import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => 
      state.recipes.find(recipe => recipe.id === id)
    ).filter(Boolean) // Filter out undefined in case recipe was deleted
  );

  if (favorites.length === 0) {
    return (
      <div className="favorites-list">
        <h2>My Favorites</h2>
        <p>You haven't added any favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h2>My Favorites</h2>
      {favorites.map(recipe => (
        <div key={recipe.id} className="recipe-item">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;