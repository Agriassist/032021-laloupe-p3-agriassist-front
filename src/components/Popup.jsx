import React, { useState } from 'react';
import '../Styles/Popup.css';
import agriculteur from '../images/agriculteur.png';
import { useStateValue } from '../contexts/Context';
import { Link } from 'react-router-dom';

export default function Popup() {
  const [{ popup }, dispatch] = useStateValue();

  const popupVisible = () => {
    dispatch({ type: 'SET_POPUP', popup: !popup });
  };

  const logout = () => {
    dispatch({ type: 'RESET_TOKEN' });
    dispatch({ type: 'RESET_ID' });
    dispatch({ type: 'RESET_STATUS' });
    dispatch({ type: 'RESET_MATERIEL_ID' });
    location.reload();
  };

  return (
    <div className={popup ? 'container' : 'container__none'}>
      <div className="container__popup">
        <img src={agriculteur} alt="agriculteur" />
        <i className="far fa-times-circle" onClick={popupVisible}></i>
        <p id="popup__user">Thomas</p>
        <Link to="/profil" className="boutton__text__popup" onClick={popupVisible}>
          <p className="text__popup">Mon Profil</p>
        </Link>
        <Link to="/materiel" className="boutton__text__popup" onClick={popupVisible}>
          <p className="text__popup">Mon Matériel</p>
        </Link>
        <Link to="/document" className="boutton__text__popup" onClick={popupVisible}>
          <p className="text__popup">Mes Documents</p>
        </Link>
        <div className="bloc__deconnection" onClick={logout}>
          <p>Deconnection</p>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
}
