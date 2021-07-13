import React, { useState, useEffect } from 'react';
import '../Styles/PostFiche.css';
import camera from '../camera.png';
import HautDePage from '../components/HautDePage';
import axios from 'axios';

export default function PostFiche() {
  const [fileSelected, setFileSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [modele, setModele] = useState([]);
  const [type, setType] = useState('');

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
      data.append(
        'info',
        JSON.stringify({
          name: name,
          modele_id: type.id,
        }),
      );
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/fiche_technique`,
        data: data,
      })
        .then((data) => data.data)
        .then((data) => {
          console.log(data);
          setFile('');
        })
        .catch((err) => {
          alert(err.response.status);
        });
    }
  };

  function choiceModele(event) {
    setType(event.target.value);
  }

  useEffect(() => {
    axios('http://localhost:8000/api/modele')
      .then((data) => data.data)
      .then((data) => {
        setModele(data);
      });
  });
  return (
    <div className="container__postfiche">
      <HautDePage />
      <input type="file" accept="image/*" id="upload__fiche__tech" onChange={onChangeFile} />
      <div className="container__fiche__img">
        {file && <img src={`${process.env.REACT_APP_API_URL}/api/images_profil/${file.filename}`} alt="test" id="img__multer" />}
        <img id="fiche__technique" src="" alt="" />
        <label htmlFor="upload__fiche__tech">
          <img src={camera} alt="selection_image" id="upload__fiche__tech" />
        </label>
      </div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <select name="" id="" defaultValue={type} onChange={choiceModele}>
        {modele.map((modeles, index) => (
          <option key={index} value={modeles.name}>
            {modeles.name}
          </option>
        ))}
      </select>

      <button id="btn__fiche" onClick={submitFiles}>
        Post Fiche
      </button>
    </div>
  );
}
