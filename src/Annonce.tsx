// src/pages/Annonces.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonCard,
  IonCardContent,
  IonThumbnail,
  IonLabel,
} from '@ionic/react';
import './css/annonce.css';

const Annonces: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Annonces</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        {annonces.map((annonce, index) => (
          <IonCard key={index}>
            <IonCardContent className="annonce-content">
              <IonThumbnail slot="start">
                <img src={annonce.photoUrl} alt={annonce.nom} />
              </IonThumbnail>
              <IonLabel className="annonce-details">
                <h2>{annonce.nom}</h2>
                <p>Prix: {annonce.prix}</p>
                <p>Statut: {annonce.statut}</p>
              </IonLabel>
            </IonCardContent>
          </IonCard>
        ))}
      </IonList>
    </IonContent>
  </IonPage>
);

const annonces = [
  {
    nom: 'Annonce 1',
    prix: '$100',
    statut: 'En cours',
    photoUrl: 'https://picsum.photos/id/237/200/300',
  },
  {
    nom: 'Annonce 2',
    prix: '$150',
    statut: 'Terminée',
    photoUrl: 'https://picsum.photos/seed/picsum/200/300',
  }
  // Ajoutez d'autres annonces ici
];

export default Annonces;
