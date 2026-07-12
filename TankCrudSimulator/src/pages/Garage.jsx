import react, { useEffect, useState } from 'react';

import TankModal from './TankModal';

import { useNavigate } from 'react-router-dom';


export default function Workshop( {userLoggedIn, userId} ) {
  const navigate = useNavigate();
  const [tanks, setTanks] = useState([]);

  const [selectedTank, setSelectedTank] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editable, setEditable] = useState(false);

  function openTank(tank) {
    setSelectedTank(tank);
    setEditable(false);
    setModalOpen(true);
  }

  function editTank(tank) {
    setSelectedTank(tank);
    setEditable(true);
    setModalOpen(true);
  }

  useEffect(()=>{
    if(!userLoggedIn){
      navigate('/login')
    }
  },[userLoggedIn])

  useEffect(() => {
    async function loadTanks() {
      const response = await fetch("http://localhost:5000/garage/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      console.log(data)
      setTanks(data);
    }

    loadTanks();
  }, []);

  //deletes, bruh
  async function deleteTank(tankId) {
    try {
      const response = await fetch(
        "http://localhost:5000/garage/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tankId,
            userId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setTanks((currentTanks) =>
          currentTanks.filter((tank) => tank.id !== tankId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  //saves tank on update
  async function saveTank(updatedTank) {
    try {
      const response = await fetch(
        "http://localhost:5000/garage/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTank),
        }
      );

      const data = await response.json();

      if (data.success) {
        setTanks((current) =>
          current.map((tank) =>
            tank.id === updatedTank.id
              ? updatedTank
              : tank
          )
        );

        setModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className="w-full h-full min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="relative z-10 flex flex-col items-center h-full">

        <header className="flex justify-center pt-6">
          <div className="bg-yellow-500 text-black border-4 border-black px-8 py-4 shadow-lg">
            <h1 className="text-2xl font-extrabold tracking-wider">
              Commander, Tanks Ready, Panzer Vor!
            </h1>
          </div>
        </header>

        <section className='grid grid-cols-4 gap-4 h-full w-[90%] mt-5 rounded-2xl border-2 border-lime-700 p-7 bg-black/25'>
          {tanks.map((tank) => (
            <div key={tank.id} className='flex flex-col items-center bg-black rounded-2xl'>
              <h2>{tank.tankname}</h2>
              <img src={tank.tankimg} alt="" className='h-37.5'/>
              <p>{tank.tankdescription}</p>
              <div className='flex w-[90%] mb-1 items-center justify-center'>
                <button className='px-2 py-1 w-16 bg-red-800 hover:bg-red-600'
                onClick={() => deleteTank(tank.id)}
                >
                  Delete
                </button>
                <button className='px-2 py-1 w-16 bg-gray-800 hover:bg-gray-600'
                onClick={() => editTank(tank)}
                >
                  Edit
                </button>
                <button className='px-2 py-1 w-16 bg-gray-800 hover:bg-gray-600'
                onClick={() => openTank(tank)}
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </section>

        <footer className='grid grid-cols-3 gap-5 mx-5 w-full fixed bottom-0'>
          <button className='w-full h-20 mb-3 bg-gray-900/80 border border-gray-700 rounded-xl'
          onClick={()=> navigate('/')}
          >
            <h1>Go Back to Menu</h1>
          </button>
          <button className='w-full h-20 mb-3 bg-gray-900/80 border border-gray-700 hover:bg-red-950 rounded-xl'>
            <h1>Into Battle!</h1>
          </button>
          <button className='w-full h-20 mb-3 bg-gray-900/80 border border-gray-700 rounded-xl'
            onClick={()=> navigate('/workshop')}
          >
            <h1>Create a New WunderWaffle</h1>
          </button>
        </footer>
      </div>

      <TankModal
        isOpen={modalOpen}
        tank={selectedTank}
        editable={editable}
        onClose={() => setModalOpen(false)}
        onSave={saveTank}
      />
    </div>
  );
}