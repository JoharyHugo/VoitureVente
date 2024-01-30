import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import './css/login.css';
import fondImage from './image/annoce.jpg';
import { useHistory } from 'react-router-dom';

const AnnonceForm: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [voitures, setVoitures] = useState([]);
  const [model, setModel] = useState('');
  const [daty, setDaty] = useState('');
  const [prixVente, setPrixVente] = useState('');
  const [lieux, setLieux] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://autooccasion-production.up.railway.app/api/voiture/all');
        setVoitures(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const descriptionRef = useRef(description);

  useEffect(() => {
    descriptionRef.current = description;
  }, [description]);

  const create = (data: any) => {
    console.log(JSON.stringify(data));
    const token = localStorage.getItem('token');
    fetch('https://autooccasion-production.up.railway.app/api/annonce/create_annonce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 500) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (response.status === 201) {
          return response.text();
        }

        return null;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token === null) {
      alert('Session expirée, veuillez vous reconnecter');
      return;
    }
    test()
      .then((result) => {
        if (result?.success) {
          console.log('DONE');
          history.push('/');
          return;
        } else {
          console.log('ERROR');
        }
      })
      .catch((error) => console.log(error));
  };

  const test = async () => {
    let descriptionValue = description;
    if (!photo) {
      alert('Veuillez sélectionner une photo.');
      return { success: false };
    }

    const apiKey = '5f6a4f2dc6c3e97829db320247ec3f10';
    const apiUrl = 'https://api.imgbb.com/1/upload';

    const formData = new FormData();
    formData.append('image', photo);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          key: apiKey,
        },
      });

      const photoUrl = response.data.data.url;

      console.log('Model: ' + model);
      console.log('Photo ' + photoUrl);
      console.log('Lieux: ' + lieux);
      console.log('Daty: ' + daty);
      console.log('Desc: ' + descriptionRef.current);
      console.log('Prix: ' + prixVente);

      setPhoto(photoUrl);
      create({
        idCar: model,
        date_annonce: daty,
        lieu: lieux,
        description: descriptionRef.current,
        prix: prixVente,
        image_car: photoUrl
      });
      return { success: true };
    } catch (error) {
      console.error('Erreur lors du téléchargement de la photo sur ImgBB:', error);
      return { success: false };
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Annonce form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRow className="justify-content-center align-items-center" style={{ backgroundImage: `url(${fondImage})`, height: '825px' }}>
          <h1>AnnonceForm</h1>
          {loading ? (
            <div><h3 style={{marginTop:'-330px'}} ><strong>Chargement des donnees</strong></h3></div>
          ) : (
            <IonCol md="6">
              <form onSubmit={handleSubmit} style={{ marginTop: '-168px' }} className="d-flex flex-column align-items-center">
              <div className="mb-3">
                <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Nom</IonLabel>
                <IonSelect value={model} placeholder="Sélectionnez le modèle" onIonChange={(e) => setModel(e.detail.value)} className='selecton'>
                {voitures.map((voiture) => (
                  <IonSelectOption key={voiture.idCar}  value={voiture.idCar}>
                    {voiture.nom_voiture} 
                  </IonSelectOption>
                ))}
                </IonSelect>
              </div>

                <div className="mb-3">
                  <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Daty</IonLabel>
                  <IonInput
                    type="date"
                    className="form-control"
                    value={daty}
                    onIonChange={(e) => setDaty(e.detail.value!)}
                    style={{ width: '323px', border: '1px solid black' }}
                  />
                </div>

                <div className="mb-3">
                  <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Prix Vente</IonLabel>
                  <IonInput
                    type="text"
                    className="form-control"
                    value={prixVente}
                    onIonChange={(e) => setPrixVente(e.detail.value!)}
                    style={{ width: '323px', border: '1px solid black' }}
                  />
                </div>

                <div className="mb-3">
                  <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Lieux</IonLabel>
                  <IonInput
                    type="text"
                    className="form-control"
                    value={lieux}
                    onIonChange={(e) => setLieux(e.detail.value!)}
                    style={{ width: '323px', border: '1px solid black' }}
                  />
                </div>

                <div className="mb-3">
                  <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Photo</IonLabel>
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                    onChange={(e) => setPhoto(e.target.files![0])}
                    style={{ width: '323px', border: '1px solid black' }}
                  />
                </div>

                <div className="mb-3">
                  <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Description</IonLabel>
                  <IonTextarea
                    style={{ width: '325px', border: '1px solid black', background: 'white' }}
                    value={description}
                    onIonChange={(e) => setDescription(e.detail.value!)}
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                  />
                </div>

                <button type="submit" className="button-52 " style={{ marginTop: '25px' }}>
                  Ajouter
                </button>
              </form>
            </IonCol>
          )}
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default AnnonceForm;
