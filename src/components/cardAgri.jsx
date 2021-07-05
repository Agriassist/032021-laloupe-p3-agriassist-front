import React from 'react';
import '../Styles/cardAgri.css';

export default function cardAgri({ photo_profil, nom, prenom }) {
  return (
    <div className="card__agri">
      <div
        className="photo__card"
        style={{
          backgroundImage: `url(${photo_profil})`,
          backgroundSize: 'cover',
        }}></div>
      <p>
        {nom} {prenom}
      </p>
    </div>
  );
}
