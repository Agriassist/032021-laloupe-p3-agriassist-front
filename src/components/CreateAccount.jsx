import React, { useState, useEffect } from 'react';
import '../Styles/CreateAccount.css';
import logoAgri from '../images/logoAgri.png';
import axios from 'axios';
import HautDePage from './HautDePage';
import '../Styles/OneParcMateriel.css';

export default function CreateAccount() {
  const [pseudo, setPseudo] = useState('');
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [status, setstatus] = useState('');

  const handleChange = (event) => {
    setstatus(event.target.value);
  };

  const submitCreation = (e) => {
    e.preventDefault();
    if (status === '') {
      alert('Select a status');
    } else {
      axios({
        method: 'POST',
        url: 'REACT_APP_API_URL/api/users',
        data: { identifiant: pseudo, prenom: prenom, nom: name, email: email, phone: telephone, statue: status, hassPassword: password },
      })
        .then((data) => data.data)
        .then((data) => {
          setPseudo('');
          setName('');
          setPrenom('');
          setEmail('');
          setPassword('');
          setTelephone('');
          setstatus('');
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <div>
      <div className="container__create__account">
        <HautDePage />
        <p className="OPM_title">Création d'un compte</p>
        <input id="input__one__account" type="text" placeholder="Pseudo..." value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
        <input id="input__two__account" type="text" placeholder="Nom..." value={name} onChange={(e) => setName(e.target.value)} />
        <input id="input__three__account" type="text" placeholder="Prenom..." value={prenom} onChange={(e) => setPrenom(e.target.value)} />

        <input id="input__four__account" type="text" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input id="input__five__account" type="text" placeholder="Mot de Passe..." value={password} onChange={(e) => setPassword(e.target.value)} />
        <input id="input__six__account" type="text" placeholder="Téléphone..." value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        <select name="status__choice" id="status__choice" value={status} onChange={handleChange}>
          <option value="administrateur">Administrateur</option>
          <option value="agriculteur">Agriculteur</option>
          <option value="concessionnaire">Concessionnaire</option>
          Select status...
        </select>
        <div className="container__btn">
          <button id="btn__create__account" onClick={submitCreation}>
            Créer le compte
          </button>
        </div>
      </div>
    </div>
  );
}
