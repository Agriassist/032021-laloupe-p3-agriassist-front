import React from 'react';
import '../Styles/Document.css';

export default function Document_Facture() {
  const facture = [
    {
      id: 1,
      name: 'F201912 Valtra',
    },
    {
      id: 2,
      name: 'F202014 Berthoud',
    },
    {
      id: 3,
      name: 'F202019 Massey',
    },
    {
      id: 4,
      name: 'F201912 Valtra',
    },
    {
      id: 5,
      name: 'F202014 Berthoud',
    },
    {
      id: 6,
      name: 'F202019 Massey',
    },
    {
      id: 7,
      name: 'F201912 Valtra',
    },
    {
      id: 8,
      name: 'F202014 Berthoud',
    },
    {
      id: 9,
      name: 'F202019 Massey',
    },
  ];
  return (
    <div className="container__FAC">
      <div className="container__facture">
        {facture.map((f, i) => (
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
