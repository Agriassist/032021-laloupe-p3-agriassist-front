import '../Styles/parcMateriel.css';
import React, { useState } from 'react';

import AllParcMateriel from './AllParcMateriel';
import OneParcMateriel from './OneParcMateriel';
import HautDePage from './HautDePage';

function ParcMateriel() {
  const [materielId, setMaterielId] = useState();

  return (
    <div className="container__menu">
      <div>
        <HautDePage />
        {materielId ? <OneParcMateriel /> : <AllParcMateriel setMaterielId={setMaterielId} />}
      </div>
    </div>
  );
}

export default ParcMateriel;
