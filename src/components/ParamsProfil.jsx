import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../Styles/ParamsProfil.css';
import camera from '../camera.png';

export default function ParamsProfil() {
  const [fileSelected, setFileSelected] = useState(null);
  const [file, setFile] = useState(null);

  const onChangeFile = (event) => {
    const { type } = event.target.files[0];
    if (type !== 'image/png' || type == 'image/jpeg') {
      console.log(event.target.files[0]);
      setFileSelected(event.target.files[0]);
    } else {
      alert("Veuillez selectionner un format d'image valide");
    }
  };
  const submitFiles = (e) => {
    e.preventDefault();
    if (fileSelected) {
      const data = new FormData();
      data.append('file', fileSelected);
      data.append('configuration', JSON.stringify({ alt: '' }));
      axios({
        method: 'POST',
        url: 'http://localhost:8000/images_profil',
        data,
      })
        .then((data) => data.data)
        .then((data) => {
          console.log(data);
          setFile({
            filename: data.picture_profil,
          });
        })
        .catch((err) => {
          alert(err.response.status);
        });
    }
  };
  return (
    <div className="container__paramsprofil">
      <i id="edit__profil" class="fas fa-user-edit"></i>

      <div className="container__imgprofil">
        {file && <img src={`http://localhost:8000/api/images_profil/${file.filename}`} alt="test" id="img__multer" />}
      </div>
      <div className="container__info__profil">
        <div className="pseudo__container">
          <h3>Pseudo:</h3>
          <p>ThomasDev28</p>
        </div>
        <div className="name__container">
          <h3>Nom Prénom:</h3>
          <p>Thbaut Thomas</p>
        </div>
        <div className="email__container">
          <h3>Email:</h3>
          <p>thomas28@outlook.com</p>
        </div>
        <div className="phone__container">
          <h3>Téléphone:</h3>
          <p>02 37 57 48 12</p>
        </div>
      </div>
    </div>
  );
}
