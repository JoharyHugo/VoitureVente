import React, { useState } from 'react';
import axios from 'axios';
import { IonContent, IonPage, IonInput, IonButton, IonRow, IonCol, IonLabel, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import './css/login.css';
import fondImage from './image/annoce.jpg'

const AnnonceForm: React.FC = () => {
  const [marque, setMarque] = useState('');
  const [model, setModel] = useState('');
  const [prixVente, setPrixVente] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      console.log('Marque:', marque);
      console.log('Model:', model);
      console.log('Prix Vente:', prixVente);
      console.log('Photo:', photoUrl); // Utilisez le lien ImgBB ici
      console.log('Description:', description);
    } catch (error) {
      console.error('Erreur lors du téléchargement de la photo sur ImgBB:', error);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonRow className="justify-content-center align-items-center" style={{ backgroundImage: `url(${fondImage})`, height: '825px' }}>
          <h1>AnnonceForm</h1>
          <IonCol md="6">
            <form onSubmit={handleSubmit} style={{ marginTop: '-168px'}} className="d-flex flex-column align-items-center">
              <div className="mb-3">
                <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Marque</IonLabel>
                <IonSelect value={marque} placeholder="Sélectionnez la marque" onIonChange={(e) => setMarque(e.detail.value)} className='form-select selecton' >
                  <IonSelectOption value="marque1">Marque 1</IonSelectOption>
                  <IonSelectOption value="marque2">Marque 2</IonSelectOption>
                  {/* Ajoutez d'autres options au besoin */}
                </IonSelect>
              </div>

              <div className="mb-3">
                <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Modèle</IonLabel>
                <IonSelect value={model} placeholder="Sélectionnez le modèle" onIonChange={(e) => setModel(e.detail.value)} className='form-select selecton'>
                  <IonSelectOption value="modele1">Modèle 1</IonSelectOption>
                  <IonSelectOption value="modele2">Modèle 2</IonSelectOption>
                  {/* Ajoutez d'autres options au besoin */}
                </IonSelect>
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
