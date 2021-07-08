import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { data } from 'autoprefixer';

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
  const [tableau, setTableau] = useState([]);
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

    if (agriculteurPrenom != data.prenom || agriculteurName != data.name) {
      alert("cette personne n'existe pas!!!!");
    } else {
      if (data.status != 'agriculteur') {
        alert('cette personne pas etre un agriculteur');
      } else {
        if (concessionnairePrenom != data.prenom || concessionnaireName != data.name) {
          alert("cette personne n'existe pas!!!!");
        } else {
          if (data.status != 'concessionaire') {
            alert('cette personne pas etre un concessionnaire');
          } else {
            // const user = [data.prenom, data.name, data.status];
            const userAgri = [agriculteurName, agriculteurPrenom];
            const userConc = [concessionnaireName, concessionnairePrenom];
            if (userAgri.match(data.id) && userConc.match(data.id)) {
              return data.id;
            }
          }
          axios({
            method: 'POST',
            url: `http://localhost:8000/api/materiels`,
            data: { year: year, serial_number: serialNumber, type: type, next_oil_change: nextOil, prev_oil_change: prevOil },
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
      }
    }
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

      {tableau
        .filter((users) => users.name === agriculteurName && users.status === 'agriculteur')
        .slice(0, 20)
        .map((filteredPerson, index) => (
          <>
            <li key={index} style={{ fontSize: 20 }}>
              {filteredPerson.name}
            </li>
          </>
        ))}

      <button className="btn__materiel" onClick={submitMateriel}>
        Submit
      </button>
    </div>
  );
}
