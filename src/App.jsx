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
import PageFin from './components/PageFin';
import Popup from './components/Popup';
import MenuConcess from './components/MenuConcess';
import Profil from './components/Profil';
import OneParcMateriel from './components/OneParcMateriel';
import Document_BonTravail from './components/Document_BonTravail';
import Document_Facture from './components/Document_Facture';
import AllParcMateriel from './components/AllParcMateriel';
import CreareAccount from './components/CreareAccount';
import MenuPrincipalConce from './components/MenuPrincipalConce';
import { Link, Switch, Route } from 'react-router-dom';
import AllAgriConcId from './components/AllAgriConcId';
import PostFiche from './components/PostFiche';
import UpdateProfil from './components/UpdateProfil';
import FicheTech from './components/FicheTech';
import CreateMateriel from './components/CreateMateriel';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [{ token, status, id }, dispatch] = useStateValue();

  const refreshToken = () => {
    console.log("ok");
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
        dispatch({ type: 'SET_TOKEN', token: token });
        dispatch({ type: 'SET_STATUS', status: status });

        // dispatch({ type: 'SET_TOKEN', token: data.data.token });
        // dispatch({ type: 'SET_STATUS', status: data.data.status });
        // dispatch({ type: 'SET_ID', id: data.data.id });
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

  console.log(token, status, id);
  return (
    <main className="container__site">
      <CreateMateriel />
      <Switch>
        {/* <Route exact path="/">
          <PageConnection />
        </Route>
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
        </Route> */}
        <Route path="/parametre/:id">
          <UpdateProfil />
        </Route>
        <Route path="/profil">
          <Profil />
        </Route>
      </Switch>

      {/* <ParcMateriel /> */}
    </main>
  );
}

export default App;
