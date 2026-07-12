import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Workshop({ userLoggedIn, userId }) {
  const navigate = useNavigate();

  const [tankname, setTankname] = useState("");
  const [tankimg, setTankimg] = useState("");
  const [tankdescription, setTankdescription] = useState("");

  const [tankfrontalarmor, setTankfrontalarmor] = useState(50);
  const [tanksidearmor, setTanksidearmor] = useState(30);
  const [tankcannon, setTankcannon] = useState(75);
  const [tankengine, setTankengine] = useState(500);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/garage/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner_id: userId,
            tankname,
            tankimg,
            tankdescription,
            tankfrontalarmor,
            tanksidearmor,
            tankcannon,
            tankengine,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Tanque criado com sucesso!");
        navigate("/garage");
      } else {
        alert("Erro ao criar tanque.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=> {
    if (!userLoggedIn) {
      navigate("/login");
      return null;
    }
  })

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-4xl mx-auto py-8 px-4">

        <h1 className="text-4xl font-bold text-center mb-8">
          Tank Workshop
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-black/40 border border-gray-700 rounded-xl p-6"
        >
          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block mb-2">Nome do tanque</label>
              <input
                type="text"
                value={tankname}
                onChange={(e) => setTankname(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Imagem (URL)</label>
              <input
                type="text"
                value={tankimg}
                onChange={(e) => setTankimg(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2">Descrição</label>
              <textarea
                value={tankdescription}
                onChange={(e) => setTankdescription(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                rows="4"
                required
              />
            </div>

            <div>
              <label>Blindagem frontal</label>
              <input
                type="number"
                value={tankfrontalarmor}
                onChange={(e) =>
                  setTankfrontalarmor(Number(e.target.value))
                }
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label>Blindagem lateral</label>
              <input
                type="number"
                value={tanksidearmor}
                onChange={(e) =>
                  setTanksidearmor(Number(e.target.value))
                }
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label>Canhão</label>
              <input
                type="number"
                value={tankcannon}
                onChange={(e) =>
                  setTankcannon(Number(e.target.value))
                }
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label>Motor</label>
              <input
                type="number"
                value={tankengine}
                onChange={(e) =>
                  setTankengine(Number(e.target.value))
                }
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
              />
            </div>

          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-green-700 hover:bg-green-600 rounded-lg font-bold"
            >
              Construir Tanque
            </button>
          </div>
        </form>

        <div className="mt-8 bg-black/40 border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Pré-visualização
          </h2>

          <div className="flex flex-col items-center">
            {tankimg && (
              <img
                src={tankimg}
                alt={tankname}
                className="h-48 object-cover rounded-lg"
              />
            )}

            <h3 className="text-xl mt-4">
              {tankname || "Novo Tanque"}
            </h3>

            <p className="text-gray-300">
              {tankdescription || "Descrição do veículo"}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <p>Frontal: {tankfrontalarmor}</p>
              <p>Lateral: {tanksidearmor}</p>
              <p>Canhão: {tankcannon}</p>
              <p>Motor: {tankengine}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}