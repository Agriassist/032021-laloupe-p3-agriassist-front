import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/UpdateProfil.css';
import camera from '../camera.png';
import defaultpicture from '../images/twitter.jpg';
import { data } from 'autoprefixer';

export default function UpdateProfil() {
  const [fileSelected, setFileSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [pseudo, setPseudo] = useState('');
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [imgphoto, setImgphoto] = useState('');
  console.log(file);

  const { id } = useParams();
  // const [fileSelected, setFileSelected] = useState(null);
  // const [file, setFile] = useState(null);

  // const onChangeFile = (event) => {
  //   const { type } = event.target.files[0];
  //   if (type !== 'image/png' || type == 'image/jpeg') {
  //     console.log(event.target.files[0]);
  //     setFileSelected(event.target.files[0]);
  //   } else {
  //     alert("Veuillez selectionner un format d'image valide");
  //   }
  // };
  // const submitFiles = (e) => {
  //   e.preventDefault();
  //   if (fileSelected) {
  //     const data = new FormData();
  //     data.append('file', fileSelected);
  //     data.append('configuration', JSON.stringify({ alt: '' }));
  //     axios({
  //       method: 'POST',
  //       url: 'http://localhost:8000/images_profil',
  //       data,
  //     })
  //       .then((data) => data.data)
  //       .then((data) => {
  //         console.log(data);
  //         setFile({
  //           filename: data.picture_profil,
  //         });
  //       })
  //       .catch((err) => {
  //         alert(err.response.status);
  //       });
  //   }
  // };

  useEffect(() => {
    axios(`http://localhost:8000/api/users/${id}`)
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
        setPseudo(data.identifiant);
        setName(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
        setTelephone(data.phone);
        if (data.photo_profil === 'twitter.jpg') {
        } else {
          setFile(data.photo_profil);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    if (fileSelected) {
      const data = new FormData();
      data.append('file', fileSelected);
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
    }
  };

  const changeImg = () => {
    if (data.photo_profil === 'twitter.jpg') {
      setImgphoto('http://localhost:8000/api/images_profil/twitter.jpg');
    } else {
      setImgphoto(`http://localhost:8000/api/images_profil/${file.filename}`);
    }
  };

  return (
    <>
      {pseudo && (
        <div className="container__updateprofil">
          <input type="file" accept="image/*" id="multer" onChange={onChangeFile} />
          <div className="container__imgprofil">
            <img src={imgphoto} onChange={changeImg} alt="test" id="img__multer" />

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
            <div className="email__update" />
            <h3>Email:</h3>
            <input type="email" name="" id="" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="phone__update">
            <h3>Téléphone:</h3>
            <input type="text" name="" id="" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </div>
          <button id="btn__submit__update" onClick={SubmitUpdateProfil}>
            Update Profil
          </button>
        </div>
      )}
    </>
  );
}
