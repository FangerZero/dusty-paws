import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonModal, IonButton, IonList, IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
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
    fee: "",
    adopted: false,
  });
  const [ doggies, setDogs ] = useState([]);

  ///////////////////////////////////////////////////////
  // Request Issue is when you click and open up the individual dogsss

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
          fee: doc.data().fee || '',
          adopted: doc.data().adopted,
        });
        
      });
      return dogs;
    }).then(dogs => {
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
      <IonContent className="ion-padding background">
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="1" sizeSm="0"/>
            <IonCol sizeMd="10" sizeXs="12">
              <IonGrid>
                <IonRow>
                  {doggies && 
                    doggies.map((el, index) => {
                      return (
                        <IonCol key={index} sizeLg="2" sizeMd="4" sizeXs="12">
                          <IonCard class="background" onClick={() => displayProfile(el)}>
                            <ProfileImg id={el.id}/>
                            <IonCardHeader>
                              <IonCardSubtitle>{el.age} yrs - {el.breed}</IonCardSubtitle>
                              <IonCardTitle>{el.name}{el.adopted && <h3>&nbsp;Has been Adoppted!!!</h3>}</IonCardTitle>
                            </IonCardHeader>
                            {!el.adopted && 
                              <IonCardContent>
                                {el.description.slice(0,130)}...
                              </IonCardContent>
                            }
                            {!el.adopted &&
                              <IonCardContent>
                                <IonButton expand="block" href={`/adopt?${el.id}`}>Adopt</IonButton>
                              </IonCardContent>
                            }
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
          <IonContent>
            <IonList>
              <IonItem lines="none">
                <h3>{displayData.name} </h3>
                {displayData.adopted && <h3>&nbsp;Has been Adoppted!!!</h3>}
                <IonButton slot="end" onClick={() => setShowModal(false)}>Close</IonButton>
              </IonItem>
              <IonItem lines="none">
                <DogImg id={displayData.id} />
              </IonItem>
              <IonItem lines="none">
                Arrived: {displayData.arrival}
              </IonItem>
              <IonItem lines="none">
                Fee: ${displayData.fee}
              </IonItem>
              <IonItem lines="none">
                {displayData.description}
              </IonItem>
              {!displayData.adopted && 
                <IonButton expand="block" href={`/adopt?${displayData.id}`}>Adopt</IonButton>
              }
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

/*<IonDatetime displayFormat="MMMM DD, YYYY" value={displayData.arrival} />*/

export default Dogs;
