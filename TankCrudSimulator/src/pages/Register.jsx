import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.created) {
        alert("Commander registered successfully!");
        setUsername("");
        setPassword("");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-black flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-gray-900 border-2 border-yellow-600 rounded-xl shadow-2xl">

        {/* Header */}
        <div className="bg-yellow-700 p-4 rounded-t-xl">
          <h1 className="text-center text-2xl font-bold text-white">
            NEW COMMANDER
          </h1>

          <p className="text-center text-yellow-100 text-sm">
            Tank Garage Registration Terminal
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-4"
        >
          <div>
            <label className="block text-yellow-400 text-sm mb-1">
              USERNAME
            </label>

            <input
              type="text"
              placeholder="Choose your commander name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full
                bg-gray-800
                border
                border-gray-700
                text-white
                p-3
                rounded
                focus:outline-none
                focus:border-yellow-500
              "
            />
          </div>

          <div>
            <label className="block text-yellow-400 text-sm mb-1">
              PASSWORD
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                bg-gray-800
                border
                border-gray-700
                text-white
                p-3
                rounded
                focus:outline-none
                focus:border-yellow-500
              "
            />
          </div>

          <button
            type="submit"
            className="
              mt-2
              bg-yellow-600
              hover:bg-yellow-500
              transition
              font-bold
              text-black
              p-3
              rounded
            "
          >
            REGISTER COMMANDER
          </button>

          <Link
            to="/login"
            className="
              text-center
              text-yellow-400
              hover:text-yellow-300
              text-sm
            "
          >
            Back to login
          </Link>
        </form>

      </div>

    </div>
  );
}