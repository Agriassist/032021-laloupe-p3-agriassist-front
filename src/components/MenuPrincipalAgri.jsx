import React from 'react';
import '../Styles/MenuPrincipalAgri.css';
import HautDePage from './HautDePage';

export default function MenuPrincipal() {
  return (
    <div className="container__menu">
      <HautDePage />
      <div className="container__quatrebloc">
        <div className="bloc">
          <div className="bloc__logo1">
            {/* <img className="imagefondparcmateriel" alt="tracesrouestracteurs" src="./src/fondparcmateriel.jpg" width="50%" /> */}
            <i className="fas fa-tractor"></i>
          </div>
          <p>Mon Parc Materiel</p>
        </div>
        <div className="bloc">
          <div className="bloc__logo2">
            <i className="fas fa-id-card"></i>
          </div>
          <p>Mes Profils</p>
        </div>
        <div className="bloc">
          <div className="bloc__logo3">
            <i className="fas fa-map-marked-alt"></i>
          </div>
          <p>Geolocalisation</p>
        </div>
        <div className="bloc">
          <div className="bloc__logo4">
            <i className="fas fa-folder-open"></i>
          </div>
          <p>Mes Documents</p>
        </div>
      </div>

      <div className="container__depannage">
        <i className="fas fa-phone-volume"></i>
        <h2>DEPANNAGE</h2>
        <a rel="nofollow" href="https://www.qr-code-generator.com">
          <img
            id="Qr__Code_Menu"
            src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fwww.example.com&chs=180x180&choe=UTF-8&chld=L|2"
            alt=""></img>
        </a>
      </div>
    </div>
  );
}
