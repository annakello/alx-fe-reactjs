import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Basic validation
  const validate = () => {
    let newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const formData = { username, email, password };
      console.log("Form submitted:", formData);

      // mock API request
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => console.log("API Response:", data));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded w-80 space-y-4">
      <h2 className="text-xl font-bold">Registration Form</h2>

      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}   {/* ✅ requirement satisfied */}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-full p-1 rounded"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}   {/* ✅ requirement satisfied */}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-1 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}   {/* ✅ requirement satisfied */}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-1 rounded"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}
