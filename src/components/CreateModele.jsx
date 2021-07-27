/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import HautDePage from './HautDePage';
import '../Styles/CreateModele.css';
import axios from 'axios';
import camera from '../camera.png';
import tracteur from '../images/maxresdefault.jpg';

export default function CreateModele() {
  const [tableauMarque, setTableauMarque] = useState([]);
  const [marqueId, setMarqueId] = useState();
  const [modele, setModele] = useState('');
  const [fileSelected, setFileSelected] = useState(null);

  useEffect(() => {
    axios('http://localhost:8000/api/marque')
      .then((data) => data.data)
      .then((data) => {
        setTableauMarque(data);
      });
  }, []);

  const onChangeFile = (event) => {
    const { type } = event.target.files[0];
    if (type !== 'image/png' || type !== 'image/jpeg') {
      setFileSelected(event.target.files[0]);
      console.log(event.target.files[0]);
    } else {
      alert("Veuillez selectionner un format d'image valide");
    }
  };

  function saveModele() {
    if (modele.length >= 1) {
      const data = new FormData();
      data.append('file', fileSelected);
      data.append(
        'modele',
        JSON.stringify({
          name: modele,
          marque_id: marqueId,
        }),
      );
      axios({
        method: 'POST',
        url: 'http://localhost:8000/api/modele',
        data,
      })
        .then((data) => data.data)
        .then((data) => {
          setFileSelected('');
          setModele('');
          setMarqueId('');
          alert('Modele ajouté')
          //   dispatch({ type: 'SET_PROFIL_PICTURE', profil_picture: data.photo_profil });
        })
        .catch((err) => {
          alert(err.response.data);
        });
    } else {
      alert("Veuillez rentrer correctemment les informations pour la création d'un modele");
    }
  }
  return (
    <div className="container__modeles">
      <HautDePage />

      <input type="file" accept="image/*" id="multer" onChange={onChangeFile} />
      <div className="container__imgprofil">
        <img src={tracteur} alt="test" id="img__multer" />

        <label htmlFor="multer">
          <img src={camera} alt="selection_image" id="imgPhoto" />
        </label>
      </div>

      <div className="container__choice__modele">
        <select
          className="select__marque__modele"
          defaultValue="..."
          onChange={(e) => {
            setMarqueId(e.target.selectedOptions[0].id);
          }}>
          <option key="0" id="0">
            ...
          </option>
          {tableauMarque.map((text) => (
            <option key={text.id} id={text.id}>
              {text.name}
            </option>
          ))}
        </select>

        <input type="text" id="input__name__modele" placeholder="Name..." value={modele} onChange={(e) => setModele(e.target.value)} />
        <button onClick={saveModele}>Save Modele</button>
      </div>
    </div>
  );
}
