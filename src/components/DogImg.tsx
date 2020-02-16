import { IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import React, { useState } from 'react';

import fire from '../fire';
import Dog from '../images/default-dog.svg';

const DogImg = (props: any) => {
  const [ imgs, setImgs ] = useState([]);
  const [ render, setRender] = useState(false);
  
  if (!imgs.length) {
    loadImages();
  }

  function loadImages() {
    const storageRef = fire.storage().ref();
    const imagesRef = storageRef.child(`dogs/${props.id}/`);

    imagesRef.listAll().then(res => {
      res.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(url => setImgs([...imgs, url]))
      })
    }).then(() => setRender(true)).catch(function(error) {
      console.log('error: ', error);
    });
  }
  
  function displayImg() {
    console.log('0: ', imgs[0]);
    console.log('1: ', imgs[1]);
      return (
        <IonRow>
          {imgs.map((el, i) => 
            <IonCol key={i} sizeMd="2" sizeXs="4">
              <IonImg src={el || Dog} ></IonImg>
            </IonCol>
          )}
        </IonRow>
      );
  }

  function noImages() {
    return <IonRow><IonCol>Images Coming Soon</IonCol></IonRow>;
  }

  return (
    <IonGrid>
      {render && displayImg()}
      {!imgs.length && noImages()}
    </IonGrid>
  );
}
export default DogImg;