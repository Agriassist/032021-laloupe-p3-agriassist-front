import '../Styles/MenuPrincipalAgri.css';
import HautDePage from './HautDePage';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useStateValue } from '../contexts/Context';

export default function MenuPrincipalAgri() {
  const [{ status }] = useStateValue();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="contanuprincipal">
      <HautDePage />
      <div className="container__quatrebloc">
        <Link to="/materiel" onClick={() => window.scroll(0, 0)} className="bloc">
          <div className="bloc__logo1">
            <i className="fas fa-tractor"></i>
          </div>
          <p>Mon Parc Materiel</p>
        </Link>
        {status === 'agriculteur' && (
          <Link to="/profil" onClick={() => window.scroll(0, 0)} className="bloc">
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
        <Link to="/document" onClick={() => window.scroll(0, 0)} className="bloc">
          <div className="bloc__logo4">
            <i className="fas fa-folder-open"></i>
          </div>
          <p>Mes Documents</p>
        </Link>
        {status === 'agriculteur' && (
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
        )}
        {status === 'administrateur' && (
          <>
            <Link to="/create_account" onClick={() => window.scroll(0, 0)} className="bloc">
              <div className="bloc__logo5">
                <i className="fas fa-id-card"></i>
              </div>
              <p>Création de compte</p>
            </Link>
            <Link to="/update_profil" onClick={() => window.scroll(0, 0)} className="bloc">
              <div className="bloc__logo6">
                <i className="fas fa-id-card"></i>
              </div>
              <p>Modification de compte</p>
            </Link>
            <Link to="/create_materiel" onClick={() => window.scroll(0, 0)} className="bloc">
              <div className="bloc__logo7">
                <i className="fas fa-tractor"></i>
              </div>
              <p>Création de materiel</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
