import '../Styles/OneParcMateriel.css';
import agriculteur from '../images/agriculteur.png';
import React, { useState, useEffect } from 'react';

function OneParcMateriel(props) {
  const [infos, setInfos] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/materiels/${props.materielId}`)
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
  console.log(infos);
  return (
    <div className="OPM_container">
      <div className="OPM_blue_trait"></div>
      <img className="OPM_image_profil" src={agriculteur} alt="profil_pictures"></img>
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
    </div>
  );
}
export default OneParcMateriel;
