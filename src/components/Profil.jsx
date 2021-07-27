import '../Styles/Profil.css';
import HautDePage from './HautDePage';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateValue } from '../contexts/Context';

export default function Profil() {
  // const [{ id }] = useStateValue();
  // const [name, setName] = useState([]);
  // const preTableau = [...name];

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: `${process.env.REACT_APP_API_URL}/api/materiels/users/${id}`,
  //   })
  //     .then((data) => {
  //       for (let i = 0; i < data.data.length; i++) {
  //         axios({
  //           method: 'GET',
  //           url: `${process.env.REACT_APP_API_URL}/api/users/materiel/${data.data[i].id}`,
  //         }).then((data) => {
  //           for (let y = 0; y < data.data.length; y++) {
  //             const itemIndex = preTableau.findIndex((user) => {
  //               return user.id === data.data[y].id;
  //             });
  //             if (itemIndex <= -1) {
  //               if (data.data[y].status === 'concessionnaire') {
  //                 preTableau.push(data.data[y]);
  //               }
  //             }
  //           }
  //         });
  //       }
  //       setName(preTableau);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // }, []);

  return (
    <div className="container__menu">
      <HautDePage />
      <header className="profil-header">
        <div className="blocMesProfils">
          <div className="blocMesProfils__logo">
            {/* <img className="imagefondparcmateriel" alt="tracesrouestracteurs" src="./src/fondparcmateriel.jpg" width="50%" /> */}
            <i className="fas fa-id-card"></i>
          </div>
          <p>Mes profils</p>
        </div>
      </header>

      <div className="container_image_en_construction">
        {/* <i className="image_en_construction"></i> */}
        <p>Page en construction</p>
      </div>
      {/* <div className="quatrebloc__containerprofil">
        <div className="profil_bloc">
          <div className="profil__datadmin">
            <img className="img__bloc__admin" src={agriculteur} alt="profil" />
            <p>Benjamin</p>
          </div>
          <p id="role__admin">Administrateur</p>
        </div>
        <div className="profil_bloc">
          <div className="profil__data">
            <img className="img__bloc" src={agriculteur} alt="profil" />
            <p>Thomas</p>
          </div>
        </div>
        <div className="profil_bloc">
          <div className="profil__data">
            <img className="img__bloc" src={agriculteur} alt="profil" />
            <p>Axel</p>
          </div>
        </div>
        <div className="profil_bloc">
          <div className="profil__data">
            <img className="img__bloc" src={agriculteur} alt="profil" />
            <p>Claire</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
