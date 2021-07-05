/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/Context';

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
      {infos.map((text, index) => (
        <Link key={index} onClick={() => selectMateriel} to="/OneParcMateriel" role="link">
          {text.serial_number}&nbsp;
          {text.id}&nbsp;
        </Link>
      ))}
    </div>
  );
}

export default AllParcMateriel;
