import { IonContent, IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonList } from '@ionic/react';
import React, { useState }  from 'react';
import { Redirect } from 'react-router-dom';

import fire from '../../fire';

const AdminLogin = () => {
  var auth = fire.auth();
  const [ email, setEmail ] = useState('');
  const [ pass, setPass ] = useState('');
  const [ redirect, setRedirect ] = useState(false);

  function signIn() {    
    auth.signInWithEmailAndPassword(email, pass).then(cred => {
      setEmail('');
      setPass('');
      setRedirect(true);
    })
  }

 auth.onAuthStateChanged(user => {
   if (user) {
    // auth.signOut();
   } else {
     setRedirect(false);
   }
 })

 function renderRedirect() {
    if (redirect) {
      return <Redirect to='/admin/home' />
    }
  }
  
  return (
    <IonPage>
      {renderRedirect()}
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" offsetMd="2" sizeMd="8">
              <IonList>
                <IonInput id="email" placeholder="Email" value={email} onIonChange={e => setEmail((e.target as HTMLInputElement).value)}></IonInput>
                <IonInput id="password" placeholder="Password" value={pass} type="password" onIonChange={e => setPass((e.target as HTMLInputElement).value)}></IonInput>
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
