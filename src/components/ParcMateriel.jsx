import '../Styles/parcMateriel.css';
import React, { useState } from 'react';
import { useStateValue } from '../contexts/Context';

import AllParcMateriel from './AllParcMateriel';
import OneParcMateriel from './OneParcMateriel';
import HautDePage from './HautDePage';

function ParcMateriel() {
  const [materielId, setMaterielId] = useState();
  const [{ id }] = useStateValue();

  return (
    <div className="container__menu">
      <div>
        <HautDePage />
        <AllParcMateriel id={id} setMaterielId={setMaterielId} />
      </div>
    </div>
  );
}

export default ParcMateriel;
