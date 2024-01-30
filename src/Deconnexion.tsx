import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Deconnexion: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Effacer le token du localStorage
    localStorage.removeItem('token'); 

   
    window.location.href = '/'; 
  }, [history]);

  return (
    <div>
      <p>Déconnexion en cours...</p>
     
    </div>
  );
};

export default Deconnexion;
