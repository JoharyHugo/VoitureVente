import React, { useState, useRef } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonLabel,
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

const Inscription: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom,setNom]=useState('');
  const [prenom,setPrenom]=useState('');
  const [contact,setContact]=useState('');

  const contactRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    test()
      .then((result) => {
        if (result?.success) {
          console.log('DONE');
          alert("Inscription ok veuillez vous connectez maintent")
          history.push('/');
          return;
        } else {
          console.log('ERROR');
        }
      })
      .catch((error) => console.log(error));
  };

  const test = async () => {
    //e.preventDefault();
    const contactValue = contactRef.current?.value || '';
    try {
      const response = await fetch('https://autooccasion-production.up.railway.app/api/user/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, nom, prenom, "mdp": password, "contact": contactValue }),
      });

      if (response.status === 500) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.status === 201) {
        //const token = await response.text();
        //localStorage.setItem('token', token);
        
        /*setTimeout(() => {
          localStorage.removeItem('token');
          console.log("Le token a été retiré de LocalStorage après 2 minutes.");
        }, 15 * 60 * 1000); // 2 minutes in milliseconds*/

        // Autres opérations ici
        console.log('Email:', email);
        console.log('Password:', password);
        console.log("Nom:", nom);
        console.log("Prenom:", prenom);
        console.log("Contact:", contactValue);
      } else {
        console.error('Échec de la création du compte');
      }
      return { success: true };
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Error:', error);
      return { success: false };
    }
  };
  
  
  

  return (
    <IonPage className="reset-styles">
       <IonHeader>
      <IonToolbar>
      <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        <IonTitle>Inscription</IonTitle>
      </IonToolbar>
    </IonHeader>
      <IonContent className="ion-padding">
        <IonRow className="justify-content-center align-items-center" style={{ background: `#e2f0ff`, height: '825px' }}><h1>Inscription</h1>
          <IonCol md="6">
          
            <form onSubmit={handleSubmit} style={{ marginTop: '-168px'}} className="d-flex flex-column align-items-center">
              {/* Ajoutez le IonIcon en haut du formulaire */}
              

              <div className="mb-3">
                <IonLabel style={{color:'black',fontWeight: 'bold'}}>Email address</IonLabel>
                <IonInput
                  type="email"
                  className="form-control champ"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  style={{ width: '323px' }}
                />
              </div>
              <div className="mb-3">
                <IonLabel style={{color:'black',fontWeight: 'bold'}}>Nom</IonLabel>
                <IonInput
                  type="text"
                  className="form-control champ"
                  value={nom}
                  onIonChange={(e) => setNom(e.detail.value!)}
                  style={{ width: '323px' }}
                />
              </div>
              <div className="mb-3">
                <IonLabel style={{color:'black',fontWeight: 'bold'}}>Prenom</IonLabel>
                <IonInput
                  type="text"
                  className="form-control champ"
                  value={prenom}
                  onIonChange={(e) => setPrenom(e.detail.value!)}
                  style={{ width: '323px' }}
                />
              </div>
              <div className="mb-3">
                <IonLabel style={{color:'black',fontWeight: 'bold'}}>Password</IonLabel>
                <IonInput
                  type="password"
                  className="form-control champ"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  style={{ width: '323px' }}
                />
              </div>
              <div className="mb-3">
                <IonLabel style={{color:'black',fontWeight: 'bold'}}>Contact</IonLabel>
                <IonInput
                  type="number"
                  className="form-control champ"
                  value={contact}
                  onIonChange={(e) => setContact(e.detail.value!)}
                  ref={contactRef}
                  style={{ width: '323px' }}
                />
              </div>
              <button type='submit' className="button-29 " style={{ marginTop: '25px'}}>Connexion</button>
            </form>
            <a href='/login' style={{marginLeft:'179px'}}>login</a>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Inscription;
