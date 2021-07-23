import '../Styles/OneParcMateriel.css';
import HautDePage from './HautDePage';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/Context';
import axios from 'axios';

function OneParcMateriel() {
  const [infos, setInfos] = useState({});
  const [{ status, materielId }] = useStateValue();
  const [fiche, setFiche] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/materiels/${materielId}`)
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
    axios(`${process.env.REACT_APP_API_URL}/api/fiche_technique`)
      .then((data) => data.data)
      .then((data) => {
        setFiche(data);
      });
  }, []);

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
