import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/UpdateProfil.css';
import camera from '../camera.png';
import { useStateValue } from '../contexts/Context';
import HautDePage from './HautDePage';

export default function UpdateProfil() {
  const [fileSelected, setFileSelected] = useState(null);
  const [file, setFile] = useState('twitter.jpg');
  const [pseudo, setPseudo] = useState('');
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [imgphoto, setImgphoto] = useState('');
  console.log(file);

  const [{ token, id }, dispatch] = useStateValue();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/api/users/${id}`,
      headers: { authorization: 'Bearer ' + token },
    })
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
        setPseudo(data.identifiant);
        setName(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
        setTelephone(data.phone);
        setFile(data.photo_profil);
        console.log(data.photo_profil);
      })
      .catch((err) => {
        console.log(err);
      });
    if (file === 'twitter.jpg') {
      console.log('1');
      setImgphoto('http://localhost:8000/api/images_profil/twitter.jpg');
    } else {
      console.log('2');
      setImgphoto(`http://localhost:8000/api/images_profil/${file}`);
    }
  }, [file]);

  const onChangeFile = (event) => {
    const { type } = event.target.files[0];
    if (type !== 'image/png' || type !== 'image/jpeg') {
      console.log(event.target.files[0]);
      setFileSelected(event.target.files[0]);
    } else {
      alert("Veuillez selectionner un format d'image valide");
    }
  };

  const SubmitUpdateProfil = (e) => {
    e.preventDefault();
    let data;
    if (fileSelected) {
      data = new FormData();
      data.append('file', fileSelected);
      console.log(pseudo, prenom, telephone);
      data.append(
        'user',
        JSON.stringify({
          identifiant: pseudo,
          prenom: prenom,
          nom: name,
          email: email,
          phone: telephone,
        }),
      );
    } else {
      data = {
        identifiant: pseudo,
        prenom: prenom,
        nom: name,
        email: email,
        phone: telephone,
        photo_profil: file,
      };
    }
    axios({
      method: 'PUT',
      url: `http://localhost:8000/api/users/${id}`,
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
      })
      .catch((err) => {
        alert('Lien creation fail');
      });
  };

  return (
    <div className="container__menu">
      <div className="container__updateprofil">
        <HautDePage />
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
            <input type="email" name="" id="" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="phone__update">
            <h3>Téléphone:</h3>
            <input type="text" name="" id="" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </div>
          <div className="btn__submit__update" onClick={SubmitUpdateProfil}>
            <h3>Update Profil</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
