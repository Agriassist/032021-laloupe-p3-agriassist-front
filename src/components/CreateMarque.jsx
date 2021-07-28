import React from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function CreateMarque() {
  const [newMarque, setNewMarque] = React.useState('');

  function create_marque() {
    axios({
      method: 'POST',
      url: `${API_BASE_URL}/api/marque`,
      data: { name: newMarque },
    }).then(() => {
      setNewMarque('');
      alert('marque créée');
    });
  }
  return (
    <div className="center">
      <div className="title__concess">
        <h3>Marque</h3>
        <input type="text" onChange={(e) => setNewMarque(e.target.value)} />
      </div>
      <button className="btn__create__marque" onClick={create_marque}>
        Créer
      </button>
    </div>
  );
}
export default CreateMarque;
