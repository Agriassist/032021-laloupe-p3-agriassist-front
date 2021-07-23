import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Document.css';
import axios from 'axios';
import { useStateValue } from '../contexts/Context';
import Document_BonTravail from './Document_BonTravail';
import Document_Facture from './Document_Facture';
import HautDePage from './HautDePage';

export default function Document() {
  const [onClickChoice, setOnClickChoice] = useState(1);
  const [fileFacture, setFileFacture] = useState('');
  const [fileBonTravail, setFileBonTravail] = useState('');
  const [facture, setFacture] = useState([]);
  const [bonTravail, setBonTravail] = useState([]);

  const [{ id }] = useStateValue();

  const focus = useRef(null);

  function change(params) {
    setOnClickChoice(params);
  }

  const onChangeFileFacture = (event) => {
    const { type } = event.target.files[0];
    if (type !== 'image/png' || type !== 'image/jpeg') {
      console.log(event.target.files[0], 'here');
      setFileFacture(event.target.files);
    } else {
      alert("Veuillez selectionner un format d'image valide");
    }
  };

  const onChangeFileBonTravail = (event) => {
    const { type } = event.target.files[0];
    if (type === 'image/png' || type === 'image/jpeg') {
      console.log(event.target.files[0], 'here');
      setFileBonTravail(event.target.files[0]);
    } else {
      alert("Veuillez selectionner un format d'image valide");
    }
  };

  useEffect(() => {
    focus.current.focus();
  }, []);

  function submitFacture(_, facture) {
    let data;
    if (facture) {
      data = new FormData();
      data.append('file', facture);
      axios({
        method: 'POST',
        url: `http://localhost:8000/api/facture/`,
        data,
      })
        .then(() => {
          setFileFacture('');
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert('no file are selected');
    }
  }

  function submitBonTravil(_, bonTravail) {
    let data;
    if (bonTravail) {
      data = new FormData();
      data.append('file', bonTravail);
      axios({
        method: 'POST',
        url: `http://localhost:8000/api/bon_travail/`,
        data,
      })
        .then(() => {
          setFileFacture('');
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert('no file are selected');
    }
  }

  // useEffect(function () {
  //   axios(`http://localhost:8000/facture/${id}`)
  //     .then((data) => data.data)
  //     .then((data) => {
  //       setFacture(data);
  //     });
  // });
  // useEffect(function () {
  //   axios(`http://localhost:8000/bon_travail/${id}`)
  //     .then((data) => data.data)
  //     .then((data) => {
  //       setBonTravail(data);
  //     });
  // });

  return (
    <div className="container__menu">
      <HautDePage />
      <header className="document-header">
        <div className="blocMesDocuments">
          <div className="blocMesDocuments__logo">
            <i className="fas fa-folder-open"></i>
          </div>
          <p>Mes documents</p>
        </div>
      </header>
      <div className="container__doc">
        <div className="container__allnothome">
          <div className="btn__doc">
            <button className="boutton__facture" ref={focus} onClick={() => change(1)}>
              Facture
            </button>
            <button className="boutton__bontravail" onClick={() => change(2)}>
              Bon de travail
            </button>
          </div>
          {onClickChoice === 1 ? <Document_Facture /> : ''}
          {onClickChoice === 2 ? <Document_BonTravail /> : ''}
        </div>
      </div>
      <div className="container__icone__document">
        <Link to="/fiche_technique">
          <div className="bloc__image__doc">
            <i class="far fa-file-pdf"></i>
            <p className="legende__icones">Télécharger un PDF</p>
          </div>
        </Link>

        <div className="bloc__image__doc">
          <input type="file" accept="image/*" id="upload__facture" onChange={onChangeFileFacture} />
          <label htmlFor="upload__facture">
            <i class="fas fa-file-invoice-dollar"></i>
          </label>
          <p className="legende__icones">Facture</p>
          <button className={fileFacture ? 'btn__facture' : 'btn__facture__nodispo'} onClick={submitFacture}>
            Sauvegarder
          </button>
        </div>

        <div className="bloc__image__doc">
          <input type="file" accept="image/*" id="upload__bontravail" onChange={onChangeFileBonTravail} />
          <label htmlFor="upload__bontravail">
            <i class="fas fa-print"></i>
          </label>
          <p className="legende__icones">Bon de Travail</p>
          <button className={fileBonTravail ? 'btn__facture' : 'btn__facture__nodispo'} onclick={submitBonTravil}>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
