import React from 'react';
import logoAgri from '../logoAgri.png';
import '../Styles/PageFin.css';

export default function PageFin() {
  const phraseEnd = 'A Bientôt !'.split('');
  const timer = 8;

  console.log(phraseEnd.length / timer + 1 + 's');
  return (
    <div className="end-contenair">
      <img className="end-logo" src={logoAgri} alt="ddd" />
      <section className="end-text">
        {phraseEnd.map((text, index) => (
          <span style={{ animationDelay: index / timer + 's' }} key={index} className="animat">
            {text}
          </span>
        ))}
      </section>
    </div>
  );
}
