import React, { useState, useEffect } from 'react';
import HautDePage from './HautDePage';
import axios from 'axios';
import '../Styles/AllAgriConcId.css';
import cardAgri from '../components/cardAgri';

export default function AllAgriConcId() {
  const [card, setCard] = useState([]);

  useEffect(() => {
    axios('').then((data) => {
      setCard(data);
    });
  });
  return (
    <div className="container__card__agri">
      <HautDePage />
      {card.map((cardagri) => (
        <cardAgri key={cardagri.id} {...cardagri} />
      ))}
    </div>
  );
}
