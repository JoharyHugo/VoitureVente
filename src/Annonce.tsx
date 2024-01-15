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
  IonBackButton,
  IonButtons
} from '@ionic/react';
import './css/annonce.css';
import { useHistory } from 'react-router-dom';

const Annonces: React.FC = () => {

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack(); // Utilisez cette fonction pour revenir à la page précédente
  };

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

  return (
    <IonPage className="custom-page-background">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* Corrected usage of IonBackButton */}
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Annonces Liste</IonTitle>
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
};

export default Annonces;
