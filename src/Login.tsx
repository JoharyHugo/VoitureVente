import React, {  useRef,useEffect  } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonRow, IonCol, IonLabel, IonIcon, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/react';
import { person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './css/login.css';

const Login: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
     history.goBack();
  };
 
  // Create refs for the email and password fields
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Mettez à jour les valeurs par défaut des champs lors du rendu initial
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = 'user1@example.com';
      passwordRef.current.value = 'password1';
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    try {
      const email = emailRef.current?.value || '';
      const mdp = passwordRef.current?.value || '';

      console.log({ email, mdp });
      // Effectuez la requête POST en utilisant le dernier requestBody
      const response = await fetch('http://localhost:80/api/user/verif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mdp }),
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
        }, 15 * 60 * 1000); // 2 minutes in milliseconds
       
        history.push("/");
        //window.location.reload();
      } else {
        console.error("Échec de l'authentification");
        alert("Échec de l'authentification");

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
              <button type='submit' className="button-29 " style={{ marginTop: '25px' }}>Connexion</button>
            </form>
            <a href='/inscription' style={{marginLeft:'170px'}}>Insciption</a>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
 );
};


export default Login;
