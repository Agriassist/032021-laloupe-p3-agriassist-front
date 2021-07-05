/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/parcMateriel.css';
import HautDePage from './HautDePage';

function AllParcMateriel(props) {
  const [infos, setInfos] = useState([]);

  function selectMateriel(id) {
    props.setMaterielId(id);
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8000/api/materiels/users/1`,
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
      <header className="parc-header">
        <div className="blocMonMateriel">
          <div className="blocMonMateriel__logo">
            {/* <img className="imagefondparcmateriel" alt="tracesrouestracteurs" src="./src/fondparcmateriel.jpg" width="50%" /> */}
            <i className="fas fa-tractor"></i>
          </div>
          <p>Mon matériel</p>
        </div>
      </header>
      <div className="parc-image">
        {infos.map((text, index) => (
          <span className="cadre-trackteur" key={index}>
            <img className="image-trackteur" alt={index} src="./src/images/tracteurimagemateriel.jpg" />
            <p className="materielName">
              {text.serial_number}&nbsp;
              {text.id}&nbsp;
            </p>
          </span>
        ))}
      </div>
    </div>
  );
}

export default AllParcMateriel;
