import React from 'react';
import '../Styles/MenuConcess.css';
import HautDePage from './HautDePage';

export default function MenuConcess() {
  return (
    <div className="container__menu">
      <HautDePage />
      <div className="container__mesAgri">
        <div className="bloc__Agri">
          <div className="bloc__Agri1">
            <i className="photo_de_profil_Agri1"></i>
            <h3>Nom</h3>
            <h3>Prénom</h3>
            <p>numéro de téléphone</p>
            <p className="card-over">
              <span className="buttonBlock">Consulter son matériel</span>
            </p>
          </div>
        </div>
        <div className="bloc__Agri">
          <div className="bloc__Agri2">
            <i className="photo_de_profil_Agri2"></i>
            <h3>Nom</h3>
            <h3>Prénom</h3>
            <p>numéro de téléphone</p>
            <p className="card-over">
              <span className="buttonBlock">Consulter son matériel</span>
            </p>
          </div>
        </div>
        <div className="bloc__Agri">
          <div className="bloc__Agri3">
            <i className="photo_de_profil_Agri3"></i>
            <h3>Nom</h3>
            <h3>Prénom</h3>
            <p>numéro de téléphone</p>
            <p className="card-over">
              <span className="buttonBlock">Consulter son matériel</span>
            </p>
          </div>
        </div>
        <div className="bloc__Agri">
          <div className="bloc__Agri4">
            <i className="photo_de_profil_Agri4"></i>
            <h3>Nom</h3>
            <h3>Prénom</h3>
            <p>numéro de téléphone</p>
            <p className="card-over">
              <span className="buttonBlock">Consulter son matériel</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
