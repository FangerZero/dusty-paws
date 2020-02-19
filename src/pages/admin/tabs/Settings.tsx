import React, { useState } from 'react';

import fire from '../../../fire';
import { IonPage, useIonViewDidEnter, IonSelect, IonSelectOption, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';

const Settings = (props: any) => {
    const db = fire.firestore();
    const [ dogs, setDogs ] = useState();
    const [settings, setSettings] = useState({id: '', spotlight: 's'});

    
    useIonViewDidEnter(() => {
        var doggies = [];
    
        db.collection("dogs").get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                doggies.push({
                    id: doc.id,
                    name: doc.data().name, 
                });
            })
            return doggies;
        }).then((doggies) => {
            setDogs(doggies);
        })
    
        db.collection("website").get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                setSettings({ 
                    id: doc.id,
                    spotlight: doc.data().spotlight
                });
            });
        });
    });
    
    function updateSetting(e, value) {
        console.log('e: ', e);
        console.log('value: ', value);

        var data = {}
        data[value] = (e.target as HTMLInputElement).value;
        setSettings({ ...settings, ...data });

        var docRef = db.collection("website").doc(settings.id);
        docRef.set({...data}, { merge: true });
    }

    function getDogOptions() {
      return (
        <IonSelect placeholder="Select a Dog" name="spotlight" onIonChange={e => updateSetting(e, "spotlight") }>
          {
            dogs.map((el, index) => {
              return (<IonSelectOption value={el.id} key={index} selected={settings.spotlight === el.id}>{el.name}</IonSelectOption>);
            })
          }
        </IonSelect>
      );
    }


    return (
        <IonPage>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        {dogs && <IonLabel>HomePage Dog</IonLabel>}
                        {dogs && getDogOptions()}
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonPage>
    )
}
export default Settings;