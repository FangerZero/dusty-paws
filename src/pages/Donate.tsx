import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import Navi from '../components/Navigation';
import Footer from '../components/Footer';

const Donate: React.FC = () => {
  return (
    <IonPage>
      <Navi />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol offset="3">
              This page is currently a work in progress to make it easier to help us provide for these fur babies until they make it to their forever home.
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol offsetLg="5" offsetMd="4" offsetXs="1">
              <a href="https://www.gofundme.com/f/b54npk-save-the-puppies?utm_source=facebook&utm_medium=social&utm_campaign=p_cp+share-sheet" target="_blank" rel="noopener noreferrer">Our Go Fund Me!</a>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Donate;
