import React from 'react';
import '../Styles/FicheTech.css';

export default function FicheTech({ name, ficheVisibleClick, deleteFiche }) {
  return (
    <div className="bloc__bontext">
      <p>Facture de Thomas</p>

      <div className="container__bonlogo">
        <div className="bloc__bonlogo">
          <i className="fas fa-eye" onClick={ficheVisibleClick}></i>
          <i className="far fa-arrow-alt-circle-down"></i>
          <i className="far fa-times-circle" onClick={deleteFiche}></i>
        </div>
      </div>
    </div>
  );
}
