import { IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import React, { useState } from 'react';

import fire from '../fire';
import Dog from '../images/default-dog.svg';

const DogImg = (props: any) => {
  const [ img0Size, setImg0Size ] = useState({sizeMd: "2", sizeXs: "4"});
  const [ img1Size, setImg1Size ] = useState({sizeMd: "2", sizeXs: "4"});
  const [ img2Size, setImg2Size ] = useState({sizeMd: "2", sizeXs: "4"});
  const [ img3Size, setImg3Size ] = useState({sizeMd: "2", sizeXs: "4"});
  const [ img4Size, setImg4Size ] = useState({sizeMd: "2", sizeXs: "4"});
  const [ img5Size, setImg5Size ] = useState({sizeMd: "2", sizeXs: "4"});
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
  
  function clickedImg(id) {
    // Create large Img tag below all images
    // When you click small img large img gets small image
    // When you click same small image again, large image hides
    // WHen you CLick large Img large image hides
    
    const imgDefault = {"sizeMd": "2", "sizeXs": "4"};
    switch(id) {
      case "img0":
        if (img0Size.sizeMd === "2") {
          setImg0Size({"sizeMd": "12", "sizeXs": "12"});
          setImg1Size(imgDefault);
          setImg2Size(imgDefault);
          setImg3Size(imgDefault);
          setImg4Size(imgDefault);
          setImg5Size(imgDefault);
        }
        else 
          setImg0Size(imgDefault);
        break;
      case "img1":
        if (img1Size.sizeMd === "2") {
          
          setImg1Size({"sizeMd": "12", "sizeXs": "12"});
          setImg0Size(imgDefault);
          setImg2Size(imgDefault);
          setImg3Size(imgDefault);
          setImg4Size(imgDefault);
          setImg5Size(imgDefault);
        }
        else 
          setImg1Size(imgDefault);
        break;
      case "img2":
        if (img2Size.sizeMd === "2") {
          setImg2Size({"sizeMd": "12", "sizeXs": "12"});
          setImg1Size(imgDefault);
          setImg0Size(imgDefault);
          setImg3Size(imgDefault);
          setImg4Size(imgDefault);
          setImg5Size(imgDefault);
        } else 
          setImg2Size(imgDefault);
        break;
      case "img3":
        if (img3Size.sizeMd === "2") {
          setImg3Size({"sizeMd": "12", "sizeXs": "12"});
          setImg1Size(imgDefault);
          setImg2Size(imgDefault);
          setImg0Size(imgDefault);
          setImg4Size(imgDefault);
          setImg5Size(imgDefault);
        } else 
          setImg3Size(imgDefault);
        break;
      case "img4":
        if (img4Size.sizeMd === "2") {
          setImg4Size({"sizeMd": "12", "sizeXs": "12"});
          setImg1Size(imgDefault);
          setImg2Size(imgDefault);
          setImg3Size(imgDefault);
          setImg0Size(imgDefault);
          setImg5Size(imgDefault);
        } else 
          setImg4Size(imgDefault);
        break;
      case "img5":
        if (img5Size.sizeMd === "2") {
          setImg5Size({"sizeMd": "12", "sizeXs": "12"});
          setImg1Size(imgDefault);
          setImg2Size(imgDefault);
          setImg3Size(imgDefault);
          setImg4Size(imgDefault);
          setImg0Size(imgDefault);
        } else 
          setImg5Size(imgDefault);
        break;
    }
  }
  
  function displayImg() {
      if (img0 === "") {
        setImg0(Dog);
      }

      return (
        <IonRow>
            <IonCol sizeMd={img0Size.sizeMd} sizeXs={img0Size.sizeXs}>
              <IonImg src={img0 || Dog} onClick={() => clickedImg("img0")}></IonImg>
            </IonCol>
            {img1 && <IonCol sizeMd={img1Size.sizeMd} sizeXs={img1Size.sizeXs}>
              <IonImg src={img1 || Dog} onClick={() => clickedImg("img1")}></IonImg>
            </IonCol>}
            {img2 && <IonCol sizeMd={img2Size.sizeMd} sizeXs={img2Size.sizeXs}>
              <IonImg src={img2 || Dog} onClick={() => clickedImg("img2")}></IonImg>
            </IonCol>}
            {img3 && <IonCol sizeMd={img3Size.sizeMd} sizeXs={img3Size.sizeXs}>
              <IonImg src={img3 || Dog} onClick={() => clickedImg("img3")}></IonImg>
            </IonCol>}
            {img4 && <IonCol sizeMd={img4Size.sizeMd} sizeXs={img4Size.sizeXs}>
              <IonImg src={img4 || Dog} onClick={() => clickedImg("img4")}></IonImg>
            </IonCol>}
            {img5 && <IonCol sizeMd={img5Size.sizeMd} sizeXs={img5Size.sizeXs}>
              <IonImg src={img5 || Dog} onClick={() => clickedImg("img5")}></IonImg>
            </IonCol>}
        </IonRow>
      );
  }

  function noImages() {
    return <IonRow><IonCol>Images Coming Soon</IonCol></IonRow>;
  }

  return (
    <IonGrid>
      {img0.length ? displayImg() : noImages()}
    </IonGrid>
  );
}
export default DogImg;