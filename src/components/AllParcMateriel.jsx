/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/Context';
import '../Styles/parcMateriel.css';

function AllParcMateriel(props) {
  const [infos, setInfos] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [{ token, status, setMaterielId }, dispatch] = useStateValue();

  function selectMateriel(id) {
    dispatch({ type: 'SET_MATERIEL_ID', materielId: id });
  }
  if (status === 'agriculteur' || status === 'concessionnaire') {
    useEffect(() => {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/api/materiels/users/${props.id}`,
        headers: { authorization: 'Bearer ' + token },
      })
        .then((data) => {
          console.log(data.data);
          setInfos(data.data);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }, []);
  } else if (status === 'administrateur') {
    useEffect(() => {
      let tableauMat = [];
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/api/materiels`,
        // headers: { authorization: 'Bearer ' + token },
      })
        .then(async (data) => {
          console.log(data.data);
          const reduc = await Promise.all(
            data.data.map((text) =>
              axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_URL}/api/materiels/${text.id}`,
              }),
            ),
          );
          tableauMat = reduc.map((mat) => mat.data);
          setInfos(tableauMat);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }, []);
  }

  return (
    <div className="container__menu">
      {console.log(infos)}
      <header className="parc-header">
        <div className="blocMonMateriel">
          <div className="blocMonMateriel__logo">
            <i className="fas fa-tractor"></i>
          </div>
          <p>Mon matériel</p>
        </div>
      </header>
      <div className="parc-image">
        {infos.map((text, index) => (
          <Link className="cadre-trackteur" key={index} onClick={() => selectMateriel(text.materiel.id)} to="/OneParcMateriel" role="link">
            <img className="image-trackteur" alt={index} src="./src/images/tracteurimagemateriel.jpg" />
            <section className="materielName">
              <p className="describe-name"> {text.marque.name}&nbsp; </p>
              <p className="describe-number-serial">
                {text.modele.name}&nbsp;
                {text.materiel.serial_number}&nbsp;
              </p>
            </section>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllParcMateriel;
