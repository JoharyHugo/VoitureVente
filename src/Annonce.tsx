import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    history.goBack();
  };

  const fetchStatutData = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:80/api/statut/findOne/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du statut:', error);
      return null;
    }
  };

  const [annonce, setAnnonce] = useState([]);
  const [statutData, setStatutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        const response = await axios.get('http://localhost:80/api/annonce/annonces_of_user', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
  
        setAnnonce(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchStatutDataForAnnonces = async () => {
      const statutPromises = annonce.map(annonces => fetchStatutData(annonces.statut));
      const statutDataArray = await Promise.all(statutPromises);
      setStatutData(statutDataArray);
    };

    fetchStatutDataForAnnonces();
  }, [annonce]);

  return (
    <IonPage className="custom-page-background">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Annonces Liste</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {annonce.map((annonces, index) => (
            <IonCard key={index}>
              <IonCardContent className="annonce-content">
                <IonThumbnail slot="start">
                  <img src={annonces.image_car} alt="xxxx" />
                </IonThumbnail>
                <IonLabel className="annonce-details">
                  <h2>{annonces.idUser}</h2>
                  <p>Prix: {annonces.prix}</p>
                  <p>Statut: {statutData[index]?.statut || 'Statut non disponible'}</p>
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
