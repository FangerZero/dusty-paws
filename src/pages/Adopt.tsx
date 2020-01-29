import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem, IonInput, IonButton, IonSelectOption, IonSelect, useIonViewDidEnter, IonModal, IonRouterLink } from '@ionic/react';
import React, { useState } from 'react';
import Navi from '../components/Navigation';
import Footer from '../components/Footer';

import fire from '../fire';

const Adopt = (props: any) => {
  const [ doggies, setDogs ] = useState();
  const [ form, setForm] = useState({});
  const [ showModal, setShowModal] = useState(false);
  const [ validModal, setValidModal] = useState(false);
  const [ adopting, setAdopting ] = useState("");
  const [ invalidList, setInvalidList ] = useState("");
  const db = fire.firestore();
  
  useIonViewDidEnter(() => {
    if (props.location.search.slice(1).length > 0) {
      setAdopting(props.location.search.slice(1));
    }

    var dogs = [];
    db.collection("dogs").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        
        dogs.push({
          id: doc.id,
          name: doc.data().name, 
        });
        
      });
      return dogs;
    }).then((dogs) => {
      setDogs(dogs);
    }).then(() => {
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address_1: "",
        city: "",
        state: "",
        zip: "",
        dog_1: props.location.search.slice(1) || "",
        dog_2: "",
        dog_3: "",
      });
    });
  });
  /*
    accepted: false,
    app_fee: "",
    app_fee_trans_id: "",
    adopt_fee: "",
    adopt_fee_trans_id: "",
    notes: "",
  */

  function getDogOptions(dogs, input) {
    return (
      <IonSelect placeholder="Select a Dog" name={input} onIonChange={e => updateForm(e, input) }>
        {
          dogs.map((el, index) => {
            return (<IonSelectOption value={el.id} key={index} selected={adopting === el.id && input === 'dog_1'}>{el.name}</IonSelectOption>);
          })
        }
      </IonSelect>
    );
  }

  function updateForm(e, value) {
    var data = {}
    data[value] = (e.target as HTMLInputElement).value;
    setForm({ ...form, ...data });
  }

  function submit() {
    var isValid = true;
    var list = "";
    
    Object.keys(form).map(function(keyName, keyIndex) {
      if (form[keyName] === "" && !keyName.includes("dog")) {
        isValid = false;
        if(keyIndex) {
          list+=', '+keyName;
        } else {
          list = keyName;
        }
      }
      return !keyName.includes("dog") ? keyName : null;
    });

    if (list.length !== 0) {
      setValidModal(true);
      setInvalidList(list);
    }

    if (isValid) {
      setShowModal(true);
      var newApp = db.collection('applications').doc();
      newApp.set(form);
    }
  }

  return (
    <IonPage>
      <Navi />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol offsetMd="2">
              <IonList>
                <IonItem>
                  Dusty Paws has a $15.00 non-refundable application fee.
                </IonItem>
                <IonItem>
                  <IonInput type="text" placeholder="First Name" name="firstName" required onIonBlur={e => updateForm(e, 'firstName') }></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput type="text" placeholder="Last Name" name="lastName" required onIonBlur={e => updateForm(e, 'lastName') }></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput type="tel" placeholder="Phone #" name="phone" required onIonBlur={e => updateForm(e, 'phone') }></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput type="email" placeholder="Email" name="email" required onIonBlur={e => updateForm(e, 'email') }></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput type="text" placeholder="Address" name="address_1" onIonBlur={e => updateForm(e, 'address_1') }></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput type="text" placeholder="City" name="city" onIonBlur={e => updateForm(e, 'city') }></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput type="text" max="2" placeholder="State" name="state" onIonBlur={e => updateForm(e, 'state') }></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput type="text" max="5" placeholder="Zip" name="zip" onIonBlur={e => updateForm(e, 'zip') }></IonInput>
                </IonItem>
                <IonItem lines="none">
                  Select at least one dog you are interested in
                </IonItem>
                <IonItem lines="none">
                    { doggies && getDogOptions(doggies, 'dog_1') }
                </IonItem>
                <IonItem lines="none">
                    { doggies && getDogOptions(doggies, 'dog_2') }
                </IonItem>
                <IonItem>
                    { doggies && getDogOptions(doggies, 'dog_3') }
                </IonItem>
              </IonList>
              <IonButton expand="block" onClick={submit}>Submit</IonButton>
            </IonCol>
            <IonCol size="2" />
          </IonRow>
        </IonGrid>
        <IonModal isOpen={showModal} backdropDismiss={false}>
          <IonGrid>
            <IonRow>
              <IonCol offset="2" size="5" >
                <p>
                  Your Application has been received, please give 3 business days for us to get back to you.
                </p>
                <IonRouterLink href="/home">Done</IonRouterLink>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonModal>
        <IonModal isOpen={validModal}>
          <IonGrid>
            <IonRow>
              <IonCol offset="2" size="9" >
                <p>
                  Please ensure your personal information is filled out so we can contact you. 
                </p>
                <p>
                  Mising Values: {invalidList}
                </p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol offset="5" >
                <IonButton onClick={() => setValidModal(false)}>Close</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonModal>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Adopt;
