/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/Context';
import '../Styles/parcMateriel.css';
import HautDePage from './HautDePage';

function AllParcMateriel(props) {
  const [infos, setInfos] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [{ setMaterielId }, dispatch] = useStateValue();

  function selectMateriel(id) {
    dispatch({ type: 'SET_MATERIEL_ID', materielId: id });
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8000/api/materiels/users/${props.id}`,
    })
      .then((data) => {
        console.log(data.data);
        setInfos(data.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div className="container__menu">
      <HautDePage />
      <div className="parc-image">
        {infos.map((text, index) => (
          <Link className="cadre-trackteur" key={index} onClick={() => selectMateriel(text.id)} to="/OneParcMateriel" role="link">
            <img className="image-trackteur" alt={index} src="./src/images/tracteurimagemateriel.jpg" />
            <p className="materielName">
              {text.serial_number}&nbsp;
              {text.id}&nbsp;
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllParcMateriel;
