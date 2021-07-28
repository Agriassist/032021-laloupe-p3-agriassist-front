import '../Styles/OneParcMateriel.css';
import HautDePage from './HautDePage';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../contexts/Context';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function OneParcMateriel() {
  const [infos, setInfos] = useState({});
  const [{ status, materielId }] = useStateValue();
  const [fiche, setFiche] = useState([]);
  const [ficheModeleId, setFicheModeleId] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/materiels/${materielId}`)
      .then((resp) => resp.json())
      .then((data) => {
        const [marque, modele, MES, serialNumber, prev_oil, next_oil] = [
          data.marque.name,
          data.modele.name,
          data.materiel.year,
          data.materiel.serial_number,
          data.materiel.prev_oil_change,
          data.materiel.next_oil_change,
        ];
        const infos = { marque, modele, MES, serialNumber, prev_oil, next_oil };
        setInfos(infos);
      });
  }, []);

  useEffect(() => {
    axios(`${API_BASE_URL}/api/fiche_technique/`)
      .then((data) => data.data)
      .then((data) => {
        let ficheWait = [];

        ficheWait = data.filter((x) => ficheModeleId === x.modele_id);

        setFiche(ficheWait);
      });
  }, [ficheModeleId]);

  useEffect(() => {
    axios(`${API_BASE_URL}/api/modele`)
      .then((data) => data.data)
      .then((data) => {
        data.map((x) => {
          if (x.name === infos.modele) {
            setFicheModeleId(x.id);
          }
        });
      });
  }, [infos]);

  function deleteMat() {
    if (window.confirm('Etes-vous sûr de vouloir supprimer ce matériel ?')) {
      axios(`${API_BASE_URL}/api/materiels/${materielId}`, {
        method: 'DELETE',
      })
        .then((data) => data.data)
        .then((data) => {
          history.push('/materiel');
          console.log(data);
        });
    }
  }

  return (
    <div className="OPM_container">
      <HautDePage />
      <p className="OPM_title">Mon Parc</p>
      <div className="OPM_infos">
        <p>
          Marque : <span>{infos.marque}</span>
        </p>
        <p>
          Modèle : <span>{infos.modele}</span>
        </p>
        <p>
          Mise en service : <span>{infos.MES}</span>
        </p>
        <p>
          Numéro de série : <span>{infos.serialNumber}</span>
        </p>
        <p>
          Dernière vidange moteur : <span>{infos.prev_oil}</span>
        </p>
        <p>
          Prochaine vidange dans : <span>{infos.next_oil}</span>
        </p>
        <p>
          Concess prioritaire pour dépannage : <span>Ets Cloué</span>
        </p>

        <Link to="/update_mat" className="btn__submit__modify">
          <p>Modification du materiel</p>
        </Link>
        {status === 'administrateur' && (
          <button className="sup__modif" onClick={deleteMat}>
            <p>Supression du matériel</p>
          </button>
        )}
      </div>
      {fiche.map((file, i) => (
        <div className="pdf__bymodele" key={i}>
          <i className="fas fa-file-pdf"></i>
          <p>{file.name}</p>
        </div>
      ))}
    </div>
  );
}
export default OneParcMateriel;
