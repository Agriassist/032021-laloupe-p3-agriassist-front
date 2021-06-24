import React from 'react';
import './App.css';
import PageConnection from './components/PageConnection';
import MenuPrincipalAgri from './components/MenuPrincipalAgri';
import Intro from './components/Intro';
import ParcMateriel from './components/ParcMateriel';
import Document from './components/Document';
import PageFin from './components/PageFin';
import Popup from './components/Popup'
import Profil from './components/Profil'

function App() {
  return (
    <main className="container__site">
      {/* <PageConnection /> */}
      <Profil />
    </main>
  );
}

export default App;
