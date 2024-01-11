import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonRow, IonCol, IonLabel, IonCheckbox } from '@ionic/react';
import 'bootstrap/dist/css/bootstrap.css';
import { IonIcon } from '@ionic/react';
import { person } from 'ionicons/icons';
import './css/login.css';
const Inscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoutez votre logique de soumission ici
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <IonPage className="reset-styles">
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
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  style={{ width: '323px' }}
                />
              </div>
              <div className="mb-3">
                <IonLabel style={{color:'black',fontWeight: 'bold'}}>Prenom</IonLabel>
                <IonInput
                  type="email"
                  className="form-control champ"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
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
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
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

export default Inscription;
