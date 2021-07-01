import React from 'react';
import '../Styles/Profil.css';
import agriculteur from '../agriculteur.png';

export default function Profil() {
  return (
    <div className="menu_container">
      <div className="trait_blue"></div>
      <img className="profil_img" src={agriculteur} alt="profil" />
      <i class="fas fa-sign-out-alt"></i>
      <p id="user_name">Mes Profils</p>
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
