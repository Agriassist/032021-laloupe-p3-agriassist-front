import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../Styles/PostFiche.css';
import camera from '../camera.png';
import HautDePage from '../components/HautDePage';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '4rem',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    '& .MuiFormLabel-root': {
      color: '#fff',
    },
  },

  formControl: {
    margin: theme.spacing(),
    minWidth: 150,
    color: '#fff',
    marginTop: '2rem',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    '&::before': {
      borderBottom: '1px solid #fff',
    },
  },
  icon: {
    color: '#fff',
  },
  input: {
    color: '#fff',
  },
}));

export default function PostFiche() {
  const [fileSelected, setFileSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [modele, setModele] = useState([]);
  const [type, setType] = useState('');
  const [typeModele, setTypeModele] = useState('');
  const [idModele, setIdModele] = useState(null);
  const [ficheTech, setFicheTech] = useState([]);

  const classes = useStyles();

  const onChangeFile = (event) => {
    const { type } = event.target.files[0];
    if (type !== '/pdf') {
      console.log(event.target.files[0]);
      setFileSelected(event.target.files[0]);
    } else {
      alert("Veuillez selectionner un format d'image valide");
    }
  };
  const submitFiles = (e) => {
    e.preventDefault();
    if (fileSelected) {
      console.log(fileSelected);
      const data = new FormData();
      data.append('file', fileSelected);

      data.append(
        'info',
        JSON.stringify({
          name: name,
          modele_id: idModele,
        }),
      );
      console.log(typeModele.id);
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/api/fiche_technique`,
        data,
      })
        .then((data) => data.data)
        .then((data) => {
          console.log(data);
          setFile({
            filename: data.file,
          });
        })
        .catch((err) => {
          alert(err.response.status);
        });
    }
  };

  function choiceModele(event) {
    setTypeModele(event.target.value);
    setIdModele(event.target.selectedOptions[0].id);
    console.log(event.target.selectedOptions[0].id);
  }

  useEffect(() => {
    axios('http://localhost:8000/api/modele')
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
        setModele(data);
      });
  }, []);

  useEffect(() => {
    axios('http://localhost:8000/api/fiche_technique')
      .then((data) => data.data)
      .then((data) => {
        console.log(data);
        setFicheTech(data);
      });
  }, []);

  return (
    <div className="container__postfiche">
      <HautDePage />

      <div className="container__listpdf">
        {ficheTech.map((fiche, index) => (
          <div key={index} className="one__pdf">
            <i className="fas fa-file-pdf"></i>
            <p key={index}>{fiche.name}</p>
          </div>
        ))}
      </div>

      <input type="file" accept="image/*" id="upload__fiche__tech" onChange={onChangeFile} />

      <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label" style={{ color: '#fff', fontSize: 20 }}>
          Modele
        </InputLabel>
        <Select
          defaultValue={typeModele}
          onChange={choiceModele}
          className={classes.selectEmpty}
          inputProps={{
            classes: {
              icon: classes.icon,
            },
          }}>
          {modele.map((modeles, index) => (
            <MenuItem id={modeles.id} key={index} value={modeles.name}>
              {modeles.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText style={{ color: '#fff', fontSize: 15 }}>Required</FormHelperText>
      </FormControl>

      <div className={classes.root}>
        <TextField id="outlined-helperText" label="Name File..." value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
      </div>
      <div className="container__pdf">
        <label htmlFor="upload__fiche__tech">
          <img src={camera} alt="selection_image" id="upload__fiche__tech" />
        </label>
      </div>

      <button id="btn__fiche" onClick={submitFiles}>
        Post Fiche
      </button>
    </div>
  );
}
