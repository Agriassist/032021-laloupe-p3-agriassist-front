import React from 'react';

import logoAgri from '../logoAgri.png';

function Intro() {
  const phraseIntro = 'BIENVENUE ...'.split('');
  const timer = 8

  console.log(phraseIntro);

  return (
    <div className="intro-contenair" style={{ animationDelay: phraseIntro.length / timer + 1 + 's' }}>
      <img className="intro-logo" src={logoAgri} alt="ddd" />
      <section>
        {phraseIntro.map((text, index) => (
          <span style={{ animationDelay: index / timer + 's' }} key={index} className="animat">{text}</span>
        ))}
      </section>
    </div>
  );
}

export default Intro;
