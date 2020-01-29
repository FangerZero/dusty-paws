import { IonContent, IonPage, IonImg } from '@ionic/react';
import React, { useState } from 'react';
import Navi from '../components/Navigation';
import Footer from '../components/Footer';
import Spotlight from '../components/Spotlight';

import Top from '../images/top.png';
// simport CTA from '../images/cta.png';
import fire from '../fire';

const Home = () => {
  // Spotlight Information
 // const [ topImg, setTopImg ] = useState('');
 // const [ bottomImg, setBottomImg ] = useState('');
  const [ spotlight, setSpotlight ] = useState('');

  var db = fire.firestore();
  db.collection("website").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if(doc.id === 'eXmRoAtjYS4VpvKdQUop') {
      //  setTopImg(doc.data().top_img);
      //  setBottomImg(doc.data().bottom_img);
        setSpotlight(doc.data().spotlight);
      }
    });
  });
  
  return (
    <IonPage>
      <Navi />
      <IonContent>
        <IonImg src={Top} />
        <Spotlight dog={spotlight}/>
        
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
