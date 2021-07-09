import React, { useState } from 'react';
import '../Styles/Popup.css';
import agriculteur from '../images/agriculteur.png';
import { useStateValue } from '../contexts/Context';

export default function Popup() {
  const [{ popup }, dispatch] = useStateValue();

  const popupVisible = () => {
    dispatch({ type: 'SET_POPUP', popup: !popup });
  };

  return (
    <div className={popup ? 'container' : 'container__none'}>
      <div className="container__popup">
        <img src={agriculteur} alt="agriculteur" />
        <i className="far fa-times-circle" onClick={popupVisible}></i>
        <p id="popup__user">Thomas</p>
        <div className="boutton__text__popup">
          <p className="text__popup">Mon Profil</p>
        </div>
        <div className="boutton__text__popup">
          <p className="text__popup">Mon Matériel</p>
        </div>
        <div className="boutton__text__popup">
          <p className="text__popup">Mes Documents</p>
        </div>
        <div className="bloc__deconnection">
          <p>Deconnection</p>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
}
