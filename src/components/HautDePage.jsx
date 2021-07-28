/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/HautDePage.css';
import { useStateValue } from '../contexts/Context';
import { useHistory } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function HautDePage() {
  const [{ popup, id, token, profil_picture }, dispatch] = useStateValue();

  const menuNav = () => {
    dispatch({ type: 'SET_POPUP', popup: !popup });
  };

  let history = useHistory();

  const [mail, setMail] = useState('');

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/api/users/${id}`,
      headers: { authorization: 'Bearer ' + token },
    })
      .then((data) => data.data)
      .then((data) => {
        dispatch({ type: 'SET_PROFIL_PICTURE', profil_picture: data.photo_profil });
        dispatch({ type: 'SET_NAME', name: data.nom });
        setMail(data.email);
      });
  }, []);

  return (
    <div className="haut_de_page">
      <img
        className="logo_agriassist"
        src="./src/images/logoAgri.png"
        onClick={() => {
          history.push('/users');
        }}
        alt="logo Agriassist"
      />
      <div className="espace_identification_profil">
        <img className="img_profil" src={`${API_BASE_URL}/api/images_profil/${profil_picture}`} onClick={menuNav} alt="agriculteur" />
        <figcaption className="adresse_mail_img_profil">{mail}</figcaption>
      </div>
    </div>
  );
}
