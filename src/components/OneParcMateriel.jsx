import '../Styles/OneParcMateriel.css';
import HautDePage from './HautDePage';
import agriculteur from '../images/agriculteur.png';
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../contexts/Context';
import axios from 'axios';

function OneParcMateriel() {
  const [infos, setInfos] = useState({});
  const [{ materielId }] = useStateValue();
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
        <p>Marque: {infos.marque}</p>
        <p> Modèle : {infos.modele}</p>
        <p>Mise en service: {infos.MES}</p>
        <p> Numéro de série: {infos.serialNumber}</p>
        <p> Dernière vidange moteur: {infos.prev_oil}</p>
        <p> Prochaine vidange dans: {infos.next_oil}</p>
        <p> Concess prioritaire pour dépannage: Ets Cloué</p>
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
