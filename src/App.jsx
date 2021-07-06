/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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

function App() {
  const [{ token, status, id }, dispatch] = useStateValue();

  console.log(token, status, id);
  return (
    <main className="container__site">
      <Switch>
        <Route exact path="/">
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
        </Route>
      </Switch>
      {/* <ParcMateriel /> */}
    </main>
  );
}

export default App;
