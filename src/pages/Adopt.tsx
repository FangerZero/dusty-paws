import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem, IonButton, IonSelectOption, IonSelect, useIonViewDidEnter, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/react';
import React, { useState } from 'react';
import Navi from '../components/Navigation';
import Footer from '../components/Footer';
// Modals
import BreedInfo from '../components/modals/BreedInfo';
import AppComplete from '../components/modals/AppComplete';
import AppError from '../components/modals/AppError';
// Forms
import ContactInfo from '../components/adopt/ContactInfo';
import FamilyInfo from '../components/adopt/FamilyInfo';
import HomeInfo from '../components/adopt/HomeInfo';
import VetInfo from '../components/adopt/VetInfo';
import DogPreference from '../components/adopt/DogPreference';
import DogExperience from '../components/adopt/DogExperience';
import DogSelect from '../components/adopt/DogSelect';
import TermsOfService from '../components/adopt/TermsOfService';

import fire from '../fire';

const Adopt = (props: any) => {
  const [ doggies, setDogs ] = useState();
  const [ form, setForm] = useState({});
  const [ showModal, setShowModal] = useState(false);
  const [ validModal, setValidModal] = useState(false);
  // eslint-disable-next-line
  const [ infoModal, setInfoModal ] = useState(false);
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
        adults: "",
        children: "",
        pets: "",
        home: "",
        homeType: "",
        rent: "",
        landlord: "",
        landlordPhone: "",
        yardType: "",
        fenceType: "",
        fenceHeight: "",
        fenceMaterial: "",
        vetName: "",
        vetClinic: "",
        vetPhone: "",
        vetAddress: "",
        dogExperience: "",
        dogAloneTime: "",
        dogAloneLocal: "",
        dogHumanLocal: "",
        dogSleepLocal: "",
        dogUnprepared: [],
        dogSize: "",
        dogBreed: "",
        dogAge: "",
        terms: false,
      });
    });
  });

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

  function getFormData(value) {
    return form[value] || null;
  }

  function setTermsOfService(value) {
    var data = {}
    data[value] = !form[value];
    setForm({...form, ...data});
  }

  function updateForm(e, value) {
    var data = {}
    data[value] = (e.target as HTMLInputElement).value;
    setForm({ ...form, ...data });
  }

  function submit() {
    var isValid = true;
    var list = "";
    var required = 'firstName,lastName,phone,email,address_1,city,state,zip';
    
    Object.keys(form).map((keyName, keyIndex) => {
      if (!form[keyName].length && required.includes(keyName)) {
        isValid = false;
        list += keyIndex ? `, ${keyName}` : keyName;
      }
      return list;
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
      <IonContent className="ion-padding background">
        <IonGrid>
          <IonRow>
            <IonCol offsetMd="2">
              <IonList>
                <IonItem lines="none">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>So you want to adopt a Great Pyrenees?</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      If you've already researched the breed, go ahead and fill out the Application below, however if you haven't you might want to read this quick article.
                      <br />
                      <IonButton onClick={() => setInfoModal(true)}>Learn More</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonItem>
                <IonItem>
                  Dusty Paws has a $15.00 non-refundable application fee.
                </IonItem>
                <ContactInfo updateForm={updateForm} />
                <FamilyInfo updateForm={updateForm} />
                <HomeInfo updateForm={updateForm} getFormData={getFormData} />
                <VetInfo updateForm={updateForm} />
                <DogPreference updateForm={updateForm} />
                <DogExperience updateForm={updateForm} />
                <DogSelect doggies={doggies} getDogOptions={getDogOptions}/>
                <TermsOfService updateForm={updateForm} setTermsOfService={setTermsOfService}/>
              </IonList>
              <IonButton expand="block" onClick={submit} disabled={!getFormData('terms')}>Submit</IonButton>
            </IonCol>
            <IonCol size="2" />
          </IonRow>
        </IonGrid>
        <BreedInfo infoModal={infoModal} setInfoModal={setInfoModal} />
        <AppComplete showModal={showModal} />
        <AppError validModal={validModal} invalidList={invalidList} setValidModal={setValidModal} />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Adopt;
