import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import { IonContent, IonPage, IonInput, IonButton, IonRow, IonCol, IonLabel, IonSelect, IonSelectOption, IonTextarea ,IonHeader,IonToolbar,IonTitle,IonBackButton,IonButtons} from '@ionic/react';
import './css/login.css';
import fondImage from './image/annoce.jpg'
import { useHistory } from 'react-router-dom';
const AnnonceForm: React.FC = () => {

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack(); // Utilisez cette fonction pour revenir à la page précédente
  };
  
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
        const response = await axios.get('http://localhost:80/api/voiture/all');
        setVoitures(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  const descriptionRef = useRef(description);

  useEffect(() => {
     // Update the ref value whenever the description state changes
     descriptionRef.current = description;
  }, [description]);

  const handleSubmit =(e: React.FormEvent)=>{
    e.preventDefault();
    test()
    .then(result => {
      if(result?.success) {
        console.log("DONE");
      } else {
        console.log("ERROR");
      }
    })
    .catch(error => console.log(error));
  }

  const test = async () => {
    let descriptionValue = description;
    // 1. Vérifiez si une photo a été sélectionnée
    if (!photo) {
      alert('Veuillez sélectionner une photo.');
      return;
    }

    // 2. Configurer ImgBB API
    const apiKey = '5f6a4f2dc6c3e97829db320247ec3f10';
    const apiUrl = 'https://api.imgbb.com/1/upload';

    // 3. Créer une instance de FormData pour envoyer la photo
    const formData = new FormData();
    formData.append('image', photo);

    try {
      // 4. Effectuer la requête POST vers ImgBB
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          key: apiKey,
        },
      });

      // 5. Le lien vers la photo téléchargée sur ImgBB
      const photoUrl = response.data.data.url;

      // 6. Affichez les valeurs du formulaire dans la console
      console.log("Model"+model );
      console.log("Photo "+photoUrl );
      console.log("Lieux"+lieux);
      console.log("Daty"+daty);
      console.log("Desc"+descriptionRef.current);
      console.log("Prix"+prixVente);

      
      return {success: true}
    } catch (error) {
      console.error('Erreur lors du téléchargement de la photo sur ImgBB:', error);
      return {success: false}
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
          <IonCol md="6">
            <form onSubmit={handleSubmit} style={{ marginTop: '-168px'}} className="d-flex flex-column align-items-center">
              <div className="mb-3">
                <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Matricule</IonLabel>
                <IonSelect value={model} placeholder="Sélectionnez le modèle" onIonChange={(e) => setModel(e.detail.value)} className='selecton'>
                {voitures.map((voiture) => (
                  <IonSelectOption key={voiture.idCar}  value={voiture.idCar}>
                    {voiture.matricule}
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
                  style={{ width: '323px',border: '1px solid black' }}
                />
              </div>

              <div className="mb-3">
                <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Prix Vente</IonLabel>
                <IonInput
                  type="text"
                  className="form-control"
                  value={prixVente}
                  onIonChange={(e) => setPrixVente(e.detail.value!)}
                  style={{ width: '323px',border: '1px solid black' }}
                />
              </div>

              <div className="mb-3">
                <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Lieux</IonLabel>
                <IonInput
                  type="text"
                  className="form-control"
                  value={lieux}
                  onIonChange={(e) => setLieux(e.detail.value!)}
                  style={{ width: '323px',border: '1px solid black' }}
                />
              </div>


              <div className="mb-3">
                <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Photo</IonLabel>
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                  onChange={(e) => setPhoto(e.target.files[0])} // Utilisez e.target.files[0] pour obtenir le fichier lui-même
                  style={{ width: '323px' ,border: '1px solid black' }}
                />
              </div>

              <div className="mb-3">
                <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Description</IonLabel>
                <IonTextarea
                  style={{ width: '325px', border: '1px solid black', background: `white` }}
                  value={description}
                  onIonChange={(e) => setDescription(e.detail.value!)}
                  placeholder="Leave a comment here" 
                  id="floatingTextarea2"
                />
              </div>

              <button type='submit' className="button-52 " style={{ marginTop: '25px' }}>Ajouter</button>
            </form>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default AnnonceForm;
