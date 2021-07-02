import React from 'react';
import '../Styles/OneParcMateriel.css';
import agriculteur from '../agriculteur.png';

function OneParcMateriel() {
  return (
    <div className="OPM_container">
      <div className="OPM_blue_trait"></div>
      <img className="OPM_image_profil" src={agriculteur} alt="profil_pictures"></img>
      <p className="OPM_title">Mon Parc</p>
      <div className="OPM_infos">
        <p>Marque: Berthoud </p>
        <p> Modèle Raptor 4200 Ektar36</p>
        <p>Mise en service: 02/2018</p>
        <p> Numéro de série: XXXXX</p>
        <p> Dernière vidange moteur: XXXh</p>
        <p> Prochaine vidange dans XXXh</p>
        <p> Concess prioritaire pour dépannage: Ets Cloué</p>
      </div>
    </div>
  );
}

export default OneParcMateriel;
