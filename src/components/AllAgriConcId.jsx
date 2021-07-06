import React, { useState, useEffect } from 'react';
import HautDePage from './HautDePage';
import axios from 'axios';
import '../Styles/AllAgriConcId.css';
import cardAgri from '../components/cardAgri';

export default function AllAgriConcId() {
  return (
    <div className="container__card__agri">
      <HautDePage />
      <div className="card__agri">
        <img src="" alt="" />
        <p>Thomas Thbaut</p>
      </div>

      <div className="card__agri">
        <img src="" alt="" />
        <p>Thomas Thbaut</p>
      </div>

      <div className="card__agri">
        <img src="" alt="" />
        <p>Thomas Thbaut</p>
      </div>

      <div className="card__agri">
        <img src="" alt="" />
        <p>Thomas Thbaut</p>
      </div>

      <div className="card__agri">
        <img src="" alt="" />
        <p>Thomas Thbaut</p>
      </div>

      <div className="card__agri">
        <img src="" alt="" />
        <p>Thomas Thbaut</p>
      </div>
    </div>
  );
}
