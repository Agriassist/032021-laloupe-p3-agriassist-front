import '../Styles/parcMateriel.css';
import React, { useState } from 'react';

import AllParcMateriel from './AllParcMateriel';
import OneParcMateriel from './OneParcMateriel';
import HautDePage from './HautDePage';

function ParcMateriel() {
  const [materielId, setMaterielId] = useState();

  return (
    <div>
      <HautDePage />
      {materielId ? <OneParcMateriel materielId={materielId} /> : <AllParcMateriel setMaterielId={setMaterielId} />}
    </div>
  );
}

export default ParcMateriel;
