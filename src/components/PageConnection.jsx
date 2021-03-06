/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useStateValue } from '../contexts/Context';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { gsap } from 'gsap';
import '../Styles/PageConnection.css';
import logoAgri from '../images/logoAgri.png';
import Intro from './Intro';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function PageConnection() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [{ token, status, id }, dispatch] = useStateValue();

  const refImg = useRef(null);
  const refInputOne = useRef(null);
  const refInputTwo = useRef(null);
  const refAuthen = useRef(null);
  const refBtn = useRef(null);

  let history = useHistory();

  useEffect(() => {
    const TimelineLogin = gsap.timeline();

    TimelineLogin.from(refImg.current, { y: -50, duration: 0.7, delay: 3.5, opacity: 0, ease: 'power2.out' })
      .from(refInputOne.current, { y: -50, duration: 0.7, opacity: 0, ease: 'power2.out' }, '-=0.2s')
      .from(refInputTwo.current, { y: -50, duration: 0.7, opacity: 0, ease: 'power2.out' }, '-=0.2s')
      .from(refBtn.current, { y: -50, duration: 0.7, opacity: 0, ease: 'power2.out' }, '-=0.2s')
      .from(refAuthen.current, { y: -50, duration: 0.7, opacity: 0, ease: 'power2.out' }, '-=0.2s');
  }, []);

  const submitLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/login`,
        data: { email, password },
        withCredentials: true,
      })
        .then((data) => {
          dispatch({ type: 'SET_TOKEN', token: data.data.token });
          dispatch({ type: 'SET_STATUS', status: data.data.status });
          dispatch({ type: 'SET_ID', id: data.data.id });
          if (data.data.token !== undefined) {
            setTimeout(() => {
              history.push('/users');
            }, 300);
          } else {
            alert('wrong password or email');
          }
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  };

  return (
    <div className="container__menu">
      <div className="container__pageconnection">
        <Intro />
        <img id="img__logo1" src={logoAgri} alt="logo" ref={refImg} />
        <input id="input__one" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ref={refInputOne} />
        <div className="container__input__password">
          <i className="fas fa-eye"></i>
        </div>
        <input
          id="input__two"
          type="password"
          placeholder="Mot de Passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ref={refInputTwo}
        />

        <button className="btn__login__account" to="/users" id="btn__login__account" onTouchStart={submitLogin} onClick={submitLogin} ref={refBtn}>
          Login
        </button>
        <div className="container__authen ">
          <div className="container__authentification " ref={refAuthen}>
            <i className="fas fa-fingerprint"></i>

            <a rel="nofollow" href="https://www.qr-code-generator.com">
              <img
                id="Qr__Code"
                src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fwww.example.com&chs=180x180&choe=UTF-8&chld=L|2"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
