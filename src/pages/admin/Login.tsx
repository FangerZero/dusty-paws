import { IonContent, IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonList } from '@ionic/react';
import React from 'react';

import fire from '../../fire';

const AdminLogin = () => {
  // var db = fire.firestore();
  var auth = fire.auth();

  // Sign up the User
  /* auth.createUserWithEmailAndPassword(email, password).then(cred => {
    
  })
  */
 // Sign out User
/*
  auth.signOut().then(() => {
    console.log('user signed out');
  })

  */



  function signIn() {
    let email = document.getElementById("email").nodeValue;
    let password = document.getElementById("password");
    console.log(email);
    /*
    auth.signInWithEmailAndPassword(email, password).then(cred => {
     console.log(cred);
     // clear form 
    })
    */
    console.log('meow');
  }


 auth.onAuthStateChanged(user => {
   if (user) {
     console.log('User logged in');
   } else {
     console.log('user logged out');
   }
 })
  
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" offsetMd="2" sizeMd="8">
              <IonList>
                <IonInput id="email" placeholder="Email"></IonInput>
                <IonInput id="password" placeholder="Password" type="password"></IonInput>
                <IonButton onClick={() => signIn()}>Submit</IonButton>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AdminLogin;
