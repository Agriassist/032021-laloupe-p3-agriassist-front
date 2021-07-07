/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useStateValue } from '../contexts/Context';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { gsap } from 'gsap';
import '../Styles/PageConnection.css';
import logoAgri from '../images/logoAgri.png';
import Intro from './Intro';

export default function PageConnection() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [{ token, status, id }, dispatch] = useStateValue();

  const refImg = useRef(null);
  const refInputOne = useRef(null);
  const refInputTwo = useRef(null);
  const refAuthen = useRef(null);

  let history = useHistory();

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
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/api/login`,
        data: { email, password },
      })
        .then((data) => {
          dispatch({ type: 'SET_TOKEN', token: data.data.token });
          dispatch({ type: 'SET_STATUS', status: data.data.status });
          dispatch({ type: 'SET_ID', id: data.data.id });
          if (data.data.token !== undefined) {
            history.push('/users');
          } else {
            alert('wrong password or email');
          }
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

        <img id="img__logo" src={logoAgri} alt="logo" ref={refImg} />
        <input id="input__one" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ref={refInputOne} />
        <div className="container__input__password">
          <i class="fas fa-eye"></i>
        </div>
        <input
          id="input__two"
          type="password"
          placeholder="Mot de Passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ref={refInputTwo}
        />

        <button to="/users" id="btn__login__account" onClick={submitLogin}>
          Login
        </button>
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
