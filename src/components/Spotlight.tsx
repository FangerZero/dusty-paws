import { IonImg, IonGrid, IonRow, IonCol, IonDatetime, IonButton } from '@ionic/react';
import React, { useState } from 'react';

import fire from '../fire';

const Spotlight = (props: any) => {
  // Spotlight Image
  const [ img, setImg ] = useState('');
  var storage = fire.storage();
  var storageRef = storage.ref();
  var imagesRef = storageRef.child(`dogs/${props.dog}/profile.jpg`);
  imagesRef.getDownloadURL().then(url => {
      setImg(url);
    }).catch(err => {})

  // Spotlight Information
  const [ id, setId ] = useState('');
  const [ name, setName ] = useState('');
  const [ age, setAge ] = useState('');
  const [ breed, setBreed ] = useState('');
  const [ arrival, setArrival ] = useState('');
  const [ description, setDescription ] = useState('');

  
  if (id === '') {
    var db = fire.firestore();
    db.collection("dogs").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if(doc.id === props.dog) {
          setId(doc.id);
          setName(doc.data().name);
          setAge(doc.data().age);
          setBreed(doc.data().breed);
          setArrival(doc.data().arrival);
          setDescription(doc.data().description);
        }
      });
    });
  }

  return (
    <IonGrid>
        <IonRow>
            <IonCol offsetMd="2"  sizeMd="4" sizeXs="12">
              <IonImg src={img}/>
            </IonCol>
            <IonCol>
              <IonButton href={`/adopt?${id}`}>Adopt</IonButton>
              <br />
              <h3>{name}</h3>
              <br />
              {breed}
              <br />
              Arrived 
              <IonDatetime displayFormat="MMM DD YYYY" disabled value={arrival}></IonDatetime>
              <br />
              About {age} years old
              <br />
              {description}
            </IonCol>
            <IonCol sizeMd="1"  sizeXs="0"/>
        </IonRow>
    </IonGrid>
  );
}

export default Spotlight;
