/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import PageConnection from './components/PageConnection';
import MenuPrincipalAgri from './components/MenuPrincipalAgri';
import Intro from './components/Intro';
import ParcMateriel from './components/ParcMateriel';
import Document from './components/Document';
import PageFin from './components/PageFin';
import Popup from './components/Popup';
import Profil from './components/Profil';
import ParamsProfil from './components/ParamsProfil';
import Document_BonTravail from './components/Document_BonTravail';
import Document_Facture from './components/Document_Facture';
import AllParcMateriel from './components/AllParcMateriel';
import CreareAccount from './components/CreareAccount';
import MenuPrincipalConce from './components/MenuPrincipalConce';
import { Link, Switch, Route } from 'react-router-dom';
import UpdateProfil from './components/UpdateProfil';
import AllAgriConcId from './components/AllAgriConcId';
import PostFiche from './components/PostFiche';

function App() {
  return (
    <main className="container__site">
      <PageConnection />

      <Switch>
        <Route exact path="/menu">
          <MenuPrincipalAgri />
        </Route>
        <Route path="/materiel">
          <ParcMateriel />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
