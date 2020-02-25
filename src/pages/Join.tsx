import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import React from 'react';
import Navi from '../components/Navigation';
import Footer from '../components/Footer';

const Join: React.FC = () => {
  return (
    <IonPage>
      <Navi />
      <IonContent className="ion-padding background">
        <IonGrid>
          <IonRow>
            <IonCol offsetLg="4">
              This page is not yet ready, however if you'd like to help please consider donating to the cause. 
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol offsetLg="5" offsetXs="1">
              <IonButton href="https://www.gofundme.com/f/b54npk-save-the-puppies?utm_source=facebook&utm_medium=social&utm_campaign=p_cp+share-sheet" target="_blank" rel="noopener noreferrer">Our Go Fund Me!</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Join;
