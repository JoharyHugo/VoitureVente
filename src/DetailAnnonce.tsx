import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonPage,
  IonImg,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle
} from '@ionic/react';
import './css/DetailAnnonce.css';
import { useParams } from 'react-router-dom';

const DetailAnnonce: React.FC = () => {
  const history = useHistory();
  const { idannonce } = useParams<{ idannonce: string }>();
  const [annonces, setAnnonces] = useState<any>({});
  const [statutData, setStatutData] = useState<any>({});
  const [voiture, setVoiture] = useState<any>({});
  const [tabStatus, setTabStatus] = useState([]);
  const [selectedStatut, setSelectedStatut] = useState("");
  const [consoleMessages, setConsoleMessages] = useState<string[]>([]);

  const logToConsole = (message: string) => {
    setConsoleMessages((prevMessages) => [...prevMessages, message]);
  };

  const fetchVoiture = async (id: number) => {
    try {
      const response = await axios.get(`https://autooccasion-production.up.railway.app/api/voiture/findOne/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la voiture:', error);
      logToConsole('Erreur lors de la récupération des données de la voiture: ' + error.message);
      return null;
    }
  };

  const getStatus = async () => {
    try {
      const response = await axios.get(`https://autooccasion-production.up.railway.app/api/statut/all`);
      console.log(response.data);
      setTabStatus(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du statut:', error);
      logToConsole('Erreur lors de la récupération des données du statut: ' + error.message);
      return null;
    }
  };

  const formatDate = (dateString: string) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('fr-FR', options);
    return formattedDate;
  };

  const fetchStatutData = async (id: number) => {
    try {
      const response = await axios.get(`https://autooccasion-production.up.railway.app/api/statut/findOne/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du statut:', error);
      logToConsole('Erreur lors de la récupération des données du statut: ' + error.message);
      return null;
    }
  };

  const handleStatutModification = () => {
    const token = localStorage.getItem('token');

    fetch(`https://autooccasion-production.up.railway.app/api/annonce/update_statut/${idannonce}/${selectedStatut}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la modification du statut');
      }
      window.location.href = '/';
      console.log("Statut modifié avec succès");
    })
    .catch(error => {
      console.error('Erreur lors de la modification du statut:', error);
      logToConsole('Erreur lors de la modification du statut: ' + error.message);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(idannonce);

        if (token === null) {
          alert("Token Expire ou veuillez vous connecter");
          history.push("/login");
          return;
        }

        const response = await axios.get(`https://autooccasion-production.up.railway.app/api/annonce/one_annonce_user/${idannonce}`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        setAnnonces(response.data);
        getStatus();
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        logToConsole('Erreur lors de la récupération des données: ' + error.message);
      }
    };

    fetchData();
  }, [history, idannonce]);

  useEffect(() => {
    const fetchStatutDataForAnnonces = async () => {
      const statutData = await fetchStatutData(annonces.statut);
      setStatutData(statutData);
    };

    fetchStatutDataForAnnonces();
  }, [annonces]);

  useEffect(() => {
    const fetchVoitureForAnnonces = async () => {
      const voitureData = await fetchVoiture(annonces.idCar);
      setVoiture(voitureData);
    };

    fetchVoitureForAnnonces();
  }, [annonces]);

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
        {Object.keys(annonces).length === 0 ? (
          <div>Loading pendant Quelque instant ...</div>
        ) : (
          <React.Fragment>
            <IonImg src={annonces.image_car} className="annonce-image" />

            <div className="horizontal-line"></div>

            <div className="detail-item">Nom: {voiture?.nom_voiture || 'Chargement'}</div>
            <div className="horizontal-line"></div>

            <div className="detail-item">Prix: {annonces.prix}</div>
            <div className="horizontal-line"></div>

            <div className="detail-item">Statut: {statutData?.statut || 'Veuillez patienter les données chargées'}</div>
            <div className="horizontal-line"></div>

            <div className="detail-item">Lieux: {annonces.lieu}</div>
            <div className="horizontal-line"></div>

            <div className="detail-item">Date: {formatDate(annonces.date_annonce)}</div>
            <div className="horizontal-line"></div>

            <div className="detail-item">Validation: {annonces.validation_annonce ? 'Oui' : 'Non'}</div>
            <div className="horizontal-line"></div>

            <div className="detail-item">Description: {annonces.description}</div>
            <div className="horizontal-line"></div>
          </React.Fragment>
        )}
        <IonLabel className="detail-item" style={{ marginLeft: '158px' }}>Changer Statut:</IonLabel>
        <IonSelect
          placeholder="Sélectionner le statut"
          className="detail-item"
          value={selectedStatut}
          onIonChange={(e) => setSelectedStatut(e.detail.value)}
        >
          {tabStatus.map((statut, index) => (
            <IonSelectOption key={index} value={statut.idstatut}>
              {statut.statut}
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonButton expand="full" onClick={handleStatutModification}>Valider</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DetailAnnonce;
