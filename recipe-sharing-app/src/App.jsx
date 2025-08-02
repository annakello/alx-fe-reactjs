import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Recipe Sharing App</h1>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/favorites">My Favorites</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <AddRecipeForm />
              <RecommendationsList />
              <RecipeList />
            </>
          } />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
