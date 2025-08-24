import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((r) => r.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error loading recipe:", error));
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10">Loading recipe...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-block mb-6 text-indigo-600 hover:text-indigo-800 font-medium"
      >
        ← Back to Home
      </Link>

      {/* Recipe Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-600 mb-6">{recipe.summary}</p>

          {/* Ingredients */}
          <h2 className="text-2xl font-semibold mb-3">📝 Ingredients</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          {/* Instructions */}
          <h2 className="text-2xl font-semibold mb-3">👩‍🍳 Instructions</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
