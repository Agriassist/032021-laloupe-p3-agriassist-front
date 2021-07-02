import React from 'react';
import '../Styles/Profil.css';
import agriculteur from '../agriculteur.png';
import HautDePage from './HautDePage';

export default function Profil() {
  return (
    <div className="container__menu">
      <HautDePage />
      <header className="profil-header">
        <div className="blocMesProfils">
          <div className="blocMesProfils__logo">
            {/* <img className="imagefondparcmateriel" alt="tracesrouestracteurs" src="./src/fondparcmateriel.jpg" width="50%" /> */}
            <i className="fas fa-id-card"></i>
          </div>
          <p>Mes profils</p>
        </div>
      </header>
      <div className="quatrebloc__containerprofil">
        <div className="profil_bloc">
          <div className="profil__datadmin">
            <img className="img__bloc__admin" src={agriculteur} alt="profil" />
            <p>Benjamin</p>
          </div>
          <p id="role__admin">Administrateur</p>
        </div>
        <div className="profil_bloc">
          <div className="profil__data">
            <img className="img__bloc" src={agriculteur} alt="profil" />
            <p>Thomas</p>
          </div>
        </div>
        <div className="profil_bloc">
          <div className="profil__data">
            <img className="img__bloc" src={agriculteur} alt="profil" />
            <p>Axel</p>
          </div>
        </div>
        <div className="profil_bloc">
          <div className="profil__data">
            <img className="img__bloc" src={agriculteur} alt="profil" />
            <p>Claire</p>
          </div>
        </div>
      </div>
    </div>
  );
}
