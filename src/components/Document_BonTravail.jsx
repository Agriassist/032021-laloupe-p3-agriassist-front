import React, { useState, useEffect } from 'react';
import '../Styles/Document.css';

export default function Document_BonTravail() {
  const bonDeTravail = [
    {
      id: 1,
      name: 'Bon n°=12458797',
    },
    {
      id: 2,
      name: 'Bon n°=12448787',
    },
    {
      id: 3,
      name: 'Bon n°=12235565',
    },
    {
      id: 4,
      name: 'Bon n°=129622545',
    },
    {
      id: 5,
      name: 'Bon n°=124587975',
    },
    {
      id: 6,
      name: 'Bon n°=124587975',
    },
    {
      id: 7,
      name: 'Bon n°=1245874545',
    },
    {
      id: 8,
      name: 'Bon n°=1245813265',
    },
    {
      id: 9,
      name: 'Bon n°=12458795626',
    },
  ];
  return (
    <div className="container__BDC">
      <div className="container__bon">
      {bonDeTravail.map((f, i) => (
          <div key={i} className="bloc__all">
            <div className="bloc__facturetext">
              <p>{f.name}</p>
            </div>

            <div className="container__facturelogo">
              <div className="bloc__facturelogo">
                <i className="fas fa-eye"></i>
                <i className="far fa-arrow-alt-circle-down"></i>
                <i className="far fa-times-circle"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
