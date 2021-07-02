/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

function AllParcMateriel(props) {
  function selectMateriel(id) {
    props.setMaterielId(id);
  }

  return (
    <div className="container__menu">
      <div>
        <header className="parc-header">
          <div className="blocMonMateriel">
            <div className="blocMonMateriel__logo">
              {/* <img className="imagefondparcmateriel" alt="tracesrouestracteurs" src="./src/fondparcmateriel.jpg" width="50%" /> */}
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
      </div>
    </div>
  );
}

export default AllParcMateriel;
