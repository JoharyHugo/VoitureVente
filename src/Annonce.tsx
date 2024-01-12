// Importez les composants nécessaires d'Ionic
import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonRow, IonCol, IonLabel, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import './css/login.css';  // Importez le fichier de style CSS si nécessaire
import fondImage from './image/annoce.jpg'

const Annonce: React.FC = () => {
  const [marque, setMarque] = useState('');
  const [model, setModel] = useState('');
  const [prixVente, setPrixVente] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoutez votre logique de soumission ici
    console.log('Marque:', marque);
    console.log('Model:', model);
    console.log('Prix Vente:', prixVente);
    console.log('Photo:', photo);
    console.log('Description:', description);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
      <IonRow className="justify-content-center align-items-center" style={{ backgroundImage: `url(${fondImage})`, height: '825px' }}>
          <h1>Annonce</h1>
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
                    onChange={(e) => setPhoto(e.target.value)}
                    style={{ width: '323px' ,border: '1px solid black' }}
                />
              </div>


              <div className="mb-3">
                <IonLabel style={{ color: 'black', fontWeight: 'bold' }}>Description</IonLabel>
                <IonTextarea
                    style={{ width: '325px' ,border: '1px solid black' }}
                    value={description}
                    onIonChange={(e) => setDescription(e.detail.value!)}
                    className='form-control'
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

export default Annonce;
