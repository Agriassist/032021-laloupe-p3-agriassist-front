import React, { useState } from 'react';
import '../Styles/Popup.css';
import agriculteur from '../images/agriculteur.png';

export default function Popup() {
  const [popup, setPopup] = useState(true);

  const popupVisible = () => {
    setPopup(!popup);
  };
  return (
    <div className={popup ? 'container' : 'container__none'}>
      <div className="container__popup">
        <img src={agriculteur} alt="agriculteur" />
        <i className="far fa-times-circle" onClick={popupVisible}></i>
        <p id="popup__user">Thomas</p>
        <div className="trait__principal"></div>
        <p className="text__popup">Mon Profil</p>

        <p className="text__popup">Mon Matériel</p>

        <p className="text__popup">Mes Factures</p>
        <div className="trait__principal"></div>
        <div className="bloc__deconnection">
          <p>Deconnection</p>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
}
