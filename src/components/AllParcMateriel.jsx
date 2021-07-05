/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      {infos.map((text, index) => (
        <span key={index}>
          {text.serial_number}&nbsp;
          {text.id}&nbsp;
        </span>
      ))}
    </div>
  );
}

export default AllParcMateriel;
