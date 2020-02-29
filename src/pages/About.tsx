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
              <p>Everyone asks how I decided to help run a rescue? Well I will tell you the truth it wasn't easy. It starts with Vash, the Doberman, he's so old you have to dust him off when you walk by.  Knowing his time is close, we didn't want our pyr Snowy Girl to be on guard alone so we decided we would foster until the right dog came along. The problem was that there were plenty of right dogs but no right rescues. No one wanted me. My yard wasn't fenced and despite all my resources and experience “no fence no dog”. On the day I chose to give up on being a foster for Pyrenees, Facebook said “you may be interested in this site” and so I clicked on it. God blessed the broken road that led me straight to the Safe Haven and the rest is history. I started out wanting to foster, and now I get to be so much more, new friends, new adventures, God knew exactly where to send me. </p>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default About;
