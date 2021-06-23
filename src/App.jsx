import React from 'react';
import './App.css';
import PageConnection from './components/PageConnection';
import MenuPricipal from './components/MenuPricipal';
import Intro from './components/Intro';
import Profil from './components/Profil';

function App() {
  return (
    <main className="container__site">
      <Profil />
    </main>
  );
}

export default App;
