import React from 'react';
import '../Styles/Popup.css';
import agriculteur from '../agriculteur.png';

export default function Popup() {
  return (
    <div className="container">
      <div className="container__popup">
        <img src={agriculteur} alt="agriculteur" />
        <i class="far fa-times-circle"></i>
        <p id="popup__user">Thomas</p>
        <div className="trait__principal"></div>
        <p className="text__popup">Mon Profil</p>

        <p className="text__popup">Mon Matériel</p>

        <p className="text__popup">Mes Factures</p>
        <div className="trait__principal"></div>
        <div className="bloc__deconnection">
          <p>Deconnection</p>
          <i class="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
}
