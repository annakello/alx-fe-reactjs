import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";


const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error loading recipes:", error));
  }, []);

  return (
    
    <div className="container mx-auto px-4 py-8 grid-cols-1">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">🍴 Recipe Sharing Platform</h1>
      <h1 className="text-3xl font-bold text-center mb-8">
  🍴 Recipe Sharing Platform
</h1>

<div className="text-center mb-6">
  <Link
    to="/add"
    className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
  >
    ➕ Add New Recipe
  </Link>
</div>

      {/* Recipe Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden"
          >
            {/* Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{recipe.summary}</p>

              <Link
                href={`/recipes/${recipe.id}`}
                className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View Recipe →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
