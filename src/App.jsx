/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useStateValue } from './contexts/Context';
import PageConnection from './components/PageConnection';
import MenuPrincipalAgri from './components/MenuPrincipalAgri';
import ParcMateriel from './components/ParcMateriel';
import Document from './components/Document';
import Popup from './components/Popup';
import Profil from './components/Profil';
import OneParcMateriel from './components/OneParcMateriel';
import Document_BonTravail from './components/Document_BonTravail';
import Document_Facture from './components/Document_Facture';
import AllParcMateriel from './components/AllParcMateriel';
import CreateAccount from './components/CreateAccount';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import PostFiche from './components/PostFiche';
import UpdateProfil from './components/UpdateProfil';
import FicheTech from './components/FicheTech';
import CreateMateriel from './components/CreateMateriel';
import UpdateMateriel from './components/UpdateMateriel';
import CreateMarque from './components/CreateMarque';
import CreateModele from './components/CreateModele';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [{ token, status, id, materielId }, dispatch] = useStateValue();

  const refreshToken = () => {
    axios({
      method: 'POST',
      url: `${API_BASE_URL}/api/login/refresh_token`,
      withCredentials: true,
    })
      .then(({ data }) => {
        const { id, status, token } = data;

        // setTimeout pour renouvler avant expiration l'access_token
        setTimeout(() => {
          refreshToken();
        }, 15 * 60 * 1000 - 5000);

        dispatch({ type: 'SET_ID', id });
        dispatch({ type: 'SET_TOKEN', token });
        dispatch({ type: 'SET_STATUS', status });
      })
      .catch((err) => {
        dispatch({ type: 'RESET_STATUS' });
        dispatch({ type: 'RESET_TOKEN' });
        dispatch({ type: 'RESET_ID' });
      });
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <main className="container__site">
      <Switch>
        {(status === 'agriculteur' || status === 'concessionnaire' || status === 'administrateur') && (
          <>
            <Route path="/fiche_technique">
              <PostFiche />
            </Route>
            <Route path="/create_modele">
              <CreateModele />
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
            <Route path="/update_profil">
              <UpdateProfil />
            </Route>
            {materielId ? (
              <>
                <Route path="/update_mat">
                  <UpdateMateriel />
                </Route>
                <Route path="/OneParcMateriel">
                  <OneParcMateriel />
                </Route>
              </>
            ) : (
              <Redirect to="/materiel" />
            )}
            {status === 'administrateur' && (
              <>
                <Route path="/create_account">
                  <CreateAccount />
                </Route>
                <Route path="/create_materiel">
                  <CreateMateriel />
                </Route>
                <Route path="/create_Marque">
                  <CreateMarque />
                </Route>
              </>
            )}
          </>
        )}
        {!token ? (
          <Route path="/">
            <PageConnection />
          </Route>
        ) : null}
      </Switch>
      <Popup />
    </main>
  );
}

export default App;
