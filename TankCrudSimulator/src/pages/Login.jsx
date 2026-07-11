import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/auth/login",
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

    if (data.userLoggedIn) {
      alert("Login realizado");
    } else {
      alert("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-gray-900 border-2 border-green-700 rounded-xl shadow-2xl">

        {/* Header */}
        <div className="bg-green-800 p-4 rounded-t-xl">
          <h1 className="text-center text-2xl font-bold text-white">
            TANK GARAGE
          </h1>

          <p className="text-center text-green-200 text-sm">
            Access Control System
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-4"
        >
          <div>
            <label className="block text-green-400 text-sm mb-1">
              USERNAME
            </label>

            <input
              type="text"
              placeholder="Commander"
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
                focus:border-green-500
              "
            />
          </div>

          <div>
            <label className="block text-green-400 text-sm mb-1">
              PASSWORD
            </label>

            <input
              type="password"
              placeholder="••••••••"
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
                focus:border-green-500
              "
            />
          </div>

          <button
            type="submit"
            className="
              mt-2
              bg-green-700
              hover:bg-green-600
              transition
              font-bold
              text-white
              p-3
              rounded
            "
          >
            ENTER GARAGE
          </button>

          <Link
            to="/register"
            className="
              text-center
              text-green-400
              hover:text-green-300
              text-sm
            "
          >
            Create new account
          </Link>
        </form>

      </div>
    </div>
  );
}