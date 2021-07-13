import React, { useState, useEffect } from 'react';
import '../Styles/CreateAccount.css';
import logoAgri from '../images/logoAgri.png';
import axios from 'axios';

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
        url: 'http://localhost:8000/api/users',
        data: { identifiant: pseudo, prenom: prenom, nom: name, email: email, phone: telephone, status: status },
      })
        .then((data) => data.data)
        .then((data) => {
          console.log(data);
          setPseudo('');
          setName('');
          setPrenom('');
          setEmail('');
          setPassword('');
          setTelephone('');
          setstatus('');
        })
        .catch((err) => {
          alert('Lien creation fail');
        });
    }
  };
  return (
    <div>
      <div className="container__create__account">
        <img id="img__logo" src={logoAgri} alt="logo" />
        <input id="input__one__account" type="text" placeholder="Identifiant" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
        <input id="input__two__account" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input id="input__three__account" type="password" placeholder="Mot de Passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input id="input__four__account" type="text" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        <select name="status__choice" id="status__choice" value={status} onChange={handleChange}>
          <option value="administrateur">Administrateur</option>
          <option value="agriculteur">Agriculteur</option>
          <option value="concessionnaire">Concessionnaire</option>
          Select status
        </select>
        <div className="container__btn">
          <button id="btn__create__account" onClick={submitCreation}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
