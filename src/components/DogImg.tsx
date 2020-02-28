import { IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import React, { useState } from 'react';

import fire from '../fire';
import Dog from '../images/default-dog.svg';

const DogImg = (props: any) => {
  const [ imgLg, setImgLg ] = useState('');
  const [ img0, setImg0 ] = useState('');
  const [ img1, setImg1 ] = useState('');
  const [ img2, setImg2 ] = useState('');
  const [ img3, setImg3 ] = useState('');
  const [ img4, setImg4 ] = useState('');
  const [ img5, setImg5 ] = useState('');
  // const [ render, setRender] = useState(false);
  
  if (img0 === "") {
    loadImages();
  }

  
  function loadImages() {
    const storageRef = fire.storage().ref();
    const imagesRef = storageRef.child(`dogs/${props.id}/`);

    imagesRef.listAll().then(res => {
      res.items.map((itemRef, i) => {
        itemRef.getDownloadURL().then(url => {
          if (i === 0) {
            setImg0(url);
          } else if (i === 1) {
            setImg1(url);
          } else if (i === 2) {
            setImg2(url);
          } else if (i === 3) {
            setImg3(url);
          } else if (i === 4) {
            setImg4(url);
          } else if (i === 5) {
            setImg5(url);
          }
        })
        return itemRef;
      })
    })
    
  }
  
  function clickedImg(img = '') {
    if (imgLg !== '')
      setImgLg('');
    else 
      setImgLg(img);
  }
  
  function displayImg() {
      if (img0 === "") {
        setImg0(Dog);
      }

      return (
        <IonRow>
            <IonCol sizeMd="2" sizeXs="4">
              <IonImg src={img0 || Dog} onClick={() => clickedImg(img0)}></IonImg>
            </IonCol>
            {img1 && <IonCol sizeMd="2" sizeXs="4">
              <IonImg src={img1 || Dog} onClick={() => clickedImg(img1)}></IonImg>
            </IonCol>}
            {img2 && <IonCol sizeMd="2" sizeXs="4">
              <IonImg src={img2 || Dog} onClick={() => clickedImg(img2)}></IonImg>
            </IonCol>}
            {img3 && <IonCol sizeMd="2" sizeXs="4">
              <IonImg src={img3 || Dog} onClick={() => clickedImg(img3)}></IonImg>
            </IonCol>}
            {img4 && <IonCol sizeMd="2" sizeXs="4">
              <IonImg src={img4 || Dog} onClick={() => clickedImg(img4)}></IonImg>
            </IonCol>}
            {img5 && <IonCol sizeMd="2" sizeXs="4">
              <IonImg src={img5 || Dog} onClick={() => clickedImg(img5)}></IonImg>
            </IonCol>}
        </IonRow>
      );
  }

  function displayImgLg() {
    return <IonImg src={imgLg} onClick={() => clickedImg()} />
  }

  function noImages() {
    return <IonRow><IonCol>Images Coming Soon</IonCol></IonRow>;
  }

  return (
    <IonGrid>
      {img0.length ? displayImg() : noImages()}
      {imgLg ? displayImgLg() : ""}
    </IonGrid>
  );
}
export default DogImg;