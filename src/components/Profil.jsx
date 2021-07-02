import React from 'react';
import '../Styles/Profil.css';
import agriculteur from '../images/agriculteur.png';

export default function Profil() {
  return (
    <div className="menu_container">
      <div className="trait_blue"></div>
      <i class="fas fa-users"></i>
      <p id="user_name">Mes Profils</p>
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
