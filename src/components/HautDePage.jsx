import React from 'react';
import agriculteur from '../agriculteur.png';
import '../Styles/HautDePage.css';

export default function HautDePage() {
  return (
    <div className="haut_de_page">
      <img className="logo_agriassist" src="./src/logoAgri.png" alt="logo Agriassist" />
      <img className="img__profil" src={agriculteur} alt="agriculteur" />
    </div>
  );
}
