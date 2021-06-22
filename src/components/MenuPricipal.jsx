import React from 'react';
import '../Styles/MenuPrincipal.css';
import agriculteur from '../agriculteur.png';

export default function MenuPricipal() {
  return (
    <div className="container__menu">
      <div className="trait__bleu"></div>
      <img className="img__profil" src={agriculteur} alt="agriculteur" />
      <i class="fas fa-sign-out-alt"></i>
      <p id="name__user">Thomas</p>
      <div className="container__quatrebloc">
        <div className="bloc">
          <div className="bloc__logo">
            <i className="fas fa-tractor"></i>
          </div>
          <p>Mon Parc Materiel</p>
        </div>
        <div className="bloc">
          <div className="bloc__logo">
            <i className="fas fa-users"></i>
          </div>
          <p>Mes Profils</p>
        </div>
        <div className="bloc">
          <div className="bloc__logo">
            <i className="fas fa-map-marked-alt"></i>
          </div>
          <p>Geolocalisation</p>
        </div>
        <div className="bloc">
          <div className="bloc__logo">
            <i className="fas fa-euro-sign"></i>
          </div>
          <p>Mes Documents</p>
        </div>
      </div>
      <div className="container__depannage">
        <i class="fas fa-phone-volume"></i>
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
