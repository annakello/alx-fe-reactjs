import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  searchTerm: '',
  filteredRecipes: [],
  
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.filteredRecipes, newRecipe],
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      filteredRecipes: state.filteredRecipes.filter((recipe) => recipe.id !== id),
      favorites: state.favorites.filter(favId => favId !== id),
    })),
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
      filteredRecipes: state.filteredRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),
  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),
  setSearchTerm: (term) => 
    set((state) => ({
      searchTerm: term,
      filteredRecipes: term 
        ? state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(term.toLowerCase()) ||
            recipe.description.toLowerCase().includes(term.toLowerCase())
          )
        : [...state.recipes],
    })),
  
  addFavorite: (recipeId) => 
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId]
    })),
  removeFavorite: (recipeId) => 
    set((state) => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    })),
  toggleFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites.filter(id => id !== recipeId)
        : [...state.favorites, recipeId]
    })),
  

  generateRecommendations: () => {
    const { recipes, favorites } = get();
    if (favorites.length === 0) {
      const shuffled = [...recipes].sort(() => 0.5 - Math.random());
      return set({ recommendations: shuffled.slice(0, 3) });
    }
    
    const favoriteTitles = favorites.map(favId => {
      const recipe = recipes.find(r => r.id === favId);
      return recipe ? recipe.title.toLowerCase() : '';
    });
    
    const recommended = recipes
      .filter(recipe => !favorites.includes(recipe.id))
      .filter(recipe => {
        const lowerTitle = recipe.title.toLowerCase();
        return favoriteTitles.some(favTitle => 
          lowerTitle.includes(favTitle.split(' ')[0]) 
        );
      })
      .slice(0, 5);
    
    set({ recommendations: recommended.length ? recommended : 
      [...recipes].sort(() => 0.5 - Math.random()).slice(0, 3) 
    });
  }
}));