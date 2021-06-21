import React from 'react';
import '../Styles/PageConnection.css';

export default function PageConnection() {
  return (
    <div className="container__pageconnection">
      <img id="img__logo" src="../logoAgri.png" alt="logo" />
      <input id="input__one" type="text" placeholder="Identifiant" />
      <input id="input__two" type="password" placeholder="Mot de Passe" />
      <div className="container__authentification">
        <i class="fas fa-fingerprint"></i>

        <a rel="nofollow" href="https://www.qr-code-generator.com">
          <img
            id="Qr__Code"
            src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fwww.example.com&chs=180x180&choe=UTF-8&chld=L|2"
            alt=""></img>
        </a>
      </div>
    </div>
  );
}
