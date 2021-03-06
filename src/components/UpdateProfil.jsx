/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/UpdateProfil.css';
import camera from '../camera.png';
import { useStateValue } from '../contexts/Context';
import HautDePage from './HautDePage';
import '../Styles/OneParcMateriel.css';

export default function UpdateProfil() {
  const [fileSelected, setFileSelected] = useState(null);
  const [file, setFile] = useState('twitter.jpg');
  const [pseudo, setPseudo] = useState('');
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [imgphoto, setImgphoto] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [{ token, id, profil_picture }, dispatch] = useStateValue();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/api/users/${id}`,
      headers: { authorization: 'Bearer ' + token },
    })
      .then((data) => data.data)
      .then((data) => {
        setPseudo(data.identifiant);
        setName(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
        setTelephone(data.phone);
        setFile(data.photo_profil);
      });
    if (file === 'twitter.jpg') {
      setImgphoto(`${API_BASE_URL}/images_profil/twitter.jpg`);
    } else {
      setImgphoto(`${API_BASE_URL}/images_profil/${file}`);
    }
  }, [file]);

  const onChangeFile = (event) => {
    const { type } = event.target.files[0];
    if (type !== 'image/png' || type !== 'image/jpeg') {
      setFileSelected(event.target.files[0]);
      SubmitUpdateProfil(null, event.target.files[0]);
    } else {
      alert("Veuillez selectionner un format d'image valide");
    }
  };

  const SubmitUpdateProfil = (_, fichier) => {
    if (password === password2) {
      let data;
      if (fichier) {
        data = new FormData();
        data.append('file', fichier);
        data.append(
          'user',
          JSON.stringify({
            identifiant: pseudo,
            prenom: prenom,
            nom: name,
            email: email,
            phone: telephone,
            hassPassword: password,
            profil_picture,
          }),
        );
      } else {
        data = {
          identifiant: pseudo,
          prenom: prenom,
          nom: name,
          email: email,
          phone: telephone,
          hassPassword: password,
          photo_profil: file,
        };
      }
      axios({
        method: 'PUT',
        url: `${API_BASE_URL}/api/users/${id}`,
        data: data,
      })
        .then((data) => data.data)
        .then((data) => {
          setFile(data.photo_profil);
          setPseudo(data.identifiant);
          setName(data.nom);
          setPrenom(data.prenom);
          setEmail(data.email);
          setTelephone(data.phone);
          dispatch({ type: 'SET_PROFIL_PICTURE', profil_picture: data.photo_profil });
          alert('Votre profil a ??t?? mis ?? jour');
          window.location.reload();
        })
        .catch(() => {
          alert('Une erreur est survenue');
        });
    } else {
      alert('Les mots de passe ne sont pas identiques');
      setPassword('');
      setPassword2('');
    }
  };

  return (
    <div className="container__menu">
      <div className="container__updateprofil">
        <HautDePage />
        <p className="OPM_title">Modification d'un compte</p>
        <input type="file" accept="image/*" id="multer" onChange={onChangeFile} />
        <div className="container__imgprofil">
          <img src={imgphoto} alt="test" id="img__multer" />

          <label htmlFor="multer">
            <img src={camera} alt="selection_image" id="imgPhoto" />
          </label>
        </div>
        <div className="container__update__profil">
          <div className="pseudo__update">
            <h3>Pseudo:</h3>
            <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          </div>
          <div className="prenom__update">
            <h3>Prenom</h3>
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          </div>
          <div className="name__update">
            <h3>Nom:</h3>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="email__update">
            <h3>Email:</h3>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="email__update">
            <h3>Nouveau mot de passe:</h3>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="email__update">
            <h3>Confirmer le nouveau mot de passe:</h3>
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
          </div>
          <div className="phone__update">
            <h3>T??l??phone:</h3>
            <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </div>
          <div className="btn__submit__update" onClick={SubmitUpdateProfil}>
            <h3>Charger les modifications</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
