import React from 'react';
import axios from 'axios';

function CreateMarque() {
  const [newMarque, setNewMarque] = React.useState('');

  function create_marque() {
    axios({
      method: 'POST',
      url: `REACT_APP_API_URL/api/marque`,
      data: { name: newMarque },
    }).then(() => {
      setNewMarque('');
      alert('marque créée');
    });
  }
  return (
    <div className="center">
      <div className="title__concess">
        <h3>marque</h3>
        <input type="text" onChange={(e) => setNewMarque(e.target.value)} />
      </div>
      <button className="btn__create__marque" onClick={create_marque}>
        créée
      </button>
    </div>
  );
}
export default CreateMarque;
