import React from 'react';
import agriculteur from '../images/agriculteur.png';
import '../Styles/HautDePage.css';
import { useStateValue } from '../contexts/Context';
import { useHistory } from 'react-router-dom';

export default function HautDePage() {
  const [{ popup }, dispatch] = useStateValue();

  const menuNav = () => {
    dispatch({ type: 'SET_POPUP', popup: !popup });
  };

  let history = useHistory();

  return (
    <div className="haut_de_page">
      {/* <img className="logo__home__page" src="./src/images/home.png" onClick="/users" alt="logo retour accueil" /> */}
      <img
        className="logo_agriassist"
        src="./src/images/logoAgri.png"
        onClick={() => {
          history.push('/users');
        }}
        alt="logo Agriassist"
      />
      <div className="espace_identification_profil">
        <img className="img_profil" src={agriculteur} onClick={menuNav} alt="agriculteur" />
        <figcaption className="adresse_mail_img_profil">adresse_mail@orange.fr</figcaption>
      </div>
    </div>
  );
}
