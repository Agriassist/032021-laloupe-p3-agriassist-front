/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import '../Styles/CreateAccount.css';
import axios from 'axios';
import HautDePage from './HautDePage';
import '../Styles/OneParcMateriel.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function CreateAccount() {
  const [status, setStatus] = useState('');

  const SignupSchema = Yup.object().shape({
    pseudo: Yup.string()

      .min(5, 'Cinq caractères minimum')

      .required('Required'),

    prenom: Yup.string().required('Required'),
    nom: Yup.string().required('Required'),

    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .matches(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
        'Doit contenir une majuscule, un chiffre et un caractère spécial(ex: #@!,;)',
      )
      .min(8, 'Minimum huit caractères')
      .max(32, 'Maximum 32 caractères')
      .required(),
    telephone: Yup.string().min(10, 'Numero invalid').max(10, 'Numero invalid').required('Required'),
  });

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const submitCreation = ({ prenom, nom, email, password, telephone, pseudo }) => {
    if (status === '') {
      alert('Select a status');
    } else {
      axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/users`,
        data: { identifiant: pseudo, prenom, nom, email, phone: telephone, statue: status, hassPassword: password },
      })
        .then(() => {
          alert('ok');
          setStatus('');
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <div>
      <div className="container__create__account">
        <HautDePage />
        <p className="OPM_title">Création d'un compte</p>
        <Formik
          initialValues={{
            pseudo: '',
            prenom: '',
            nom: '',
            email: '',
            password: '',
            telephone: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            if (values.password === values.password2) {
              submitCreation(values);
              console.log(values);
            } else {
              alert('Les mots de passe ne sont pas identiques');
            }
          }}>
          <Form>
            <div className="container__creation">
              <label htmlFor="pseudo">Pseudo</label>
              <Field id="input__one__account" name="pseudo" />

              <ErrorMessage component="div" name="pseudo" className="style__error" />
              <label htmlFor="prenom">Prenom:</label>
              <Field id="input__two__account" name="prenom" />
              <ErrorMessage component="div" name="prenom" className="style__error" />
              <label htmlFor="nom">Nom:</label>
              <Field id="input__three__account" name="nom" />
              <ErrorMessage component="div" name="nom" className="style__error" />
              <label htmlFor="email">Email:</label>
              <Field id="input__four__account" name="email" />
              <ErrorMessage component="div" name="email" className="style__error" />
              <label htmlFor="password">Mot de passe:</label>
              <Field id="input__five__account" name="password" type="password" />
              <ErrorMessage component="div" name="password" className="style__error" />
              <label htmlFor="password2">Confirmer Mot de passe:</label>
              <Field id="input__five__account" name="password2" type="password" />
              <ErrorMessage component="div" name="password2" className="style__error" />
              <label htmlFor="telephone">Téléphone:</label>
              <Field id="input__six__account" name="telephone" maxLength={10} />
              <ErrorMessage component="div" name="telephone" className="style__error" />
              <select name="status__choice" id="status__choice" value={status} onChange={handleChange}>
                <option value=""> Select status...</option>
                <option value="administrateur">Administrateur</option>
                <option value="agriculteur">Agriculteur</option>
                <option value="concessionnaire">Concessionnaire</option>
              </select>

              <div className="container__btn">
                <button type="submit" id="btn__create__account">
                  Créer le compte
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
