import { IonContent, IonPage, IonGrid, IonRow, IonCol, useIonViewDidEnter, IonDatetime, IonModal, IonButton, IonList, IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonAlert, IonLabel, IonCheckbox, IonThumbnail, IonImg } from '@ionic/react';
import React, { useState } from 'react';

import fire from '../../../fire';
import Dog from '../../../images/default-dog.svg';

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
    fixed: false,
    fee: "",
    adopted: false,
  });
  const [ doggies, setDogs ] = useState([]);
  const [ edit, setEdit ] = useState(false);
  const [ editWord, setEditWord ] = useState('Edit');
  const [ newDog, setNewDog ] = useState('');
  const [ showAlert1, setShowAlert1 ] = useState(false);
  const [ profileImg, setProfileImg ] = useState('');
  const [ altImg1, setAltImg1 ] = useState('');
  const [ altImg2, setAltImg2 ] = useState('');
  const [ altImg3, setAltImg3 ] = useState('');
  const [ altImg4, setAltImg4 ] = useState('');
  const [ altImg5, setAltImg5 ] = useState('');

  useIonViewDidEnter(() => {
    if (doggies.length === 0) {
      loadDogs();
    }
  })

  function imgSelectedHandler(event) {
    const megabyte = 5048576;
    const files = event.target.files;
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
          let name = '';
          switch(event.target.id) {
            case "img-file-1":
                name = 'img-1';
              break;
            case "img-file-2":
                name = 'img-2';
              break;
            case "img-file-3":
                name = 'img-3';
              break;
            case "img-file-4":
                name = 'img-4';
              break;
            case "img-file-5":
                name = 'img-5';
              break;
          }
          storageRef.child('dogs/'+displayData.id+'/'+name+'.jpg').put(file);
        }
      }
    });
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
          fixed: doc.data().fixed,
          fee: doc.data().fee,
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
      fixed: false,
      fee: "",
      adopted: false,
    });

    setProfileImg(Dog);
    setAltImg1(Dog);
    setAltImg2(Dog);
    setAltImg3(Dog);
    setAltImg4(Dog);
    setAltImg5(Dog);
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

  function getImgs(id) {
    const storageRef = fire.storage().ref();
    const imagesRef = storageRef.child(`dogs/${id}/`);

    imagesRef.listAll().then(res => {
      res.items.map(itemRef => {
        itemRef.getDownloadURL().then(url => {
          if (url.includes('profile')) {
            setProfileImg(url || Dog)
          } else if (url.includes('img-1')) {
            setAltImg1(url || Dog);
          } else if (url.includes('img-2')) {
            setAltImg2(url || Dog);
          } else if (url.includes('img-3')) {
            setAltImg3(url || Dog);
          } else if (url.includes('img-4')) {
            setAltImg4(url || Dog);
          } else if (url.includes('img-5')) {
            setAltImg5(url || Dog);
          }
        })
        return itemRef;
      })
    })
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
          {getImgs(displayData.id)}
          <IonContent>
            <IonList>
              <IonItem lines="none">
                <h3><IonInput name="name" placeholder="Dog Name" value={displayData.name} disabled={!edit} onBlur={e => saveChange(e, 'name', displayData.id)}></IonInput></h3>
                <IonButton slot="end" onClick={() => {setEdit(!edit); setEditWord(edit ? 'Edit' : 'Done')}}>{editWord}</IonButton>
                <IonButton slot="end" onClick={() => {setEdit(false); setEditWord('Edit'); setShowModal(false); resetDisplayData();}}>Close</IonButton>
              </IonItem>
              <IonItem lines="none">
                <IonGrid>
                  <IonRow>
                    <IonCol>  
                      <IonItem lines="none">
                        <IonLabel position="stacked">Age</IonLabel>
                        <IonInput name="age" placeholder="Age" value={displayData.age} disabled={!edit} onBlur={e => saveChange(e, 'age', displayData.id)}/>
                        </IonItem>    
                      </IonCol>
                    <IonCol>      
                      <IonItem lines="none">
                        <IonLabel position="stacked">Date Arrived</IonLabel>
                        <IonDatetime displayFormat="MMMM DD, YYYY" placeholder="Date Arrived" disabled={!edit} value={displayData.arrival} onBlur={e => saveChange(e, 'arrival', displayData.id)}/>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem lines="none">
                <IonLabel position="stacked">Breed</IonLabel>
                <IonInput name="breed" placeholder="Breed" value={displayData.breed} disabled={!edit} onBlur={e => saveChange(e, 'breed', displayData.id)}/>
              </IonItem>
              <IonItem lines="none">
                <IonGrid>
                  <IonRow>
                    <IonCol>      
                      <IonItem lines="none">
                        <IonLabel position="stacked">Fee</IonLabel>
                        <IonInput name="fee" placeholder="Fee" value={displayData.fee} disabled={!edit} onBlur={e => saveChange(e, 'fee', displayData.id)}/>
                      </IonItem>
                    </IonCol>
                    <IonCol>      
                      <IonItem lines="none">
                        <IonLabel position="stacked">Fixed</IonLabel>
                        <IonCheckbox name="fixed" disabled={!edit} checked={displayData.fixed} onBlur={e => saveChange(e, 'fixed', displayData.id)}/>
                      </IonItem>
                    </IonCol>
                    <IonCol>      
                      <IonItem lines="none">
                        <IonLabel position="stacked">Adopted</IonLabel>
                        <IonCheckbox name="adopted" disabled={!edit} checked={displayData.adopted} onBlur={e => saveChange(e, 'adopted', displayData.id)}/>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
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
              <IonItem>
                Only JPG Images are accepted
              </IonItem>
              <IonItem lines="none">
                <IonLabel position="fixed">Profile Image:</IonLabel>
                <IonCard>
                  <IonThumbnail slot="start">
                    <IonImg src={profileImg || Dog}/>
                  </IonThumbnail>
                  <input id="profile-file" type="file" name="file-0" accept=".jpg" onChange={imgSelectedHandler} />
                </IonCard>
              </IonItem>
              <IonItem>
                <IonCard>
                  <IonLabel position="fixed">Alternate Images:</IonLabel>
                  <IonList>
                    <IonItem>
                    <IonThumbnail slot="start">
                      <IonImg src={altImg1 || Dog} />
                    </IonThumbnail>
                      <input id="img-file-1" type="file" name="file-1" accept=".jpg" onChange={imgSelectedHandler} />
                    </IonItem>
                    <IonItem>
                      <IonThumbnail slot="start">
                        <IonImg src={altImg2 || Dog} />
                      </IonThumbnail>
                      <input id="img-file-2" type="file" name="file-2" accept=".jpg" onChange={imgSelectedHandler} />
                    </IonItem>
                    <IonItem>
                      <IonThumbnail slot="start">
                        <IonImg src={altImg3 || Dog} />
                      </IonThumbnail>
                      <input id="img-file-3" type="file" name="file-3" accept=".jpg" onChange={imgSelectedHandler} />
                    </IonItem>
                    <IonItem>
                      <IonThumbnail slot="start">
                        <IonImg src={altImg4 || Dog} />
                      </IonThumbnail>
                      <input id="img-file-4" type="file" name="file-4" accept=".jpg" onChange={imgSelectedHandler} />
                    </IonItem>
                    <IonItem>
                      <IonThumbnail slot="start">
                        <IonImg src={altImg5 || Dog} />
                      </IonThumbnail>
                      <input id="img-file-5" type="file" name="file-5" accept=".jpg" onChange={imgSelectedHandler} />
                    </IonItem>
                  </IonList>
                </IonCard>
              </IonItem>
            </IonList>
            <IonButton expand="block" onClick={() => confirmDelete()}>Remove</IonButton>
          </IonContent>
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
