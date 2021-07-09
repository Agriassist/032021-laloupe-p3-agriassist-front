import React from 'react';
import '../Styles/Document.css';
import agriculteur from '../images/agriculteur.png';
import Document_BonTravail from './Document_BonTravail';
import Document_Facture from './Document_Facture';
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
            <button className="boutton__facture" onClick="/document_facture">
              Facture
            </button>
            <button className="boutton__facture" onClick="/document_bontravail">
              Bon de travail
            </button>
          </div>
          <Document_Facture />
          <Document_BonTravail />
        </div>
      </div>
    </div>
  );
}
