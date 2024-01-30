import React, { useRef, useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonLabel,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonSpinner,
} from '@ionic/react';
import { person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './css/login.css';

const Login: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = 'user1@example.com';
      passwordRef.current.value = 'password';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = emailRef.current?.value || '';
      const mdp = passwordRef.current?.value || '';

      const response = await fetch('https://autooccasion-production.up.railway.app/api/user/verif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mdp }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);

        setTimeout(() => {
          localStorage.removeItem('token');
          console.log("Le token a été retiré de LocalStorage après 2 minutes.");
        }, 15 * 60 * 1000);

        history.push("/");
      } else {
        console.error("Échec de l'authentification");
        alert("Échec de l'authentification");

        const nonJsonResponse = await response.text();
        console.log('Réponse non JSON (texte brut) :', nonJsonResponse);
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRow className="justify-content-center align-items-center" style={{ background: `rgb(189 215 243)`, height: '825px' }}>
          <IonCol md="6">
            <form onSubmit={handleSubmit} style={{ marginTop: '-81px' }} className="d-flex flex-column align-items-center">
              <IonIcon icon={person} style={{ fontSize: '3em', color: 'black', marginTop: '-3px' }} className="mx-auto mb-3" />

              <div className="mb-3">
                <IonLabel style={{ color: 'rgb(43 43 43)', fontWeight: 'bold' }}>Adresse e-mail</IonLabel>
                <IonInput
                  type="email"
                  className="form-control champ"
                  ref={emailRef}
                  style={{ width: '323px' }}
                />
              </div>
              <div className="mb-3">
                <IonLabel style={{ color: 'rgb(43 43 43)', fontWeight: 'bold' }}>Mot de passe</IonLabel>
                <IonInput
                  type="password"
                  className="form-control champ"
                  ref={passwordRef}
                  style={{ width: '323px' }}
                />
              </div>
              <IonButton type='submit' className="button-29 " style={{ marginTop: '25px' }}>Connexion</IonButton>
            </form>
            <a href='/inscription' style={{ marginLeft: '170px' }}>Inscription</a>
          </IonCol>
        </IonRow>
        {loading && (
          <div className="loading-overlay">
            <IonSpinner name="dots" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Login;
