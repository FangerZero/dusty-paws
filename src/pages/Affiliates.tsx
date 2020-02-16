
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import Navi from '../components/Navigation';
import Footer from '../components/Footer';

const Affiliates: React.FC = () => {
  return (
    <IonPage>
      <Navi />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol offsetLg="6">
                Take a look at our affiliates that help us! 
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol offsetLg="5">
              <a href="https://www.chewy.com/rp/10293">
                  <img alt="" src="https://external-ort2-2.xx.fbcdn.net/safe_image.php?d=AQDOzKgl-jYL40DT&w=476&h=249&url=https%3A%2F%2Fwww.chewy.com%2Fassets%2Fimg%2Flogo%2Fchewy-opengraph.20170505.png&cfs=1&upscale=1&fallback=news_d_placeholder_publisher&_nc_hash=AQAZay9fi9EYZ0HH" />
              </a>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Affiliates;
