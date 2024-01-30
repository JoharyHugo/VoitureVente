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
  IonButtons,
  IonSpinner,
} from '@ionic/react';
import './css/annonce.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Annonces: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const fetchStatutData = async (id: number) => {
    try {
      const response = await axios.get(`https://autooccasion-production.up.railway.app/api/statut/findOne/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du statut:', error);
      return null;
    }
  };

  const [annonce, setAnnonce] = useState([]);
  const [statutData, setStatutData] = useState([]);
  const [voiture, setVoiture] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchVoiture = async (id: number) => {
    try {
      const response = await axios.get(`https://autooccasion-production.up.railway.app/api/voiture/findOne/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du statut:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token === null) {
          alert('Token Expire ou veuillez vous connecter');
          return;
        }
        const response = await axios.get('https://autooccasion-production.up.railway.app/api/annonce/annonces_of_user', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        setAnnonce(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStatutDataForAnnonces = async () => {
      const statutPromises = annonce.map((annonces) => fetchStatutData(annonces.statut));
      const statutDataArray = await Promise.all(statutPromises);
      setStatutData(statutDataArray);
    };

    fetchStatutDataForAnnonces();
  }, [annonce]);

  useEffect(() => {
    const fetchVoitureForAnnonces = async () => {
      const voiturePromises = annonce.map((annonces) => fetchVoiture(annonces.idCar));
      const voitureDataArray = await Promise.all(voiturePromises);
      setVoiture(voitureDataArray);
    };

    fetchVoitureForAnnonces();
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
        {loading ? (
          <IonSpinner style={{ width: '100px', height: '100px' }} />
        ) : (
          <IonList>
            {annonce.map((annonces, index) => (
              <IonCard key={index}>
                <IonCardContent className="annonce-content">
                  <IonThumbnail slot="start">
                    <img src={annonces.image_car} alt="xxxx" />
                  </IonThumbnail>
                  <IonLabel className="annonce-details">
                    <h2>{voiture[index]?.nom_voiture || 'Veuillez patientez les donnée charge'}</h2>
                    <p>Prix: {annonces.prix}</p>
                    <p>Statut: {statutData[index]?.statut || 'Veuillez patientez les donnée charge'}</p>
                    <Link to={`/detail/${annonces.idAnnonce}`}>Voir Détail</Link>
                  </IonLabel>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Annonces;
