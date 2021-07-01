import React from 'react';
import '../Styles/CreateAccount.css';
import logoAgri from '../logoAgri.png';

export default function CreareAccount() {
  return (
    <div>
      <div className="container__create__account">
        <img id="img__logo" src={logoAgri} alt="logo" />
        <input id="input__one__account" type="text" placeholder="Identifiant" />
        <input id="input__two__account" type="text" placeholder="Email" />
        <input id="input__three__account" type="password" placeholder="Mot de Passe" />
        <input id="input__four__account" type="text" placeholder="Téléphone" />
        <select name="status__choice" id="status__choice">
          <option value="choice status">Select status</option>
          <option value="administrateur">Administrateur</option>
          <option value="agriculteur">Agriculteur</option>
          <option value="concessionnaire">Concessionnaire</option>
        </select>
        <div className="container__btn">
          <button id="btn__create__account">Create Account</button>
        </div>
      </div>
    </div>
  );
}
