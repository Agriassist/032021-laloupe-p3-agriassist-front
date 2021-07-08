import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';
import '../Styles/Document.css';
import FicheTech from './FicheTech';

export default function Document_BonTravail() {
  const [fiche, setFiche] = useState([]);
  const [ficheVisible, setFicheVisible] = useState(false);

  function ficheClickVisible() {
    setFicheVisible(!ficheVisible);
  }
  // const [ficheId, setFicheId] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/carnet_entretien/')
      .then((res) => res.json())
      .then((data) => data.data[0]);
    setFiche(data);
  }, []);

  function deleteFiche() {
    useEffect(() => {
      fetch({
        method: 'DELETE',
        url: 'http://localhost:8000/carnet_entretien/:id',
      });
    }, []);
  }

  return (
    <div className="container__BDC">
      <img className={ficheVisible ? 'fiche__no__visible' : 'fiche__visible'} src={data.fiche} alt="fiche-tech" />
      <div className="container__bon">
        {/* <p>Claire</p>
          <p>Thomas</p>
          <p>Axel</p>
          <p>Benjamin</p>
          <p>Claire</p>
          <p>Thomas</p>
          <p>Axel</p>
          <p>Benjamin</p> */}

        {fiche.map((fiches) => (
          <FicheTech key={fiches.id} fiches={fiches} ficheClickVisible={ficheClickVisible} deleteFiche={deleteFiche} />
        ))}
      </div>
    </div>
  );
}
