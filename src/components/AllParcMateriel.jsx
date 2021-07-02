/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

function AllParcMateriel(props) {
  const [infos, setInfos] = useState({});

  function selectMateriel(id) {
    props.setMaterielId(id);
  }

  const chooseOneMateriel = (e) => {

    axios({
      method: 'POST',
      url: 'http://localhost:8000/api/park',
      data: { id: 1 },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });

    e.preventDefault();
    if (props.id) {
      axios({
        method: 'POST',
        url: 'http://localhost:8000/api/materiel',
        data: { id: props.id },
      })
        .then((data) => {
          const [marque, modele] = [data.marque.name, data.modele.name];
          const infos = { marque, modele };
          setInfos(infos);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className="container__menu">

      <button onClick={chooseOneMateriel}>zrzfrfzrfz</button>
      {/* <div>
        <header className="parc-header">
          <div className="blocMonMateriel">
            <div className="blocMonMateriel__logo">
              <i className="fas fa-tractor"></i>
            </div>
            <p>Mon Parc Materiel</p>
          </div>
        </header>
        <section className="parc-image">
          <figure className="cadre-trackteur" onClick={() => selectMateriel(1)}>
            <img src="./src/images/agriculteur.png" alt="trackteur" className="image-trackteur" />
            <figcaption className="materielName">Moissonneuse New Holland</figcaption>
          </figure>
          <figure className="cadre-trackteur" onClick={() => selectMateriel(2)}>
            <img src="./src/images/agriculteur.png" alt="trackteur" className="image-trackteur" />
            <figcaption className="materielName">Tracteur John Deere</figcaption>
          </figure>
          <figure className="cadre-trackteur" onClick={() => selectMateriel(3)}>
            <img src="./src/images/agriculteur.png" alt="trackteur" className="image-trackteur" />
            <figcaption className="materielName">Tracteur Massey Ferguson</figcaption>
          </figure>
          <figure className="cadre-trackteur" onClick={() => selectMateriel(4)}>
            <img src="./src/images/agriculteur.png" alt="trackteur" className="image-trackteur" />
            <figcaption className="materielName">Ensileuse Claas</figcaption>
          </figure>
        </section>
      </div> */}
    </div>
  );
}

export default AllParcMateriel;
