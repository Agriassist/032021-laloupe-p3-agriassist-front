/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HautDePage from './HautDePage';
import '../Styles/UpdateMateriel.css';
import '../Styles/OneParcMateriel.css';
import { useStateValue } from '../contexts/Context';

function UpdateMateriel() {
  const [infos, setInfos] = useState({});
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
  const [park, setPark] = useState([]);

  const [{ status, materielId }] = useStateValue();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/api/materiels/${materielId}`,
    })
      .then((data) => {
        setInfos(data.data);
        setModeleId(data.data.modele.id);
        setMarqueId(data.data.marque.id);
        setYear(data.data.materiel.year);
        setSerialNumber(data.data.materiel.serial_number);
        setType(data.data.materiel.type);
        setPrevOil(data.data.materiel.prev_oil_change);
        setNextOil(data.data.materiel.next_oil_change);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    let dataTableau, dataTableauPark;
    axios(`${API_BASE_URL}/api/users`)
      .then((data) => data.data)
      .then((data) => {
        dataTableau = data;
        // setTableau(data);
        axios(`${API_BASE_URL}/api/park/materiel/${materielId}`)
          .then((data) => data.data)
          .then((data) => {
            dataTableauPark = data;
            // setPark(data);
            axios(`${API_BASE_URL}/api/marque`)
              .then((data) => data.data)
              .then((data) => {
                setTableauMarque(data);
                setTableau(dataTableau);
                setPark(dataTableauPark);
              });
          });
      });
  }, [infos]);

  useEffect(() => {
    if (marqueId) {
      axios(`${API_BASE_URL}/api/modele/marque/${marqueId}`)
        .then((data) => data.data)
        .then((data) => {
          setTableauModele(data);
        });
    }
  }, [marqueId]);

  function submitMateriel(e) {
    e.preventDefault();

    axios({
      method: 'PUT',
      url: `${API_BASE_URL}/api/materiels/${materielId}`,
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
      .then(() => {
        alert('modification effectu??e');
      })
      .catch(() => {
        alert('Lien creation fail');
      });
  }

  useEffect(() => {
    setNextOil(parseInt(prevOil.split('h')[0], 10) + 600 + 'h');
  }, [prevOil]);

  useEffect(() => {
    if (tableau.length > 0 && park.length > 0) {
      tableau.filter((text) => {
        park.filter((user) => {
          if (user.users_id === text.id) {
            if (text.statue === 'agriculteur') {
              setAgriculteurId(text.id);
              setAgriculteurIdentifiant(text.prenom);
            } else if (text.statue === 'concessionnaire') {
              setConcessionnaireId(text.id);
              setConcessionnaireIdentifiant(text.prenom);
            }
          }
        });
      });
    }
  }, [park, tableau]);

  return (
    <div className="container_materiel_creation">
      <HautDePage />
      <p className="OPM_title">Modification du mat??riel</p>
      <div className="OPM_infos">
        {infos.materiel && park.length > 0 && (
          <>
            {status === 'administrateur' && (
              <>
                <h3 className="titleUpdateMateriel">Marque :</h3>
                <select
                  className="select__marque"
                  defaultValue={infos.marque.name}
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
                <h3 className="titleUpdateMateriel">Mod??le :</h3>
                {marqueId && (
                  <select
                    className="select__modele"
                    defaultValue={infos.modele.name}
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
                )}
                <h3 className="titleUpdateMateriel">Ann??e de mise en service :</h3>
                <input type="number" defaultValue={infos.materiel.year} onChange={(e) => setYear(e.target.value)} />
                <h3 className="titleUpdateMateriel">Num??ro de s??rie :</h3>
                <input type="text" defaultValue={infos.materiel.serial_number} onChange={(e) => setSerialNumber(e.target.value)} />
              </>
            )}
            <h3 className="titleUpdateMateriel">Derni??re vidange moteur :</h3>
            <input type="text" defaultValue={infos.materiel.prev_oil_change} onChange={(e) => setPrevOil(e.target.value)} />

            {(status === 'agriculteur' || status === 'concessionnaire') && (
              <>
                <h3 className="titleUpdateMateriel">Prochaine vidange moteur :</h3>
                <input type="text" defaultValue={infos.materiel.prev_oil_change} value={nextOil} readOnly={true} />
              </>
            )}
            {status === 'administrateur' && (
              <>
                <h3 className="titleUpdateMateriel">Prochaine vidange moteur :</h3>
                <input type="text" defaultValue={infos.materiel.next_oil_change} onChange={(e) => setNextOil(e.target.value)} />

                <div className="title__concess">
                  <h3>Concessionnaire</h3>
                </div>
                <input type="text" defaultValue={concessionnaireIdentifiant} onChange={(e) => setConcessionnaireIdentifiant(e.target.value)} />
                {tableau.filter((users) => {
                  const prenom = users.prenom.toLowerCase();
                  return users.statue === 'concessionnaire' && prenom.startsWith(concessionnaireIdentifiant.toLowerCase());
                }).length > 0 &&
                  concessionnaireIdentifiant && (
                    <div className="container__card__choice">
                      {tableau
                        .filter((users) => users.prenom.startsWith(concessionnaireIdentifiant) && users.statue === 'concessionnaire')
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
                <div className="title__agri">
                  <h3>Agriculteur</h3>
                </div>
                <input type="text" defaultValue={agriculteurIdentifiant} onChange={(e) => setAgriculteurIdentifiant(e.target.value)} />
                {tableau.filter((users) => {
                  const prenom = users.prenom.toLowerCase();
                  return users.statue === 'agriculteur' && prenom.startsWith(agriculteurIdentifiant.toLowerCase());
                }).length > 0 &&
                  agriculteurIdentifiant && (
                    <div className="container__card__choice">
                      {tableau
                        .filter((users) => users.prenom.startsWith(agriculteurIdentifiant) && users.statue === 'agriculteur')
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
              </>
            )}
          </>
        )}
        <button className="btn__create__materiel" onClick={submitMateriel}>
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default UpdateMateriel;
