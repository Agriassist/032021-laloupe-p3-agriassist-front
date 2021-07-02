import React, { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
=======
import { useHistory } from 'react-router-dom';
>>>>>>> dev
import { gsap } from 'gsap';
import '../Styles/PageConnection.css';
import logoAgri from '../images/logoAgri.png';
import Intro from './Intro';

export default function PageConnection() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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

  const submitLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const data = new FormData();
      data.append(
        'login',
        JSON.stringify({
          email: email,
          password: password,
        }),
      );

      console.log(data);
      axios({
        method: 'POST',
        url: 'http://localhost:8000/api/login',
        data,
      })
        .then((data) => data.data)
        .then((data) => {
          console.log(data);
          setEmail('');
          setPassword('');
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <div className="container__menu">
      <div className="container__pageconnection">
        <Intro />

<<<<<<< HEAD
        <img id="img__logo" src={logoAgri} alt="logo" ref={refImg} />
        <input id="input__one" type="text" placeholder="Identifiant" ref={refInputOne} />
        <input id="input__two" type="password" placeholder="Mot de Passe" ref={refInputTwo} />
        <div className="container__authentification " ref={refAuthen}>
          <i className="fas fa-fingerprint"></i>
=======
      <img id="img__logo" src={logoAgri} alt="logo" ref={refImg} />
      <input id="input__one" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ref={refInputOne} />
      <input
        id="input__two"
        type="password"
        placeholder="Mot de Passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        ref={refInputTwo}
      />
      <button id="btn__login__account" onClick={submitLogin}>
        Login
      </button>
      <div className="container__authentification " ref={refAuthen}>
        <i className="fas fa-fingerprint"></i>
>>>>>>> dev

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
