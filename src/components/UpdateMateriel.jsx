/* eslint-disable jsx-a11y/no-onchange */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UpdateMateriel(props) {
  const [infos, setInfos] = useState({});
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
  const [park, setPark] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/api/materiels/${props.materielId}`,
    })
      .then((data) => {
        console.log(data.data);
        setInfos(data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    axios('http://localhost:8000/api/users')
      .then((data) => data.data)
      .then((data) => {
        setTableau(data);
        console.log(data, 'donnée all users');
      });
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/api/park/materiel/${props.materielId}`)
      .then((data) => data.data)
      .then((data) => {
        setPark(data);
        console.log(data, 'donnée users');
      });
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/api/modele`)
      .then((data) => data.data)
      .then((data) => {
        setTableauModele(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/api/marque`)
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
      url: `${process.env.REACT_APP_API_URL}/api/materiels`,
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

  const test = (stat) => {
    const result = tableau.filter((text) => {
      const tri = park.filter((user) => {
        if (user.users_id === text.id) {
          return text.statue === stat;
        }
      });
      return tri.length > 0 ? true : false;
    });
    console.log(result);
    return result[0].nom;
  };

  return (
    <div className="container_materiel_creation">
      {infos.materiel && park.length > 0 && (
        <>
          <input type="number" defaultValue={infos.materiel.year} onChange={(e) => setYear(e.target.value)} />
          <input type="text" defaultValue={infos.materiel.serial_number} onChange={(e) => setSerialNumber(e.target.value)} />
          <select
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
          <input type="text" defaultValue={infos.materiel.prev_oil_change} onChange={(e) => setPrevOil(e.target.value)} />
          <input type="text" defaultValue={infos.materiel.next_oil_change} onChange={(e) => setNextOil(e.target.value)} />

          <h2>Agriculteur</h2>
          <input type="text" defaultValue={test('agriculteur')} onChange={(e) => setAgriculteurIdentifiant(e.target.value)} />
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

          <h2>Concessionnaire</h2>
          <input type="text" defaultValue={test('concessionnaire')} onChange={(e) => setConcessionnaireIdentifiant(e.target.value)} />
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
        </>
      )}

      <button className="btn__materiel" onClick={submitMateriel}>
        Submit
      </button>
    </div>
  );
}

export default UpdateMateriel;
