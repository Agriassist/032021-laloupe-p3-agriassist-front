/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HautDepage from './HautDePage';
import '../Styles/CreateMateriel.css';
import '../Styles/OneParcMateriel.css';
import '../Styles/UpdateMateriel.css';
// import { data } from 'autoprefixer';

export default function CreateMateriel() {
  const [year, setYear] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [typeMa, setTypeMa] = useState('');
  const [prevOil, setPrevOil] = useState('');
  const [nextOil, setNextOil] = useState('');
  const [agriculteurIdentifiant, setAgriculteurIdentifiant] = useState('');
  const [agriculteurId, setAgriculteurId] = useState('');
  const [concessionnaireIdentifiant, setConcessionnaireIdentifiant] = useState('');
  const [concessionnaireId, setConcessionnaireId] = useState('');
  const [tableau, setTableau] = useState([]);
  const [tableauModele, setTableauModele] = useState([]);
  const [tableauMarque, setTableauMarque] = useState([]);
  const [tableauMate, setTableauMate] = useState([]);
  const [marqueId, setMarqueId] = useState();
  const [modeleId, setModeleId] = useState();

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

  useEffect(() => {
    axios('http://localhost:8000/api/marque')
      .then((data) => data.data)
      .then((data) => {
        setTableauMarque(data);
        console.log(data);
      });
  }, []);

  function submitMateriel(e) {
    e.preventDefault();

    axios({
      method: 'POST',
      url: `http://localhost:8000/api/materiels`,
      data: {
        year: year,
        serial_number: serialNumber,
        type: type,
        next_oil_change: nextOil,
        prev_oil_change: prevOil,
        modele_id: modeleId,
        marque_id: marqueId,
        concessionnaireId: concessionnaireId,
        agriculteurId: agriculteurId,
      },
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
      .catch((err) => {
        alert('Lien creation fail');
      });
  }

  return (
    <div className="container_materiel_creation">
      <HautDepage />
      <p className="OPM_title">Création d'un matériel</p>
      <div className="OPM_infos">
        <input type="text" placeholder="Date de mise en service..." value={year} onChange={(e) => setYear(e.target.value)} maxLength="4" />
        <input type="text" placeholder="Numero de série..." value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
        <select
          className="select__marque"
          defaultValue="..."
          onChange={(e) => {
            setTypeMa(e.target.value);
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
        <select
          className="select__modele"
          defaultValue="..."
          onChange={(e) => {
            console.log(e);
            setType(e.target.value);
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
        <input type="text" placeholder="Derniere vidange..." value={prevOil} onChange={(e) => setPrevOil(e.target.value)} />
        <input type="text" placeholder="Prochaine vidange..." value={nextOil} onChange={(e) => setNextOil(e.target.value)} />
        <div className="title__agri">
          <h3>Agriculteur</h3>
        </div>
        <input type="text" placeholder="Agriculteur..." value={agriculteurIdentifiant} onChange={(e) => setAgriculteurIdentifiant(e.target.value)} />
        {tableau && agriculteurIdentifiant && (
          <ul>
            {tableau
              .filter((users) => users.nom.startsWith(agriculteurIdentifiant) && users.statue === 'agriculteur')
              .map((text, index) => (
                <button
                  onClick={() => {
                    setAgriculteurIdentifiant(text.nom);
                    setAgriculteurId(text.id);
                  }}
                  key={index}
                  style={{ fontSize: 20 }}>
                  {text.nom}
                </button>
              ))}{' '}
          </ul>
        )}
        <div className="title__concess">
          <h3>Concessionnaire</h3>
        </div>
        <input
          type="text"
          placeholder="Concessionaire..."
          value={concessionnaireIdentifiant}
          onChange={(e) => setConcessionnaireIdentifiant(e.target.value)}
        />
        {tableau && concessionnaireIdentifiant && (
          <section>
            {tableau
              .filter((users) => users.nom.startsWith(concessionnaireIdentifiant) && users.statue === 'concessionnaire')
              .map((text, index) => (
                <button
                  onClick={() => {
                    setConcessionnaireIdentifiant(text.nom);
                    setConcessionnaireId(text.id);
                  }}
                  key={index}
                  style={{ fontSize: 20 }}>
                  {text.nom}
                </button>
              ))}
          </section>
        )}

        <button className="btn__create__materiel" onClick={submitMateriel}>
          Envoyer
        </button>
      </div>
    </div>
  );
}
