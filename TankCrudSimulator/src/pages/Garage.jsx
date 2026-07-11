import react, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';


export default function Workshop( {userLoggedIn, userId} ) {
  const navigate = useNavigate();
  const [tanks, setTanks] = useState([
    {
      "id": 1,
      "owner_id": 1,
      "tankname": "Hetzer",
      "tankimg": "https://images.cults3d.com/ejEd8ZNRcwf8iS5WjG0NOrrWWDU=/516x516/filters:no_upscale()/https://fbi.cults3d.com/uploaders/29258903/illustration-file/e8a3c679-344c-4261-9145-f921187db8db/WhatsApp-Image-2025-06-10-at-10.32.26.jpeg",
      "tankdescription": "Tank Destroyer, 1943"
    },
    {
      "id": 2,
      "owner_id": 1,
      "tankname": "Panther",
      "tankimg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQAWaYWXXvfod5LEsITlxefW75l8WtjcMPxoMPGU7FywoHhvcYFKg3lFJ&s=10",
      "tankdescription": "Medium tank"
    },
    {
      "id": 2,
      "owner_id": 1,
      "tankname": "Panther",
      "tankimg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQAWaYWXXvfod5LEsITlxefW75l8WtjcMPxoMPGU7FywoHhvcYFKg3lFJ&s=10",
      "tankdescription": "Medium tank"
    },
    {
      "id": 2,
      "owner_id": 1,
      "tankname": "Panther",
      "tankimg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQAWaYWXXvfod5LEsITlxefW75l8WtjcMPxoMPGU7FywoHhvcYFKg3lFJ&s=10",
      "tankdescription": "Medium tank"
    },
  ]);

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
      //setTanks(data);
    }

    loadTanks();
  }, []);
  
  return (
    <div className="w-screen h-full min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="relative z-10 flex flex-col items-center h-full">

        <header className="flex justify-center pt-6">
          <div className="bg-yellow-500 text-black border-4 border-black px-8 py-4 shadow-lg">
            <h1 className="text-2xl font-extrabold tracking-wider">
              Comandante, Tanques Prontos, Panzer Vor!
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
                <button className='px-2 py-1 w-16 bg-gray-800'>
                  Delete
                </button>
                <button className='px-2 py-1 w-16 bg-gray-800'>
                  Edit
                </button>
                <button className='px-2 py-1 w-16 bg-gray-800'>
                  Open
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}