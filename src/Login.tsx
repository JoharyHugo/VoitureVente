import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonRow, IonCol, IonLabel, IonIcon, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/react';
import { person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './css/login.css';

const Login: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const [email, setEmail] = useState('');
  const [mdp, setPassword] = useState('');

  // Mettez à jour requestBody chaque fois que l'email ou le mot de passe change
  useEffect(() => {
    const requestBody = {
      email,
      mdp,
    };
    setRequestBody(requestBody);
  }, [email, mdp]);

  const [requestBody, setRequestBody] = useState({
    email: '',
    mdp: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //console.log(requestBody);
      // Effectuez la requête POST en utilisant le dernier requestBody
      const response = await fetch('http://localhost:80/api/user/verif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Gérez la réponse...
      if (response.ok) {
        const token = await response.text();
        //console.log(token);

        // Stockez le token dans LocalStorage
        localStorage.setItem('token', token);

        // Configurez un délai pour retirer le token après 2 minutes
        setTimeout(() => {
          localStorage.removeItem('token');
          console.log("Le token a été retiré de LocalStorage après 2 minutes.");
        }, 2 * 60 * 1000); // 2 minutes en millisecondes
        history.push("/");
      } else {
        console.error("Échec de l'authentification");

        // Gérez le cas où la réponse n'est pas en JSON
        const nonJsonResponse = await response.text();
        console.log('Réponse non JSON (texte brut) :', nonJsonResponse);

        // Ajoutez ici la logique pour gérer l'échec de l'authentification
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      // Ajoutez ici la logique pour gérer les erreurs de requête
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
            <form onSubmit={handleSubmit} style={{ marginTop: '-81px'}} className="d-flex flex-column align-items-center">
              <IonIcon icon={person} style={{ fontSize: '3em', color: 'black', marginTop: '-3px' }} className="mx-auto mb-3" />

              <div className="mb-3">
                <IonLabel style={{ color: 'rgb(43 43 43)', fontWeight: 'bold' }}>Adresse e-mail</IonLabel>
                <IonInput
                  type="email"
                  className="form-control champ"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  style={{ width: '323px' }}
                />
              </div>
              <div className="mb-3">
                <IonLabel style={{ color: 'rgb(43 43 43)', fontWeight: 'bold' }}>Mot de passe</IonLabel>
                <IonInput
                  type="password"
                  className="form-control champ"
                  value={mdp}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  style={{ width: '323px' }}
                />
              </div>
              <button type='submit' className="button-29 " style={{ marginTop: '25px' }}>Connexion</button>
            </form>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
