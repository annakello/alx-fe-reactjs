import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Recipe title is required.";
    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else {
      const items = ingredients.split("\n").filter((i) => i.trim() !== "");
      if (items.length < 2) {
        newErrors.ingredients = "Please include at least two ingredients.";
      }
    }
    if (!steps.trim()) newErrors.steps = "Preparation steps are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newRecipe = {
        id: Date.now(),
        title,
        ingredients: ingredients.split("\n"),
        instructions: steps.split("\n"),
      };

      console.log("Recipe submitted:", newRecipe);

      setSubmitted(true);
      setTitle("");
      setIngredients("");
      setSteps("");
      setErrors({});
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">➕ Add New Recipe</h1>

      {submitted && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          ✅ Recipe submitted successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg"
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-300" : "focus:ring-indigo-300"
            }`}
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Ingredients (one per line)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-y min-h-[120px] ${
              errors.ingredients
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            }`}
            placeholder="e.g. 200g flour\n2 eggs"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Preparation Steps (one per line)
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-y min-h-[120px] ${
              errors.steps
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            }`}
            placeholder="e.g. Mix flour and eggs\nBake at 180°C for 20 minutes"
          ></textarea>
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
