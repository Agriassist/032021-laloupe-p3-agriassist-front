import React, { useState } from 'react';
// import axios from 'axios';
import '../Styles/UpdateProfil.css';
import camera from '../camera.png';

export default function UpdateProfil() {
  const setFileSelected = useState(null)[1];
  const file = useState(null)[0];

  const onChangeFile = (event) => {
    const { type } = event.target.files[0];
    if (type !== 'image/png' || type == 'image/jpeg') {
      console.log(event.target.files[0]);
      setFileSelected(event.target.files[0]);
    } else {
      alert("Veuillez selectionner un format d'image valide");
    }
  };
  // const submitFiles = (e) => {
  //   e.preventDefault();
  //   if (fileSelected) {
  //     const data = new FormData();
  //     data.append('file', fileSelected);
  //     data.append('configuration', JSON.stringify({ alt: '' }));
  //     axios({
  //       method: 'POST',
  //       url: `${process.env.REACT_APP_API_URL}/images_profil`,
  //       data,
  //     })
  //       .then((data) => data.data)
  //       .then((data) => {
  //         console.log(data);
  //         setFile({
  //           filename: data.picture_profil,
  //         });
  //       })
  //       .catch((err) => {
  //         alert(err.response.status);
  //       });
  //   }
  // };
  return (
    <div className="container__updateprofil">
      <input type="file" accept="image/*" id="multer" onChange={onChangeFile} />
      <div className="container__imgprofil">
        {file && <img src={`${process.env.REACT_APP_API_URL}/api/images_profil/${file.filename}`} alt="test" id="img__multer" />}
        <label htmlFor="multer">
          <img src={camera} alt="selection_image" id="imgPhoto" />
        </label>
      </div>
      <div className="container__update__profil">
        <div className="pseudo__update">
          <h3>Pseudo:</h3>
          <input type="text" />
        </div>
        <div className="name__update">
          <h3>Nom Prénom:</h3>
          <input type="text" />
        </div>
        <div className="email__update">
          <h3>Email:</h3>
          <input type="email" name="" id="" />
        </div>
        <div className="phone__update">
          <h3>Téléphone:</h3>
          <input type="text" name="" id="" />
        </div>
      </div>
    </div>
  );
}
