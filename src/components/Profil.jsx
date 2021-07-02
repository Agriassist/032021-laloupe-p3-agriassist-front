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
      <div className="quatrebloc__container">
        <div className="bloc_bloc">
          <div className="logo__bloc">
            <i className="fas fa-tractor"></i>
          </div>
          <p>Benjamin</p>
        </div>
        <div className="bloc_bloc">
          <div className="logo__bloc">
            <i className="fas fa-users"></i>
          </div>
          <p>Claire</p>
        </div>
        <div className="bloc_bloc">
          <div className="logo__bloc">
            <i className="fas fa-map-marked-alt"></i>
          </div>
          <p>Thomas</p>
        </div>
        <div className="bloc_bloc">
          <div className="logo__bloc">
            <i className="fas fa-euro-sign"></i>
          </div>
          <p>Axel</p>
        </div>
      </div>
    </div>
  );
}
