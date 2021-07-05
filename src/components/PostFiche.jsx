import React, { useState, useEffect } from 'react';
import '../Styles/PostFiche.css';
import camera from '../camera.png';
import HautDePage from '../components/HautDePage';

export default function PostFiche() {
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
    <div className="container__postfiche">
      <HautDePage />
      <input type="file" accept="image/*" id="upload__fiche__tech" onChange={onChangeFile} />
      <div className="container__fiche__img">
        {file && <img src={`http://localhost:8000/api/images_profil/${file.filename}`} alt="test" id="img__multer" />}
        <img id="fiche__technique" src="" alt="" />
        <label htmlFor="upload__fiche__tech">
          <img src={camera} alt="selection_image" id="upload__fiche__tech" />
        </label>
      </div>

      <button id="btn__fiche" onClick={submitFiles}>Post Fiche</button>
    </div>
  );
}
