import React from 'react';
import './App.css';
import PageConnection from './components/PageConnection';
import MenuPrincipalAgri from './components/MenuPrincipalAgri';
import Intro from './components/Intro';
import ParcMateriel from './components/ParcMateriel';

function App() {
  return (
    <main className="container__site">
      {/* <PageConnection /> */}
      <ParcMateriel />
    </main>
  );
}

export default App;
