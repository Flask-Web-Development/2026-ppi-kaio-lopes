import { useState } from "react";

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
    console.log(data);
    if (data.userLoggedIn) {
      alert("Login realizado");
    } else {
      alert("Usuário ou senha inválidos");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
      >
        Entrar
      </button>
    </form>
  );
}