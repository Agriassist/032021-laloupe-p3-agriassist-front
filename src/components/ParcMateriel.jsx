import '../Styles/parcMateriel.css';
import React, { useContext, useState } from 'react'

import AllParcMateriel from './AllParcMateriel';
import OneParcMateriel from './OneParcMateriel';

function ParcMateriel() {

    const [materielId, setMaterielId] = useState();

    return (
        <div>
              {materielId ? <OneParcMateriel /> : <AllParcMateriel setMaterielId={setMaterielId}/>}
        </div>
    )
}

export default ParcMateriel
