import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Document.css';
import agriculteur from '../images/agriculteur.png';
import Document_BonTravail from './Document_BonTravail';
import Document_Facture from './Document_Facture';
import HautDePage from './HautDePage';

export default function Document() {
  const [onClickChoice, setOnClickChoice] = useState(1);

  const focus = useRef(null);

  function change(params) {
    setOnClickChoice(params);
  }

  useEffect(() => {
    focus.current.focus();
  }, []);

  return (
    <div className="container__menu">
      <HautDePage />
      <header className="document-header">
        <div className="blocMesDocuments">
          <div className="blocMesDocuments__logo">
            <i className="fas fa-folder-open"></i>
          </div>
          <p>Mes documents</p>
        </div>
      </header>
      <div className="container__doc">
        <div className="container__allnothome">
          <div className="btn__doc">
            <button className="boutton__facture" ref={focus} onClick={() => change(1)}>
              Facture
            </button>
            <button className="boutton__bontravail" onClick={() => change(2)}>
              Bon de travail
            </button>
          </div>
          {onClickChoice === 1 ? <Document_Facture /> : ''}
          {onClickChoice === 2 ? <Document_BonTravail /> : ''}
        </div>
      </div>
      <div className="container__icone__document">
        <Link to="/fiche_technique">
          <div className="bloc__image__doc">
            <i class="far fa-file-pdf"></i>
            <p className="legende__icones">Télécharger un PDF</p>
          </div>
        </Link>
        <Link to="/facture">
          <div className="bloc__image__doc">
            <i class="fas fa-file-invoice-dollar"></i>
            <p className="legende__icones">Facture</p>
          </div>
        </Link>
        <Link to="/bon-de-travail">
          <div className="bloc__image__doc">
            <i class="fas fa-print"></i>
            <p className="legende__icones">Bon de Travail</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
