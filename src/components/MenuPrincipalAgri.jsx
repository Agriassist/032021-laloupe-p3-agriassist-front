import '../Styles/MenuPrincipalAgri.css';
import HautDePage from './HautDePage';
import { Link } from 'react-router-dom';
import React from 'react';
import { useStateValue } from '../contexts/Context';

export default function MenuPrincipalAgri() {
  const [{ status }] = useStateValue();

  return (
    <div className="container__menu">
      <HautDePage />
      <div className="container__quatrebloc">
        <Link to="/materiel" className="bloc">
          <div className="bloc__logo1">
            <i className="fas fa-tractor"></i>
          </div>
          <p>Mon Parc Materiel</p>
        </Link>
        {status === 'agriculteur' && (
          <Link to="/profil" className="bloc">
            <div className="bloc__logo2">
              <i className="fas fa-id-card"></i>
            </div>
            <p>Mes Profils</p>
          </Link>
        )}
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
        <h2 className="titleDepannage">DEPANNAGE</h2>
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
