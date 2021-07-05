import React from 'react';
import agriculteur from '../images/agriculteur.png';
import '../Styles/HautDePage.css';

export default function HautDePage() {
  return (
    <div className="haut_de_page">
      <img className="logo_agriassist" src="./src/images/logoAgri.png" alt="logo Agriassist" />
      <div className="espace_identification_profil">
      <img className="img_profil" src={agriculteur} alt="agriculteur" />
      <figcaption className="adresse_mail_img_profil">adresse_mail@orange.fr</figcaption>
    </div>
  );
}
