/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import '../Styles/CreateModele.css';
import axios from 'axios';
import camera from '../camera.png';
import tracteur from '../images/maxresdefault.jpg';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function CreateModele() {
  const [tableauMarque, setTableauMarque] = useState([]);
  const [tableauModele, setTableauModele] = useState([]);
  const [marqueId, setMarqueId] = useState();
  const [marqueIdSup, setMarqueIdSup] = useState();
  const [modeleId, setModeleId] = useState();
  const [modele, setModele] = useState('');
  const [fileSelected, setFileSelected] = useState(null);

  useEffect(() => {
    axios(`${API_BASE_URL}/api/marque`)
      .then((data) => data.data)
      .then((data) => {
        setTableauMarque(data);
      });
  }, []);

  useEffect(() => {
    if (marqueIdSup) {
      axios(`${API_BASE_URL}/api/modele/marque/${marqueIdSup}`)
        .then((data) => data.data)
        .then((data) => {
          setTableauModele(data);
        });
    }
  }, [marqueIdSup]);

  useEffect(() => {
    if (marqueIdSup) {
      window.scroll(0, 100);
    }
  }, [marqueIdSup]);

  function delete_modele() {
    axios({
      method: 'DELETE',
      url: `${API_BASE_URL}/api/modele/${modeleId}`,
    }).then(() => {
      alert('modele suprimée');
      window.location.reload();
    });
  }

  const onChangeFile = (event) => {
    const { type } = event.target.files[0];
    if (type !== 'image/png' || type !== 'image/jpeg') {
      setFileSelected(event.target.files[0]);
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
        url: `${API_BASE_URL}/api/modele`,
        data,
      })
        .then(() => {
          setFileSelected('');
          setModele('');
          setMarqueId('');
          alert('Modele ajouté');
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.data);
        });
    } else {
      alert("Veuillez rentrer correctemment les informations pour la création d'un modele");
    }
  }
  return (
    <div>
      <div className="container__modeles">
        <h3>Création d'un modele : </h3>
        <input type="file" accept="image/*" id="multer" onChange={onChangeFile} />
        <div className="container__imgprofil">
          <img src={tracteur} alt="test" id="img__multer" />

          <label htmlFor="multer">
            <img src={camera} alt="selection_image" id="imgPhoto" />
          </label>
        </div>

        <div className="container__choice__modele">
          <h3>marques</h3>
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
          <h3>nom du modele</h3>
          <input type="text" id="input__name__modele" placeholder="Name..." value={modele} onChange={(e) => setModele(e.target.value)} />
          <button className="btn__create__marque" onClick={saveModele}>
            créée
          </button>
        </div>
      </div>
      <div className="container__choice__modele">
        <h3 className="supression-text">Supression d'un modele : </h3>
        <h3>marques</h3>
        <select
          className="select__marque__modele"
          defaultValue="..."
          onChange={(e) => {
            setMarqueIdSup(e.target.selectedOptions[0].id);
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
        {marqueIdSup && (
          <>
            <div className="title__agri">
              <h3>Modeles</h3>
            </div>
            <select
              className="select__marque__modele"
              defaultValue="..."
              onChange={(e) => {
                setModeleId(e.target.selectedOptions[0].id);
              }}>
              <option key="0" id="0">
                ...
              </option>
              {tableauModele.map((text) => (
                <option key={text.id} id={text.id}>
                  {text.name}
                </option>
              ))}
            </select>
          </>
        )}
        <button className="btn__create__marque" onClick={delete_modele}>
          suprimée
        </button>
      </div>
    </div>
  );
}
