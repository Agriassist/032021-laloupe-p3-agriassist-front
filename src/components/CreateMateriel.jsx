import React, { useState, useEffect } from 'react';
import axios from 'axios';
import all from 'gsap/src/all';
// import { data } from 'autoprefixer';

export default function CreateMateriel() {
  const [year, setYear] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [prevOil, setPrevOil] = useState('');
  const [nextOil, setNextOil] = useState('');
  const [agriculteurIdentifiant, setAgriculteurIdentifiant] = useState('');
  const [concessionnaireIdentifiant, setConcessionnaireIdentifiant] = useState('');
  const [tableau, setTableau] = useState([]);
  const [modele, setModele] = useState('');
  const [tableauModele, setTableauModele] = useState([]);
  const [tableauMate, setTableauMate] = useState([]);
  function choiceModele(event) {
    setType(event.target.value);
  }

  // function tableauVisible() {
  //   if (agriculteurName.length > 1) {
  //     setTableauTrue(true);
  //   } else {
  //     setTableauTrue(false);
  //   }
  // }
  useEffect(() => {
    axios('http://localhost:8000/api/users')
      .then((data) => data.data)
      .then((data) => {
        setTableau(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    axios('http://localhost:8000/api/modele')
      .then((data) => data.data)
      .then((data) => {
        setTableauModele(data);
        console.log(data);
      });
  }, []);

  function submitMateriel(e) {
    e.preventDefault();
    // if (agriculteurName || concessionnaireName != data.nom) {
    //   alert("username don't exist");
    // } else if (agriculteurPrenom || concessionnairePrenom != data.prenom) {
    //   alert("firstname don't exist");
    // } else if (type === '') {
    //   alert('Choice a type!!!');
    // } else {
    // if (agriculteurName != data.nom) {
    //   alert('agriculteur nom pas trouve!!!');
    // } else {
    //   if (agriculteurPrenom != data.prenom) {
    //     alert('agriculteur prenom pas trouve');
    //   } else {
    //     if (concessionnaireName != data.prenom) {
    //       alert('concessionnaire nom pas trouve');
    //     } else {
    //       if (concessionnairePrenom != data.prenom) {
    //         alert('concessionnaire prenom pas trouve');
    //       } else {

    axios({
      method: 'POST',
      url: `http://localhost:8000/api/materiels`,
      data: { year: year, serial_number: serialNumber, type: type, next_oil_change: nextOil, prev_oil_change: prevOil, modele_id: modele.id },
    })
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
        setYear('');
        setSerialNumber('');
        setType('');
        setPrevOil('');
        setNextOil('');
        setAgriculteurIdentifiant('');
        setConcessionnaireIdentifiant('');
      })
      .axios({
        method: 'POST',
        url: 'http://localhost:8000/api/park',
        data: { user_id: agriculteurIdentifiant},
      })
      .axios('http://localhost:8000/api/materiels')
      .then((allData) => allData.data)
      .then((allData) => {
        setTableauMate(allData);
      })
      .axios({
        method: 'POST',
        url: 'http://localhost:8000/api/park',
        data: { materiel_id: allData.id },
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
      <input type="text" placeholder="..." value={agriculteurIdentifiant} onChange={(e) => setAgriculteurIdentifiant(e.target.value)} />
      {tableau && agriculteurIdentifiant && (
        <ul>
          {tableau
            .filter((users) => users.nom.startsWith(agriculteurIdentifiant) && users.statue === 'agriculteur')
            .map((filteredPerson, index) => (
              <li key={index} style={{ fontSize: 20 }}>
                {filteredPerson.nom}
              </li>
            ))}{' '}
        </ul>
      )}

      <h2>Concessionnaire</h2>
      <input type="text" placeholder="..." value={concessionnaireIdentifiant} onChange={(e) => setConcessionnaireIdentifiant(e.target.value)} />
      {tableau && concessionnaireIdentifiant && (
        <ul>
          {tableau
            .filter((users) => users.nom.startsWith(concessionnaireIdentifiant) && users.statue === 'concessionnaire')
            .map((filteredConc, index) => (
              <li key={index} style={{ fontSize: 20 }}>
                {filteredConc.nom}
              </li>
            ))}{' '}
        </ul>
      )}

      <input type="text" placeholder="Modele_id" value={modele} onChange={(e) => setModele(e.target.value)} />
      {tableauModele && modele && (
        <ul>
          {tableauModele
            .filter((modeles) => modeles.nom.startsWith(modele))
            .map((filteredModele, index) => (
              <li key={index} style={{ fontSize: 20 }}>
                {filteredModele.nom}
              </li>
            ))}{' '}
        </ul>
      )}

      <button className="btn__materiel" onClick={submitMateriel}>
        Submit
      </button>
    </div>
  );
}
