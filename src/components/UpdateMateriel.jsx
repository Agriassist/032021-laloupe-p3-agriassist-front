/* eslint-disable jsx-a11y/no-onchange */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HautDePage from './HautDePage';
import '../Styles/UpdateMateriel.css';
import '../Styles/OneParcMateriel.css';
import { useStateValue } from '../contexts/Context';

function UpdateMateriel(props) {
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

  const [{ status }] = useStateValue();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/api/materiels/${props.materielId}`,
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
    let dataTableau, dataTableauPark, dataTableauModele;
    axios('REACT_APP_API_URL/api/users')
      .then((data) => data.data)
      .then((data) => {
        dataTableau = data;
        // setTableau(data);
        axios(`${process.env.REACT_APP_API_URL}/api/park/materiel/${props.materielId}`)
          .then((data) => data.data)
          .then((data) => {
            dataTableauPark = data;
            // setPark(data);
            axios(`${process.env.REACT_APP_API_URL}/api/marque`)
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
      axios(`REACT_APP_API_URL/api/modele/marque/${marqueId}`)
        .then((data) => data.data)
        .then((data) => {
          console.log('coucou');
          setTableauModele(data);
        });
    }
  }, [marqueId]);

  function submitMateriel(e) {
    e.preventDefault();

    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}/api/materiels/${props.materielId}`,
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
        alert('modification effectuée');
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
              setAgriculteurIdentifiant(text.nom);
            } else if (text.statue === 'concessionnaire') {
              setConcessionnaireId(text.id);
              setConcessionnaireIdentifiant(text.nom);
            }
          }
        });
      });
    }
  }, [park, tableau]);

  return (
    <div className="container_materiel_creation">
      <HautDePage />
      <p className="OPM_title">Modification du matériel</p>
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
                <h3 className="titleUpdateMateriel">Modèle :</h3>
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
                <h3 className="titleUpdateMateriel">Année de mise en service :</h3>
                <input type="number" defaultValue={infos.materiel.year} onChange={(e) => setYear(e.target.value)} />
                <h3 className="titleUpdateMateriel">Numéro de série :</h3>
                <input type="text" defaultValue={infos.materiel.serial_number} onChange={(e) => setSerialNumber(e.target.value)} />
              </>
            )}
            <h3 className="titleUpdateMateriel">Dernière vidange moteur :</h3>
            <input type="text" defaultValue={infos.materiel.prev_oil_change} onChange={(e) => setPrevOil(e.target.value)} />

            {status === 'agriculteur' && (
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
                <div className="title__agri">
                  <h3>Agriculteur</h3>
                </div>
                <input type="text" defaultValue={agriculteurIdentifiant} onChange={(e) => setAgriculteurIdentifiant(e.target.value)} />
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
