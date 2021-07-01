/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

function AllParcMateriel(props) {
  function selectMateriel(id) {
    props.setMaterielId(id);
  }

  return (
    <div>
      <header className="parc-header">Mon parc matériel</header>
      <section className="parc-image">
        <figure className="cadre-trackteur" onClick={() => selectMateriel(1)}>
          <img src="./src/agriculteur.png" alt="trackteur" className="image-trackteur" />
          <figcaption>oui va s y oui-oui</figcaption>
        </figure>
        <figure className="cadre-trackteur" onClick={() => selectMateriel(2)}>
          <img src="./src/agriculteur.png" alt="trackteur" className="image-trackteur" />
          <figcaption>oui va s y oui-oui</figcaption>
        </figure>
        <figure className="cadre-trackteur" onClick={() => selectMateriel(3)}>
          <img src="./src/agriculteur.png" alt="trackteur" className="image-trackteur" />
          <figcaption>oui va s y oui-oui</figcaption>
        </figure>
        <figure className="cadre-trackteur" onClick={() => selectMateriel(4)}>
          <img src="./src/agriculteur.png" alt="trackteur" className="image-trackteur" />
          <figcaption>oui va s y oui-oui</figcaption>
        </figure>
      </section>
    </div>
  );
}

export default AllParcMateriel;
