import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import Navi from '../components/Navigation';
import Footer from '../components/Footer';
import Dusty from '../images/dusty.png';
import April from '../images/april.png';

const About: React.FC = () => {
  return (
    <IonPage>
      <Navi />
      <IonContent className="ion-padding background">
        <IonGrid>
          <IonRow>
            <IonCol offsetLg="2" sizeLg="3" offsetXs="0" sizeXs="12">
              <img src={Dusty} alt="Dusty"/>
            </IonCol>
            <IonCol offsetLg="0" sizeLg="5" offsetXs="0" sizeXs="12">
              <h1>Dusty Someone - Founder</h1> 
              <p>
                I started dusty paws because...
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol offsetLg="2" sizeLg="3" offsetXs="0" sizeXs="12">
              <img src={April} alt="Dusty"/>
            </IonCol>
            <IonCol offsetLg="0" sizeLg="5" offsetXs="0" sizeXs="12">
              <h1>April McDowell - Adoption Coordinator/Foster</h1>
              <p>I have a great peryeneese named Snowy. </p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default About;
