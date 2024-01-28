// src/pages/DetailAnnonce.tsx
import React from 'react';
import { IonContent, IonPage, IonImg, IonLabel, IonSelect, IonSelectOption, IonButton,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle } from '@ionic/react';
import './css/DetailAnnonce.css';

const DetailAnnonce: React.FC = () => {
  const annonce = {
    imageUrl: 'https://media.gqmagazine.fr/photos/653a6785b405923c6a3fe4ef/16:9/w_1920,c_limit/SSC%20Tuatara.jpg',
    nom: 'Nom ',
    prix: '100€',
    statut: 'En cours',
    description: 'Description',
  };

  return (
    <IonPage className="annonce-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Detail Annonce</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg src={annonce.imageUrl} className="annonce-image" />

        <div className="horizontal-line"></div>

        <div className="detail-item">Nom: {annonce.nom}</div>
        <div className="horizontal-line"></div>

        <div className="detail-item">Prix: {annonce.prix}</div>
        <div className="horizontal-line"></div>

        <div className="detail-item">Description: {annonce.description}</div>
        <div className="horizontal-line"></div>
        
        <IonLabel className="detail-item" style={{ marginLeft: '158px' }}>Changer Statut:</IonLabel>
        <IonSelect  placeholder="Sélectionner le statut" className="detail-item">
          <IonSelectOption value="En cours">En cours</IonSelectOption>
          <IonSelectOption value="Terminé">Terminé</IonSelectOption>
          <IonSelectOption value="Annulé">Annulé</IonSelectOption>
        </IonSelect>
        

        <IonButton expand="full" onClick={() => console.log("Statut modifié")}>Valider</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DetailAnnonce;
