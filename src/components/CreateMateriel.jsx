/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HautDepage from './HautDePage';
import '../Styles/CreateMateriel.css';
import '../Styles/OneParcMateriel.css';
import '../Styles/UpdateMateriel.css';
import CreateMarque from './CreateMarque';
import CreateModele from './CreateModele';
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
  const [marqueId, setMarqueId] = useState();
  const [modeleId, setModeleId] = useState();

  useEffect(() => {
    axios('REACT_APP_API_URL/api/users')
      .then((data) => data.data)
      .then((data) => {
        setTableau(data);
      });
  }, []);

  useEffect(() => {
    if (marqueId) {
      axios(`REACT_APP_API_URL/api/modele/marque/${marqueId}`)
        .then((data) => data.data)
        .then((data) => {
          console.log('coucou');
          setTableauModele(data);
        });
    }
  }, [marqueId]);

  useEffect(() => {
    axios('REACT_APP_API_URL/api/marque')
      .then((data) => data.data)
      .then((data) => {
        setTableauMarque(data);
      });
  }, []);

  function submitMateriel(e) {
    e.preventDefault();

    axios({
      method: 'POST',
      url: `REACT_APP_API_URL/api/materiels`,
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
      <div className="big-containeur">
        <div>
          <p className="OPM_title">Création d'un matériel</p>
          <div className="OPM_infos">
            <input type="text" placeholder="Date de mise en service..." value={year} onChange={(e) => setYear(e.target.value)} maxLength="4" />
            <input type="text" placeholder="Numero de série..." value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            <div className="title__agri">
              <h3>Marques</h3>
            </div>
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
            {marqueId && (
              <>
                <div className="title__agri">
                  <h3>Modeles</h3>
                </div>
                <select
                  className="select__modele"
                  defaultValue="..."
                  onChange={(e) => {
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
              </>
            )}
            <input type="text" placeholder="Derniere vidange..." value={prevOil} onChange={(e) => setPrevOil(e.target.value)} />
            <input type="text" placeholder="Prochaine vidange..." value={nextOil} onChange={(e) => setNextOil(e.target.value)} />
            <div className="title__agri">
              <h3>Agriculteur</h3>
            </div>
            <input type="text" placeholder="Agriculteur..." value={agriculteurIdentifiant} onChange={(e) => setAgriculteurIdentifiant(e.target.value)} />
            {tableau && agriculteurIdentifiant && (
              <ul>
                {tableau
                  .filter(
                    (users) =>
                      users.statue === 'agriculteur' &&
                      (users.nom.startsWith(agriculteurIdentifiant.toUpperCase()) || users.nom.startsWith(agriculteurIdentifiant.toLowerCase())),
                  )
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
                  .filter(
                    (users) =>
                      users.statue === 'concessionnaire' &&
                      (users.nom.startsWith(concessionnaireIdentifiant.toUpperCase()) || users.nom.startsWith(concessionnaireIdentifiant.toLowerCase())),
                  )
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
        <div>
          <p className="OPM_title_marque">Création d'une marque</p>
          <div className="OPM_infos">
            <CreateMarque />
          </div>
        </div>
        <div>
          <p className="OPM_title_modele">Création d'un modele</p>
          <div className="OPM_infos">
            <CreateModele />
          </div>
        </div>
      </div>
    </div>
  );
}
