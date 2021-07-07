import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateMateriel() {
  const [year, setYear] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [prevOil, setPrevOil] = useState('');
  const [nextOil, setNextOil] = useState('');
  const [agriculteurName, setAgriculteurName] = useState('');
  const [agriculteurPrenom, setAgriculteurPrenom] = useState('');
  const [concessionnaireName, setConcessionnaireName] = useState('');
  const [concessionnairePrenom, setConcessionnairePrenom] = useState('');

  function choiceModele(event) {
    setType(event.target.value);
  }

  function submitMateriel(e) {
    e.preventDefault();
    // if (agriculteurName || concessionnaireName != data.nom) {
    //   alert("username don't exist");
    // } else if (agriculteurPrenom || concessionnairePrenom != data.prenom) {
    //   alert("firstname don't exist");
    // } else if (type === '') {
    //   alert('Choice a type!!!');
    // } else {

    axios({
      method: 'POST',
      url: `http://localhost:8000/api/materiels`,
      data: { year: year, serial_number: serialNumber, type: type, next_oil_chang: nextOil, prev_oil_chang: prevOil },
    })
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
        setYear('');
        setSerialNumber('');
        setType('');
        setPrevOil('');
        setNextOil('');
      })
      .catch((err) => {
        alert('Lien creation fail');
      });
    // }
  }

  // useEffect(() => {
  //   axios('').then((data) => data.data);
  //   setAgriculteur(data);
  // });

  return (
    <div className="container_materiel_creation">
      <img src="" alt="" />
      <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
      <select name="" id="" defaultValue={type} onChange={choiceModele}>
        <option value="select modele">Citroen</option>
        <option value="peugeot">Peugeot</option>
        <option value="renault">Renault</option>
        <option value="ford">Ford</option>
      </select>
      <input type="text" value={prevOil} onChange={(e) => setPrevOil(e.target.value)} />
      <input type="text" value={nextOil} onChange={(e) => setNextOil(e.target.value)} />

      <h2>Agriculteur</h2>
      <input type="text" placeholder="..." value={agriculteurName} onChange={(e) => setAgriculteurName(e.target.value)} />
      <input type="text" placeholder="..." value={agriculteurPrenom} onChange={(e) => setAgriculteurPrenom(e.target.value)} />
      <h2>Concessionnaire</h2>
      <input type="text" placeholder="..." value={concessionnaireName} onChange={(e) => setConcessionnaireName(e.target.value)} />
      <input type="text" placeholder="..." value={concessionnairePrenom} onChange={(e) => setConcessionnairePrenom(e.target.value)} />
      <button className="btn__materiel" onClick={submitMateriel}>
        Submit
      </button>
    </div>
  );
}
