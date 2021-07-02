import React from 'react';
import '../Styles/intro.css';
import logoAgri from '../images/logoAgri.png';

function Intro() {
  const phraseIntro = 'BIENVENUE ...'.split('');
  const timer = 8;


  return (
    <div className="intro-contenair" style={{ animationDelay: phraseIntro.length / timer + 1 + 's' }}>
      <img className="intro-logo" src={logoAgri} alt="ddd" />
      <section className="intro-text">
        {phraseIntro.map((text, index) => (
          <span style={{ animationDelay: index / timer + 's' }} key={index} className="animat">{text}</span>
        ))}
      </section>
    </div>
  );
}

export default Intro;
