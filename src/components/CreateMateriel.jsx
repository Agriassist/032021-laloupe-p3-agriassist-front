/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HautDepage from './HautDePage';
import '../Styles/CreateMateriel.css';
import '../Styles/OneParcMateriel.css';
import '../Styles/UpdateMateriel.css';
import CreateMarque from './CreateMarque';
import CreateModele from './CreateModele';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function CreateMateriel() {
  const [year, setYear] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
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
    axios(`${API_BASE_URL}/api/users`)
      .then((data) => data.data)
      .then((data) => {
        setTableau(data);
      });
  }, []);

  useEffect(() => {
    if (marqueId) {
      axios(`${API_BASE_URL}/api/modele/marque/${marqueId}`)
        .then((data) => data.data)
        .then((data) => {
          setTableauModele(data);
        });
    }
  }, [marqueId]);

  useEffect(() => {
    axios(`${API_BASE_URL}/api/marque`)
      .then((data) => data.data)
      .then((data) => {
        setTableauMarque(data);
      });
  }, []);

  function submitMateriel(e) {
    e.preventDefault();

    axios({
      method: 'POST',
      url: `${API_BASE_URL}/api/materiels`,
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
      .then(() => {
        setYear('');
        setSerialNumber('');
        setType('');
        setPrevOil('');
        setNextOil('');
        setAgriculteurIdentifiant('');
        setConcessionnaireIdentifiant('');
      })
      .catch(() => {
        alert('Lien creation fail');
      });
  }

  return (
    <div className="container_materiel_creation">
      <HautDepage />
      <div className="big-containeur">
        <div>
          <p className="OPM_title">Cr??ation d'un mat??riel</p>
          <div className="OPM_infos">
            <input type="text" placeholder="Date de mise en service..." value={year} onChange={(e) => setYear(e.target.value)} maxLength="4" />
            <input type="text" placeholder="Numero de s??rie..." value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            <div className="title__agri">
              <h3>Marques</h3>
            </div>
            <select
              className="select__marque"
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
            {marqueId && (
              <>
                <div className="title__agri">
                  <h3>Mod??les</h3>
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
            <input
              type="text"
              placeholder="Agriculteur..."
              value={agriculteurIdentifiant}
              onChange={(e) => setAgriculteurIdentifiant(e.target.value)}
            />
            {tableau.filter((users) => {
              const prenom = users.prenom.toLowerCase();
              return users.statue === 'agriculteur' && prenom.startsWith(agriculteurIdentifiant.toLowerCase());
            }).length > 0 &&
              agriculteurIdentifiant && (
                <div className="container__card__choice">
                  {tableau
                    .filter((users) => {
                      const prenom = users.prenom.toLowerCase();
                      return users.statue === 'agriculteur' && prenom.startsWith(agriculteurIdentifiant.toLowerCase());
                    })
                    .map((text, index) => (
                      <div
                        className="card__choice"
                        onClick={() => {
                          setAgriculteurIdentifiant(text.prenom);
                          setAgriculteurId(text.id);
                        }}
                        key={index}>
                        <div className="containainer__card__img">
                          <img src={`${API_BASE_URL}/images_profil/${text.photo_profil}`} alt="test" />
                        </div>
                        <div>
                          <p style={{ marginTop: '5px', fontSize: '15px', paddingBottom: '5px' }}>{text.prenom}</p>
                          <p style={{ fontSize: '15px' }}>{text.nom}</p>
                        </div>
                      </div>
                    ))}
                </div>
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
            {tableau.filter((users) => {
              const prenom = users.prenom.toLowerCase();
              return users.statue === 'concessionnaire' && prenom.startsWith(concessionnaireIdentifiant.toLowerCase());
            }).length > 0 &&
              concessionnaireIdentifiant && (
                <div className="container__card__choice">
                  {tableau
                    .filter((users) => {
                      const prenom = users.prenom.toLowerCase();
                      return users.statue === 'concessionnaire' && prenom.startsWith(concessionnaireIdentifiant.toLowerCase());
                    })
                    .map((text, index) => (
                      <div
                        className="card__choice"
                        onClick={() => {
                          setConcessionnaireIdentifiant(text.prenom);
                          setConcessionnaireId(text.id);
                        }}
                        key={index}>
                        <div className="containainer__card__img">
                          <img src={`${API_BASE_URL}/images_profil/${text.photo_profil}`} alt="test" />
                        </div>
                        <div>
                          <p style={{ marginTop: '5px', fontSize: '15px' }}>{text.prenom}</p>
                          <p style={{ fontSize: '15px' }}>{text.nom}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}

            <button className="btn__create__materiel" onClick={submitMateriel}>
              Envoyer
            </button>
          </div>
        </div>
        <div>
          <p className="OPM_title_marque">Marque</p>
          <div className="OPM_infos">
            <CreateMarque />
          </div>
        </div>
        <div>
          <p className="OPM_title_modele">Mod??le</p>
          <div className="OPM_infos">
            <CreateModele />
          </div>
        </div>
      </div>
    </div>
  );
}
