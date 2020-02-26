import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, useIonViewDidEnter, IonModal, IonList, IonItem, IonInput, IonButton, IonTextarea, IonAlert, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
// simport CTA from '../images/cta.png';
import fire from '../../../fire';

const AdminApplications = () => {
  const db = fire.firestore();
  const [ apps, setApps ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ showAlert1, setShowAlert1] = useState(false);
  const [ dogNames, setDogNames ] = useState([]);
  const [ displayData, setDisplayData ] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address_1: "",
    city: "",
    state: "",
    zip: "",
    dog_1: "",
    dog_2: "",
    dog_3: "",
    adults: "",
    children: "",
    pets: "",
    homeType: "",
    rent: "",
    landlord: "",
    landlordPhone: "",
    yardType: "",
    fenceType: "",
    vetName: "",
    vetOffice: "",
    vetPhone: "",
    vetLocation: "",
    dogExperience: "",
    dogAloneTime: "",
    dogAloneLocal: "",
    dogHumanLocal: "",
    dogSleepLocal: "",
    unprepared: "",
    dogSize: "",
    dogBreed: "",
    dogAge: "",
    terms: false,
    accepted: false,
    app_fee: "",
    app_fee_trans_id: "",
    adopt_fee: "",
    adopt_fee_trans_id: "",
    notes: "",
  });
  
  useIonViewDidEnter(() => {
    if (apps.length === 0) {
      loadApps();
    }
    if (dogNames.length === 0) {
      loadDogNames();
    }
  })

  function resetDispalyData() {
    setDisplayData({
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address_1: "",
      city: "",
      state: "",
      zip: "",
      dog_1: "",
      dog_2: "",
      dog_3: "",
      adults: "",
      children: "",
      pets: "",
      homeType: "",
      rent: "",
      landlord: "",
      landlordPhone: "",
      yardType: "",
      fenceType: "",
      vetName: "",
      vetOffice: "",
      vetPhone: "",
      vetLocation: "",
      dogExperience: "",
      dogAloneTime: "",
      dogAloneLocal: "",
      dogHumanLocal: "",
      dogSleepLocal: "",
      unprepared: "",
      dogSize: "",
      dogBreed: "",
      dogAge: "",
      terms: false,
      accepted: false,
      app_fee: "",
      app_fee_trans_id: "",
      adopt_fee: "",
      adopt_fee_trans_id: "",
      notes: "",
    });
  }

  function loadApps() {
    var applications = [];
    db.collection("applications").orderBy("lastName", "asc").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        applications.push({
          id: doc.id,
          firstName: doc.data().firstName, 
          lastName: doc.data().lastName, 
          email: doc.data().email,
          phone: doc.data().phone,
          address_1: doc.data().address_1,
          city: doc.data().city,
          state: doc.data().state,
          zip: doc.data().zip,
          dog_1: doc.data().dog_1,
          dog_2: doc.data().dog_2 || "",
          dog_3: doc.data().dog_3 || "",
          adults: doc.data().adults || "",
          children: doc.data().children || "",
          pets: doc.data().pets || "",
          homeType: doc.data().homeType || "",
          rent: doc.data().rent || "",
          landlord: doc.data().landlord || "",
          landlordPhone: doc.data().landlordPhone || "",
          yardType: doc.data().yardType || "",
          fenceType: doc.data().fenceType || "",
          vetName: doc.data().vetName || "",
          vetOffice: doc.data().vetOffice || "",
          vetPhone: doc.data().vetPhone || "",
          vetLocation: doc.data().vetLocation || "",
          dogExperience: doc.data().dogExperience || "",
          dogAloneTime: doc.data().dogAloneTime || "",
          dogAloneLocal: doc.data().dogAloneLocal || "",
          dogHumanLocal: doc.data().dogHumanLocal || "",
          dogSleepLocal: doc.data().dogSleepLocal || "",
          unprepared: doc.data().unprepared || "",
          dogSize: doc.data().dogSize || "",
          dogBreed: doc.data().dogBreed || "",
          dogAge: doc.data().dogAloneLocal || "",
          terms: doc.data().terms || false,
          accepted: doc.data().accepted || false,
          appFee: doc.data().appFee || "",
          appFeeTrans: doc.data().appFeeTrans || "",
          adoptFee: doc.data().adoptFee || "",
          adoptFeeTrans: doc.data().adoptFeeTrans || "",
          notes: doc.data().notes || '',
        });
        
      });
      return applications;
    }).then((applications) => {
      setApps(applications);
    });
  }

  function loadDogNames() {
    let dogs = [];
    db.collection("dogs").orderBy("name", "asc").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        dogs.push({
          id: doc.id,
          name: doc.data().name
        });
        
      });
      return dogs;
    }).then((dogs) => {
      setDogNames(dogs);
    });
  }
  
  function getDogOptions(input) {
    return (
      <IonSelect placeholder="Select a Dog" name={input} onIonChange={e => saveChange(e, input, displayData.id)}>
        {
          dogNames.map((el, index) => {
            return (<IonSelectOption value={el.id} key={index} selected={displayData[input] === el.id}>{el.name}</IonSelectOption>);
          })
        }
      </IonSelect>
    );
  }
  function displayApp(app) {
    setDisplayData(app);
    setShowModal(!showModal);
  }

  function saveChange(e, value, appId) {
    let newApps = [];
    let data = {};
    const result = apps.find( ({id}) => id === appId );
    const resInd = apps.indexOf(result);
    const docRef = db.collection("applications").doc(appId);

    data[value] = (e.target as HTMLInputElement).value;
    let newApp = {...result, ...data};

    apps.forEach((app, index) => {
      if (index !== resInd) {
        newApps.push(app);
      } else {
        docRef.set({...data}, { merge: true });
        newApps.push(newApp);
      }
    })

    setDisplayData(newApp);
    setApps(newApps);
  }

  function confirmDelete() {
    setShowAlert1(true);
  }

  function deleteApp(appId) {    
    var docRef = db.collection("applications").doc(appId);
    var applications = apps.filter(app => app.id !== appId);
    setApps(applications);
    setShowModal(false);
    docRef.delete();
  }
  
  return (
    <IonPage>
      <IonContent className="ion-padding background">
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="1" sizeSm="0"/>
            <IonCol sizeMd="10" sizeXs="12">
              <IonGrid>
                <IonRow>
                  {apps && 
                    apps.map((app, index) => {
                      return(
                        <IonCol key={index} sizeMd="2" sizeXs="12">
                          <IonCard class="background" onClick={() => displayApp(app)}>
                            <IonCardHeader>
                              <IonCardSubtitle>{app.city}, {app.state}</IonCardSubtitle>
                              <IonCardTitle>{app.lastName}, {app.firstName}</IonCardTitle>
                              <IonCardSubtitle>{app.phone}</IonCardSubtitle>
                            </IonCardHeader>
                          </IonCard>
                        </IonCol>
                      );
                    })
                  }
                  {!apps.length &&
                    <IonCol>No Apps at this time</IonCol>
                  }
                </IonRow>
              </IonGrid>
            </IonCol>
            <IonCol sizeMd="1" sizeSm="0"/>
          </IonRow>
        </IonGrid>
        
        <IonModal isOpen={showModal} backdropDismiss={false}>
          <IonContent>
            <IonList>
              <IonItem lines="none">
                <h3><IonInput name="name" value={`${displayData.lastName}, ${displayData.firstName}`} disabled /></h3>
                <IonButton slot="end" onClick={() => {setShowModal(false); resetDispalyData();}}>Close</IonButton>
              </IonItem>
              <IonItem lines="none">
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput name="address" value={`${displayData.address_1}`} disabled />
                <IonInput name="cityStateZip" value={`${displayData.city}, ${displayData.state} ${displayData.zip}`} disabled />
              </IonItem>
              <IonItem lines="none">
                <IonLabel position="stacked">Phone</IonLabel>
                <IonInput name="phone" value={`${displayData.phone}`} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Adults</IonLabel>
                <IonTextarea name="adults" value={displayData.adults || 'N/A'} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Children</IonLabel>
                <IonTextarea name="children" value={displayData.children || 'N/A'} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Pets</IonLabel>
                <IonTextarea name="pets" value={displayData.pets || 'N/A'} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Home Type</IonLabel>
                <IonInput name="homeType" value={displayData.homeType} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Rental</IonLabel>
                <IonInput name="rent" value={displayData.rent} disabled />
              </IonItem>
              {displayData.rent === 'yes' &&
                <IonItem>
                  <IonLabel position="stacked">Landlord</IonLabel>
                  <IonInput name="landlord" value={displayData.landlord} disabled />
                </IonItem>
              } {displayData.rent === 'yes' &&
                <IonItem>
                  <IonLabel position="stacked">Landlord Phone</IonLabel>
                  <IonInput name="landlordPhone" value={displayData.landlordPhone} disabled />
                </IonItem>
              }
              <IonItem>
                <IonLabel position="stacked">Yard Type</IonLabel>
                <IonInput name="yardType" value={displayData.yardType} disabled />
              </IonItem>
              {displayData.yardType === "fenced" &&
                <IonItem>
                  <IonLabel position="stacked">Fence Type</IonLabel>
                  <IonInput name="fenceType" value={displayData.fenceType} disabled />
                </IonItem>
              } 
              <IonItem>
                <IonLabel position="stacked">Vet Name</IonLabel>
                <IonInput name="vetName" value={displayData.vetName} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Vet Office</IonLabel>
                <IonInput name="vetOffice" value={displayData.vetOffice} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Vet Phone</IonLabel>
                <IonInput name="vetPhone" value={displayData.vetPhone} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Vet Address</IonLabel>
                <IonInput name="vetLocation" value={displayData.vetLocation} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Dog Experience</IonLabel>
                <IonInput name="dogExperience" value={displayData.dogExperience} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Dog Alone Time</IonLabel>
                <IonInput name="dogAloneTime" value={displayData.dogAloneTime} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Dog Location when Away</IonLabel>
                <IonInput name="dogAloneLocal" value={displayData.dogAloneLocal} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Dog Location when Home</IonLabel>
                <IonInput name="dogHumanLocal" value={displayData.dogHumanLocal} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Where the dog will sleep</IonLabel>
                <IonInput name="dogSleepLocal" value={displayData.dogSleepLocal} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Unprepared for...</IonLabel>
                <IonTextarea name="unprepared" value={displayData.unprepared} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Preferred Dog Size</IonLabel>
                <IonInput name="dogSize" value={displayData.dogSize} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Prefered Dog Breed</IonLabel>
                <IonInput name="dogBreed" value={displayData.dogBreed} disabled />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Preferred Dog Age</IonLabel>
                <IonInput name="dogAge" value={displayData.dogAge} disabled />
              </IonItem>
              <IonItem lines="none">
                <IonLabel position="stacked">Interested Dogs</IonLabel>
                {displayData.id && getDogOptions('dog_1')}
                {displayData.id && getDogOptions('dog_2')}
                {displayData.id && getDogOptions('dog_3')}
              </IonItem>
              <IonItem lines="none">
                <IonLabel position="floating">Notes</IonLabel>
                <IonTextarea
                  name="notes"
                  value={displayData.notes}
                  placeholder="Notes"
                  onBlur={e => saveChange(e, 'notes', displayData.id)}>
                </IonTextarea>
              </IonItem>
            </IonList>
            <IonButton expand="block" onClick={() => confirmDelete()}>Remove</IonButton>
          </IonContent>
        </IonModal>

        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          header={'Please Confirm'}
          message={`<strong>${displayData.lastName}, ${displayData.firstName}</strong> will be deleted? This <strong>Cannot</strong> be undone.`}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
              }
            },
            {
              text: 'Delete',
              handler: () => {
                deleteApp(displayData.id);
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminApplications;
