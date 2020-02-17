import { IonContent, IonPage, IonGrid, IonRow, IonCol, useIonViewDidEnter, IonDatetime, IonModal, IonButton, IonList, IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonAlert, IonLabel } from '@ionic/react';
import React, { useState } from 'react';

import fire from '../../../fire';

const AdminDogs = () => {
  // Dog Info
  const db = fire.firestore();
  const storageRef = fire.storage().ref();
  const [ showModal, setShowModal ] = useState(false);
  const [ showNewDog, setShowNewDog ] = useState(false);
  const [ displayData, setDisplayData ] = useState({
    id: "",
    name: "",
    age: "",
    breed: "",
    arrival: "",
    description: "",
  });
  const [ displayImgs, setDisplayImgs ] = useState([]);
  // const [ profileImg, setProfileImg ] = useState([]);
  const [ doggies, setDogs ] = useState([]);
  const [ edit, setEdit ] = useState(false);
  const [ editWord, setEditWord ] = useState('Edit');
  const [ newDog, setNewDog ] = useState('');
  const [ showAlert1, setShowAlert1] = useState(false);

  useIonViewDidEnter(() => {
    if (doggies.length === 0) {
      loadDogs();
    }
  })

  function imgSelectedHandler(event) {
    const megabyte = 5048576;
    const files = event.target.files;

    if (files.length <= 5) {
      Array.prototype.forEach.call(files, file => {
        
        if (file.size < megabyte) {
          if (event.target.id === 'profile-file') {
            storageRef.child('dogs/'+displayData.id+'/profile.jpg').delete().then(function() {
              storageRef.child('dogs/'+displayData.id+'/profile.jpg').put(file);
            }).catch(function(error) {
              if (error.code_ === 'storage/object-not-found') {
                storageRef.child('dogs/'+displayData.id+'/profile.jpg').put(file);
              } else {
                console.log('error: ', error);
              }
            });
          } else {
            let genId = Math.random() * 100000;
            storageRef.child('dogs/'+displayData.id+'/'+genId+'.jpg').put(file);
          }
        }
      });
    }
  }

  function loadDogs() {
    var dogs = [];
    db.collection("dogs").orderBy("name", "asc").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        dogs.push({
          id: doc.id,
          name: doc.data().name, 
          age: doc.data().age,
          breed: doc.data().breed,
          arrival: doc.data().arrival,
          description: doc.data().description,
          fee: doc.data().fee,
          pending: doc.data().pending,
          adopted: doc.data().adopted,
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

  function changeName(e) {
    setNewDog(e.target.value);
  }

  function createDog() {    
    var docRef = db.collection("dogs").doc();
    docRef.set({name: newDog});
    loadDogs();
    setNewDog('');
    setShowNewDog(false);
  }

  function saveChange(e, value, dogId) {
    var newDogs = [];
    var data = {}
    const result = doggies.find( ({id}) => id === dogId );
    const resInd = doggies.indexOf(result);
    
    var docRef = db.collection("dogs").doc(dogId);

    data[value] = (e.target as HTMLInputElement).value;
    var newDog = {...result, ...data}

    doggies.forEach((dog, index) => {
      if (index !== resInd) {
        newDogs.push(dog);
      } else {
        docRef.set({...data}, { merge: true });
        newDogs.push(newDog);
      }
    })    

    setDisplayData(newDog);
    setDogs(newDogs);
  }
  
  function resetDisplayData() {
    setDisplayData({
      id: "",
      name: "",
      age: "",
      breed: "",
      arrival: "",
      description: "",
    });
  }

  function confirmDelete() {
    setShowAlert1(true);
  }

  function deleteDog(dogId) {
    var docRef = db.collection("dogs").doc(dogId);
    var dogs = doggies.filter(dog => dog.id !== dogId);
    setDogs(dogs);
    setShowModal(false);
    docRef.delete();
  }

  function getAllImages() {

    //console.log('listthem', storageRef.child('dogs/RmJo5zgciFIPJ0odlD6p').list());
    // console.log('listthem', storageRef.child('dogs/uxPbpmSD7tt2NH4uF1in').list());
    
    let test = storageRef.child('dogs/' + displayData.id);
    // storageRef.put
    console.log(test.list());
   //  test.put();
    test.list().then(results => {
      let imgs = [];
      results.items.map(item => {
        return item.getDownloadURL().then(url => {
          imgs.push(url);
        }).catch(err => { console.log(err) });
      })
      return imgs;
    }).then(imgs => {
      setDisplayImgs(imgs);
    });

    console.log(displayImgs);
    //setProfileImg();
    //console.log(profileImg);
  }

  return (
    <IonPage>
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
                            <IonCardHeader>
                              <IonCardSubtitle>{el.age} yrs - {el.breed}</IonCardSubtitle>
                              <IonCardTitle>{el.name}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                              {el.description && el.description.slice(0,130)}...
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      );
                    })
                  }
                  {!doggies.length &&
                    <IonCol>No Dogs at this time</IonCol>
                  }
                  <IonCol sizeMd="2" sizeXs="12">
                    <IonCard onClick={() => setShowNewDog(true)}>
                      <IonCardHeader>
                        <IonCardTitle>Add a Dog</IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
            <IonCol sizeMd="1" sizeSm="0"/>
          </IonRow>
        </IonGrid>
        
        <IonModal isOpen={showModal} backdropDismiss={false}>
          <IonList>
            <IonItem lines="none">
              <h3><IonInput name="name" placeholder="Dog Name" value={displayData.name} disabled={!edit} onBlur={e => saveChange(e, 'name', displayData.id)}></IonInput></h3>
              <IonButton slot="end" onClick={() => {setEdit(!edit); setEditWord(edit ? 'Edit' : 'Done')}}>{editWord}</IonButton>
              <IonButton slot="end" onClick={() => {setEdit(false); setEditWord('Edit'); setShowModal(false); resetDisplayData();}}>Close</IonButton>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="stacked">Date Arrived</IonLabel>
              <IonDatetime displayFormat="MMMM DD, YYYY" placeholder="Date Arrived" disabled={!edit} value={displayData.arrival} onBlur={e => saveChange(e, 'arrival', displayData.id)}/>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="stacked">Age</IonLabel>
              <IonInput name="age" placeholder="Age" value={displayData.age} disabled={!edit} onBlur={e => saveChange(e, 'age', displayData.id)}/>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="stacked">Breed</IonLabel>
              <IonInput name="breed" placeholder="Breed" value={displayData.breed} disabled={!edit} onBlur={e => saveChange(e, 'breed', displayData.id)}/>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonTextarea
                name="description"
                disabled={!edit}
                value={displayData.description}
                placeholder="Description"
                onBlur={e => saveChange(e, 'description', displayData.id)}>
              </IonTextarea>
            </IonItem>
            <IonItem lines="none">
              <IonLabel position="stacked">Photos</IonLabel>
              <IonCard>
                Profile: 
                <input id="profile-file" type="file" name="file-a" onChange={imgSelectedHandler} />
              </IonCard>
              <IonCard>
                Picutres: 
                <input id="img-files" type="file" name="file-a" onChange={imgSelectedHandler} />
              </IonCard>
              <IonButton onClick={() => getAllImages()}>Click Me!</IonButton>
            </IonItem>
          </IonList>
          <IonButton expand="block" onClick={() => confirmDelete()}>Remove</IonButton>
        </IonModal>

        <IonModal isOpen={showNewDog} backdropDismiss={false}>
          <IonList>
            <IonItem lines="none">
              <h3><IonInput name="newName" value={newDog} placeholder="Dog Name" onBlur={e => changeName(e)}></IonInput></h3>
              <IonButton slot="end" expand="block" onClick={() => {setNewDog(''); setShowNewDog(false)}}>Close</IonButton>
            </IonItem>
            <IonItem lines="none">
              This initiates a dog record.
            </IonItem>
          </IonList>
            <IonButton expand="block" onClick={() => createDog()}>Save</IonButton>
        </IonModal>

        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          header={'Please Confirm'}
          message={`<strong>${displayData.name}</strong> will be deleted?  This <strong>Cannot</strong> be undone.`}
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
                deleteDog(displayData.id);
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
}

export default AdminDogs;
