import react, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';


export default function Workshop( {userLoggedIn} ) {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userLoggedIn){
      navigate('/login')
    }
  },[userLoggedIn])
  
  return (
    <div>
      wablua garage
    </div>
  );
}