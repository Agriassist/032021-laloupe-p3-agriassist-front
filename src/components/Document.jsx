import React from 'react';
import '../Styles/Document.css';
import agriculteur from '../agriculteur.png';
import Document_BonTravail from './Document_BonTravail';
import HautDePage from './HautDePage';

export default function Document() {
  return (
    <div className="container__menu">
      <HautDePage />
      <header className="document-header">
        <div className="blocMesDocuments">
          <div className="blocMesDocuments__logo">
            {/* <img className="imagefondparcmateriel" alt="tracesrouestracteurs" src="./src/fondparcmateriel.jpg" width="50%" /> */}
            <i className="fas fa-folder-open"></i>
          </div>
          <p>Mes documents</p>
        </div>
      </header>
      <div className="container__doc">
        <div className="container__allnothome">
          <div className="btn__doc">
            <button>Facture</button>
            <button>Bon de travail</button>
          </div>
          <Document_BonTravail />
          <div className="container__backhome">
            <i className="fas fa-home"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
