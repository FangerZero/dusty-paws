import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import Navi from '../components/Navigation';
import Footer from '../components/Footer';
import Dusty from '../images/dusty.png';

const About: React.FC = () => {
  return (
    <IonPage>
      <Navi />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol offsetLg="2" sizeLg="3" offsetXs="0" sizeXs="12">
              <img src={Dusty} alt="Dusty"/>
            </IonCol>
            <IonCol offsetLg="0" sizeLg="5" offsetXs="0" sizeXs="12">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol offsetLg="2" sizeLg="3" offsetXs="0" sizeXs="12">
              <img src={Dusty} alt="Dusty"/>
            </IonCol>
            <IonCol offsetLg="0" sizeLg="5" offsetXs="0" sizeXs="12">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default About;
