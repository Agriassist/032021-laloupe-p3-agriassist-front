/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function CreateMarque() {
  const [newMarque, setNewMarque] = useState('');
  const [allMarques, setAllMarques] = useState([]);
  const [marqueId, setMarqueId] = useState();

  function create_marque() {
    axios({
      method: 'POST',
      url: `${API_BASE_URL}/api/marque`,
      data: { name: newMarque },
    }).then(() => {
      setNewMarque('');
      alert(`marque ${newMarque} créée`);
      window.location.reload();
    });
  }

  function delete_marque() {
    axios({
      method: 'DELETE',
      url: `${API_BASE_URL}/api/marque/${marqueId}`,
    }).then(() => {
      setNewMarque('');
      setMarqueId('');
      alert('marque suprimée');
      window.location.reload();
    });
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/api/marque`,
    }).then((res) => {
      setAllMarques(res.data);
      // alert('marque créée');
    });
  }, []);

  return (
    <div>
      <div className="center">
        <div className="title__concess">
          <h3>Création d'une marque : </h3>
          <input type="text" value={newMarque} onChange={(e) => setNewMarque(e.target.value)} />
        </div>
        <button className="btn__create__marque" onClick={create_marque}>
          créée
        </button>
      </div>
      <div className="center">
        <div className="title__concess">
          <h3>Supression d'une marque : </h3>
          <select
            className="select__modele"
            onChange={(e) => {
              setMarqueId(e.target.selectedOptions[0].id);
            }}>
            {allMarques.map((text) => (
              <option key={text.id} id={text.id}>
                {text.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn__create__marque" onClick={delete_marque}>
          suprimée
        </button>
      </div>
    </div>
  );
}
export default CreateMarque;
