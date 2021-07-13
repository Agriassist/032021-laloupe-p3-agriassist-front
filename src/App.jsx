/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useStateValue } from './contexts/Context';
import PageConnection from './components/PageConnection';
import MenuPrincipalAgri from './components/MenuPrincipalAgri';
import Intro from './components/Intro';
import ParcMateriel from './components/ParcMateriel';
import Document from './components/Document';
import Popup from './components/Popup';
import Profil from './components/Profil';
import OneParcMateriel from './components/OneParcMateriel';
import Document_BonTravail from './components/Document_BonTravail';
import Document_Facture from './components/Document_Facture';
import AllParcMateriel from './components/AllParcMateriel';
import CreateAccount from './components/CreateAccount';
import { Link, Switch, Route } from 'react-router-dom';
import PostFiche from './components/PostFiche';
import UpdateProfil from './components/UpdateProfil';
import FicheTech from './components/FicheTech';
import CreateMateriel from './components/CreateMateriel';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [{ token, status, id }, dispatch] = useStateValue();

  const refreshToken = () => {
    console.log('ok');
    axios({
      method: 'POST',
      url: `${API_BASE_URL}/api/login/refresh_token`,
      withCredentials: true,
    })
      .then(({ data }) => {
        const { id, status, token } = data;
        console.log(id, status, token);
        console.log('before refresh token: ', 15 * 60 * 1000 - 5000);

        // setTimeout pour renouvler avant expiration l'access_token
        setTimeout(() => {
          console.log('inside setTimeout refresh token: ', 15 * 60 * 1000 - 5000);
          refreshToken();
        }, 15 * 60 * 1000 - 10000);

        dispatch({ type: 'SET_ID', id });
        dispatch({ type: 'SET_TOKEN', token });
        dispatch({ type: 'SET_STATUS', status });
        console.log('good');
      })
      .catch((err) => {
        // console.log('error refresh: ', err.response.data);
        dispatch({ type: 'RESET_USER' });
        dispatch({ type: 'RESET_JWT' });
      });
  };

  useEffect(() => {
    refreshToken();
  }, []);

  console.log(`%c${token}`, 'color:red');
  console.log(`%c${status}`, 'color:green');
  console.log(`%c${id}`, 'color:brown');
  return (
    <main className="container__site">
      <Switch>
        {(status === 'agriculteur' || status === 'concessionnaire' || status === 'administrateur') && (
          <>
            <Route path="/users">
              <MenuPrincipalAgri />
            </Route>
            <Route path="/materiel">
              <ParcMateriel id={id} />
            </Route>
            <Route path="/AllParcMateriel">
              <AllParcMateriel token={token} />
            </Route>
            <Route path="/OneParcMateriel">
              <OneParcMateriel />
            </Route>
            <Route path="/parametre/:id">
              <UpdateProfil />
            </Route>
            <Route path="/profil">
              <Profil />
            </Route>
            <Route path="/document">
              <Document />
            </Route>
            <Route path="/popup">
              <Popup />
            </Route>
            {status === 'administrateur' && (
              <Route path="/create_account">
                <CreateAccount />
              </Route>
            )}
          </>
        )}
        <Route path="/">
          <PageConnection />
        </Route>
      </Switch>
      <Popup />
    </main>
  );
}

export default App;
