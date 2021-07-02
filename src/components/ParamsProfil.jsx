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
      <input type="file" accept="image/*" id="multer" onChange={onChangeFile} />
      <div className="container__imgprofil">
        {file && <img src={`http://localhost:8000/api/images_profil/${file.filename}`} alt="test" id="img__multer" />}
        <label htmlFor="multer">
          <img src={camera} alt="selection_image" id="imgPhoto" />
        </label>
      </div>

      <button id="upload__img" type="submit" onClick={submitFiles}>
        Save New Image
      </button>
    </div>
  );
}
