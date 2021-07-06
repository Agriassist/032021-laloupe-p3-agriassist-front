import React, { useState, useEffect } from 'react';
import '../Styles/CreateAccount.css';
import logoAgri from '../images/logoAgri.png';

export default function CreareAccount() {
  const [pseudo, setPseudo] = useState('');
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [statue, setStatue] = useState('');

  const handleChange = (event) => {
    setStatue(event.target.value);
  };

  const submitCreation = (e) => {
    e.preventDefault();
    if (statue === '') {
      alert('Select a statue');
    } else {
      axios({
        method: 'POST',
        url: 'http://localhost:8000/api/users',
        data: { identifiant: pseudo, prenom: prenom, nom: name, email: email, phone: telephone, statue: statue },
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
          setStatue('');
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
        <input id="input__one__account" type="text" placeholder="Identifiant" value={pseudo} />
        <input id="input__two__account" type="text" placeholder="Email" value={email} />
        <input id="input__three__account" type="password" placeholder="Mot de Passe" value={password} />
        <input id="input__four__account" type="text" placeholder="Téléphone" value={telephone} />
        <select name="status__choice" id="status__choice" value={statue} onChange={handleChange}>
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
