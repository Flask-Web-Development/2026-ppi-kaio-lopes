import { useNavigate } from "react-router-dom";
import tank from "../../public/tank.png";
import tank2 from "../../public/tank.webp";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">

      {/* Tanques decorativos */}
      <img
        src={tank}
        alt="Tank"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 opacity-20 pointer-events-none"
      />

      <img
        src={tank2}
        alt="Tank"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 opacity-20 pointer-events-none"
      />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Header */}
        <header className="flex justify-center pt-12">
          <div className="bg-yellow-500 text-black border-4 border-black px-8 py-4 shadow-lg">
            <h1 className="text-4xl font-extrabold tracking-wider">
              TANK GARAGE SIMULATOR
            </h1>

            <p className="text-center text-sm font-semibold">
              Version 0.1
            </p>
          </div>
        </header>

        {/* Centro */}
        <main className="flex-1 flex flex-col justify-center items-center gap-6">

          <button
            onClick={() => navigate("/login")}
            className="
              bg-green-600
              hover:bg-green-500
              hover:scale-105
              active:scale-95
              transition
              duration-200
              border-4
              border-green-900
              w-64
              h-20
              text-2xl
              font-bold
              shadow-xl
              cursor-pointer
            "
          >
            OPEN GARAGE
          </button>

          <p className="text-gray-400 text-sm">
            Manage your tanks and expand your collection.
          </p>

        </main>

        {/* Footer */}
        <footer className="pb-6 flex justify-center">
          <div className="bg-gray-900/80 border border-gray-700 rounded-xl px-6 py-3 text-center text-sm">
            <p>Made by Kaio H. Lopes Teixeira</p>
            <p>20241144010013</p>
            <p className="text-gray-500">made without love :3</p>
          </div>
        </footer>

      </div>
    </div>
  );
}