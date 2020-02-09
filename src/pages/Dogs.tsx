import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonDatetime, IonModal, IonButton, IonList, IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import React, { useState } from 'react';
import Navi from '../components/Navigation';
import Footer from '../components/Footer';
import ProfileImg from '../components/ProfileImg';

import fire from '../fire';
import DogImg from '../components/DogImg';

const Dogs = () => {
  // Dog Info
  const [ showModal, setShowModal ] = useState(false);
  const [ displayData, setDisplayData ] = useState({
    id: "",
    name: "",
    age: "",
    breed: "",
    arrival: "",
    description: "",
  });
  const [ doggies, setDogs ] = useState([]);

  if (doggies.length === 0) {
    const db = fire.firestore();
    var dogs = [];
    db.collection("dogs").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        dogs.push({
          id: doc.id,
          name: doc.data().name, 
          age: doc.data().age || '',
          breed: doc.data().breed || '',
          arrival: doc.data().arrival,
          description: doc.data().description || '',
        });
        
      });
      return dogs;
    }).then((dogs) => {
      setDogs(dogs);
    });
  }

  function displayProfile(data) {
    setShowModal(!showModal);
    setDisplayData({...data});
  }

  return (
    <IonPage>
      <Navi />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="1" sizeSm="0"/>
            <IonCol sizeMd="10" sizeXs="12">
              <IonGrid>
                <IonRow>
                  {doggies && 
                    doggies.map((el, index) => {
                      return (
                        <IonCol key={index} sizeMd="2" sizeXs="12">
                          <IonCard onClick={() => displayProfile(el)}>
                            <ProfileImg id={el.id}/>
                            <IonCardHeader>
                              <IonCardSubtitle>{el.age} yrs - {el.breed}</IonCardSubtitle>
                              <IonCardTitle>{el.name}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                              {el.description.slice(0,130)}...
                            </IonCardContent>
                            <IonCardContent>
                            <IonButton expand="block" href={`/adopt?${el.id}`}>Adopt</IonButton>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      );
                    })
                  }
                  {!doggies.length &&
                    <IonCol>No Dogs at this time</IonCol>
                  }
                  </IonRow>
                </IonGrid>
              </IonCol>
            <IonCol sizeMd="1" sizeSm="0"/>
          </IonRow>
        </IonGrid>
        <Footer />
        <IonModal isOpen={showModal} backdropDismiss={false}>
          <IonList>
            <IonItem lines="none">
              <h3>{displayData.name}</h3>
              <IonButton slot="end" onClick={() => setShowModal(false)}>Close</IonButton>
            </IonItem>
            <IonItem lines="none">
              <DogImg />
            </IonItem>
            <IonItem lines="none">
              Arrived:<IonDatetime displayFormat="MMMM DD, YYYY" disabled value={displayData.arrival} />
            </IonItem>
            <IonItem lines="none">
              {displayData.description}
            </IonItem>
            <IonButton expand="block" href={`/adopt?${displayData.id}`}>Adopt</IonButton>
          </IonList>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Dogs;
