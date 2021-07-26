import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Popup.css';
import { useStateValue } from '../contexts/Context';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function Popup() {
  const [{ popup, profil_picture, name }, dispatch] = useStateValue();

  const popupVisible = () => {
    dispatch({ type: 'SET_POPUP', popup: !popup });
  };

  const logout = () => {
    dispatch({ type: 'RESET_TOKEN' });
    dispatch({ type: 'RESET_ID' });
    dispatch({ type: 'RESET_STATUS' });
    dispatch({ type: 'RESET_MATERIEL_ID' });
    dispatch({ type: 'RESET_PROFIL_PICTURE' });

    axios({
      method: 'GET',
      url: `${API_BASE_URL}/api/users/logout`,
      withCredentials: true,
    });

    dispatch({ type: 'SET_POPUP', popup: !popup });
  };

  return (
    <div className={popup ? 'container' : 'container__none'}>
      <div className="container__popup">
        <img src={`http://localhost:8000/api/images_profil/${profil_picture}`} alt="agriculteur" />
        <i className="far fa-times-circle" onClick={popupVisible}></i>
        <p id="popup__user">{name}</p>
        <Link to="/update_profil" className="boutton__text__popup" onClick={popupVisible}>
          <p className="text__popup">Mon Profil</p>
        </Link>
        <Link to="/materiel" className="boutton__text__popup" onClick={popupVisible}>
          <p className="text__popup">Mon Matériel</p>
        </Link>
        <Link to="/document" className="boutton__text__popup" onClick={popupVisible}>
          <p className="text__popup">Mes Documents</p>
        </Link>
        <Link to="/users" className="bloc__retour__accueil" onClick={popupVisible}>
          <p className="bloc__retour">Retour à l'accueil</p>
          <i className="fas fa-house-user"></i>
        </Link>
        <div className="bloc__deconnection" onClick={logout}>
          <p>Deconnection</p>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
}
