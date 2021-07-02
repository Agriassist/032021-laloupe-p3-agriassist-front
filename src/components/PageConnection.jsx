import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../Styles/PageConnection.css';
import logoAgri from '../logoAgri.png';
import Intro from './Intro';

export default function PageConnection() {
  const refImg = useRef(null);
  const refInputOne = useRef(null);
  const refInputTwo = useRef(null);
  const refAuthen = useRef(null);

  useEffect(() => {
    const TimelineLogin = gsap.timeline();

    TimelineLogin.from(refImg.current, { y: -50, duration: 0.7, delay: 4.625, opacity: 0, ease: 'power2.out' })
      .from(refInputOne.current, { y: -50, duration: 0.7, opacity: 0, ease: 'power2.out' })
      .from(refInputTwo.current, { y: -50, duration: 0.7, opacity: 0, ease: 'power2.out' })
      .from(refAuthen.current, { y: -50, duration: 0.7, opacity: 0, ease: 'power2.out' });
  }, []);
  return (
    <div className="container__menu">
      <div className="container__pageconnection">
        <Intro />

        <img id="img__logo" src={logoAgri} alt="logo" ref={refImg} />
        <input id="input__one" type="text" placeholder="Identifiant" ref={refInputOne} />
        <input id="input__two" type="password" placeholder="Mot de Passe" ref={refInputTwo} />
        <div className="container__authentification " ref={refAuthen}>
          <i className="fas fa-fingerprint"></i>

          <a rel="nofollow" href="https://www.qr-code-generator.com">
            <img
              id="Qr__Code"
              src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fwww.example.com&chs=180x180&choe=UTF-8&chld=L|2"
              alt=""></img>
          </a>
        </div>
      </div>
    </div>
  );
}
