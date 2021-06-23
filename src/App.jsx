import React from 'react';
import './App.css';
import PageConnection from './components/PageConnection';
import MenuPrincipalAgri from './components/MenuPrincipalAgri';
import Intro from './components/Intro';

function App() {
  return (
    <main className="container__site">
      {/* <PageConnection /> */}
      <MenuPrincipalAgri />
    </main>
  );
}

export default App;
