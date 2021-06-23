import React from 'react';
import Document_Facture from './Document_Facture';
import '../Styles/Document.css';
import agriculteur from '../agriculteur.png';
import Document_BonTravail from './Document_BonTravail';

export default function Document() {
  return (
    <div className="container__doc">
      <div className="container__allnothome">
        <div className="trait__bleu"></div>
        <img className="img__profil" src={agriculteur} alt="agriculteur" />
        <p id="name__user">Thomas</p>
        <div className="btn__doc">
          <button>Facture</button>
          <button>Bon de travail</button>
        </div>
        <Document_BonTravail />
        <div className="container__backhome">
          <i class="fas fa-home"></i>
        </div>
      </div>
    </div>
  );
}
