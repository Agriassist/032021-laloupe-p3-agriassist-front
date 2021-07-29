/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import '../Styles/PostFiche.css';
import camera from '../camera.png';
import HautDePage from '../components/HautDePage';
import axios from 'axios';
import '../Styles/OneParcMateriel.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '4rem',
    fontFamily: 'Montserrat',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
      fontFamily: 'Montserrat',
    },
    '& .MuiFormLabel-root': {
      color: '#fff',
      fontFamily: 'Montserrat',
    },
    '& .MuiMenuItem-root': {
      fontFamily: 'Montserrat',
    },
  },

  formControl: {
    margin: theme.spacing(),
    minWidth: 150,
    color: '#fff',
    marginTop: '2rem',
    fontFamily: 'Montserrat',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    fontFamily: 'Montserrat',
    '&::before': {
      borderBottom: '1px solid #fff',
      fontFamily: 'Montserrat',
      color: '#fff',
    },
  },
  menuItem: {
    fontFamily: 'Montserrat',
  },
  icon: {
    color: '#fff',
  },
  input: {
    color: '#fff',
    fontFamily: 'Montserrat',
  },
}));

export default function PostFiche() {
  const [fileSelected, setFileSelected] = useState(null);
  const [name, setName] = useState('');
  const [modele, setModele] = useState([]);
  const [typeModele, setTypeModele] = useState('');
  const [idModele, setIdModele] = useState(null);
  const [ficheTech, setFicheTech] = useState([]);

  const classNamees = useStyles();

  const onChangeFile = (event) => {
    const { type } = event.target.files[0];
    if (type !== '/pdf') {
      setFileSelected(event.target.files[0]);
    } else {
      alert("Veuillez selectionner un format d'image valide");
    }
  };
  const submitFiles = (e) => {
    e.preventDefault();
    if (fileSelected) {
      const data = new FormData();
      data.append('file', fileSelected);

      data.append(
        'info',
        JSON.stringify({
          name: name,
          modele_id: idModele,
        }),
      );
      axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/fiche_technique`,
        data,
      }).then((data) => data.data);
    }
  };

  useEffect(() => {
    axios(`${API_BASE_URL}/api/modele`)
      .then((data) => data.data)
      .then((data) => {
        setModele(data);
      });
  }, []);

  useEffect(() => {
    axios(`${API_BASE_URL}/api/fiche_technique`)
      .then((data) => data.data)
      .then((data) => {
        setFicheTech(data);
      });
  }, []);

  return (
    <div className="container__postfiche">
      <HautDePage />
      <p className="OPM_title">Télécharger une fiche technique</p>
      <div className="modeles__info">
        <div className="container__listpdf">
          {ficheTech.map((fiche, index) => (
            <div key={index} className="one__pdf">
              <i className="fas fa-file-pdf"></i>
              <p key={index}>{fiche.name}</p>
            </div>
          ))}
        </div>

        <input type="file" accept="/*" id="upload__fiche__tech" onChange={onChangeFile} />

        <select
          name=""
          id="select__modele"
          defaultValue={typeModele}
          onChange={(event) => {
            setTypeModele(event.target.value);
            setIdModele(event.target.selectedOptions[0].id);
          }}>
          {modele.map((modeles, index) => (
            <option className={classNamees.menuItem} id={modeles.id} key={index} value={modeles.name}>
              {modeles.name}
            </option>
          ))}
          Modèle
        </select>

        <div className={classNamees.root}>
          <TextField id="outlined-helperText" label="Nom du fichier..." value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
        </div>
        <div className="container__pdf">
          <label htmlFor="upload__fiche__tech">
            <img src={camera} alt="selection_image" id="upload__fiche__tech" />
          </label>
        </div>

        <button id="btn__fiche" onClick={submitFiles}>
          Charger la fiche
        </button>
      </div>
    </div>
  );
}
