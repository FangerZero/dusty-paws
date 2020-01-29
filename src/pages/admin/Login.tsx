import { IonContent, IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonList } from '@ionic/react';
import React from 'react';

// import fire from '../../fire';

const AdminLogin = () => {
  //var db = fire.firestore();
  
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" offsetMd="2" sizeMd="8">
              <IonList>
                <IonInput placeholder="Email"></IonInput>
                <IonInput placeholder="Password"></IonInput>
                <IonButton>Submit</IonButton>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AdminLogin;
