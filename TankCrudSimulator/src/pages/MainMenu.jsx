import react, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import tank from "../../public/tank.png";
import tank2 from "../../public/tank.webp";

export default function MainMenu() {
	const [onHover, setOnHover] = useState(false);
	const navigate = useNavigate();

	const Navigator = useNavigate();
  return (
    <div className="grid grid-rows-5 h-screen bg-gray-700 relative">
      <div className="flex items-center justify-center bg-green-800">
				<h1 className="text-center text-4xl font-semibold bg-yellow-400 px-2 py-3 border-4">TANK GARAGE SIMULATOR v0.1</h1>
			</div>

			<div className="flex justify-center row-span-3">
				<div className="flex items-center justify-center">
					<button className="bg-green-500 hover:scale-105 border-4 w-50 h-20 rounded flex justify-center items-center"
						onClick={() => navigate("/login")}
					>
						<h1 className="font-semibold">Open Garage</h1>
					</button>
				</div>
			</div>
			

			<div className='bg-black flex items-center justify-center'>
				<div className="flex place-self-center justify-center flex-col items-center bg-gray-300 border-4 rounded w-80 rounded-2xl border-dashed">
					<p>Made By KAIO H. Lopes Teixeira</p>
					
					<p>20241144010013, kaiolopes-dot</p>

					<p>made without love :3</p>
				</div>
			</div>

			<img src={tank} alt="" 
			 className={'absolute left-0 top-1/2 -translate-y-1/2 size-100'}
			/>
			<img src={tank2} alt="" 
			 className={'absolute right-0 top-1/2 -translate-y-1/2 size-100'}
			/>
    </div>
  );
}