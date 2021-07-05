import React from 'react';
import '../Styles/MenuPrincipalConce.css';
import HautDePage from './HautDePage';

export default function MenuPrincipalConce() {
  return (
    <div className="container__menu__concessionnaire">
      <HautDePage />
      <div className="container__quatrebloc__concessionnaire">
        <div className="bloc__concessionnaire">
          <div className="bloc__logo1__concessionnaire">
            {/* <img className="imagefondparcmateriel" alt="tracesrouestracteurs" src="./src/fondparcmateriel.jpg" width="50%" /> */}
            <i className="fas fa-tractor"></i>
          </div>
          <p>Mes Materiels Suivis</p>
        </div>
        <div className="bloc__concessionnaire">
          <div className="bloc__logo2__concessionnaire">
            <i className="fas fa-id-card"></i>
          </div>
          <p>Mes Agriculteurs</p>
        </div>
        <div className="bloc__concessionnaire">
          <div className="bloc__logo4__concessionnaire">
            <i className="fas fa-folder-open"></i>
          </div>
          <p>Mes Documents</p>
        </div>
      </div>
    </div>
  );
}
