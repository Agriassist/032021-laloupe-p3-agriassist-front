/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.css';
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
import ParamsProfil from './components/ParamsProfil';
import Document_BonTravail from './components/Document_BonTravail';
import Document_Facture from './components/Document_Facture';
import AllParcMateriel from './components/AllParcMateriel';
import CreareAccount from './components/CreareAccount';
import MenuPrincipalConce from './components/MenuPrincipalConce';
import { Link, Switch, Route } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [id, setId] = useState(undefined);
  console.log(token, status, id);

  return (
    <main className="container__site">
      <Switch>
        <Route exact path="/">
          <PageConnection setToken={setToken} setStatus={setStatus} setId={setId} />
        </Route>
        <Route path="/users">
          <MenuPrincipalAgri />
        </Route>
        <Route path="/materiel">
          <ParcMateriel />
        </Route>
        <Route path="/AllParcMateriel">
          <AllParcMateriel token={token} />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
