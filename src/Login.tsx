import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonRow, IonCol, IonLabel, IonCheckbox ,IonHeader,IonToolbar,IonTitle,IonBackButton,IonButtons} from '@ionic/react';
import 'bootstrap/dist/css/bootstrap.css';
import { IonIcon } from '@ionic/react';
import { person ,arrowBack} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './css/login.css';

const Login: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack(); // Utilisez cette fonction pour revenir à la page précédente
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construire l'objet à envoyer dans la requête
    const requestBody = {
      email,
      mdp: password,
    };

    try {
      // Effectuer la requête POST
      const response = await fetch('http://localhost:80/api/user/verif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Vérifier si la requête a réussi (code de statut 200)
      if (response.ok) {
        console.log('Authentification réussie');
        // Ajoutez ici la logique de redirection ou d'autres actions après l'authentification réussie
      } else {
        console.error('Échec de l\'authentification');
        // Ajoutez ici la logique pour traiter l'échec de l'authentification
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      // Ajoutez ici la logique pour traiter les erreurs de requête
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
              {/* Ajoutez le IonIcon en haut du formulaire */}
              <IonIcon icon={person} style={{ fontSize: '3em', color: 'black' ,marginTop: '-3px'}} className="mx-auto mb-3" />

              <div className="mb-3">
                <IonLabel style={{color:'rgb(43 43 43)',fontWeight: 'bold'}}>Email address</IonLabel>
                <IonInput
                  type="email"
                  className="form-control champ"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  style={{ width: '323px' }}
                />
              </div>
              <div className="mb-3">
                <IonLabel style={{color:'rgb(43 43 43)',fontWeight: 'bold'}}>Password</IonLabel>
                <IonInput
                  type="password"
                  className="form-control champ"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  style={{ width: '323px' }}
                />
              </div>
              <button type='submit' className="button-29 " style={{ marginTop: '25px'}}>Connexion</button>
            </form>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
