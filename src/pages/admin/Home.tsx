import { IonTabs, IonTabButton, IonRouterOutlet, IonIcon, IonTabBar, IonLabel } from '@ionic/react';
import { clipboard, paw } from 'ionicons/icons';
import React from 'react';

import Dogs from './tabs/Dogs';
import Applications from './tabs/Applications';
import { Route, Redirect } from 'react-router';

const AdminHome = () => {  
  return (<IonTabs>
    meow
    <IonRouterOutlet>
      <Redirect exact path="/admin/home" to="/admin/dogs" />
      {/* 
        Using the render method prop cuts down the number of renders your components will have due to route changes.
        Use the component prop when your component depends on the RouterComponentProps passed in automatically.        
      */}
      <Route path="/admin/dogs" render={() => <Dogs />} exact={true} />
      <Route path="/admin/applications" render={() => <Applications />} exact={true} />
    </IonRouterOutlet>
    <IonTabBar slot="top">
      <IonTabButton tab="schedule" href="/admin/dogs">
        <IonIcon icon={paw} />
        <IonLabel>Dogs</IonLabel>
      </IonTabButton>
      <IonTabButton tab="speakers" href="/admin/applications">
        <IonIcon icon={clipboard} />
        <IonLabel>Applications</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
  );
};

export default AdminHome;

/*
<IonGrid>
          <IonRow>
            <IonCol sizeXs="12" offsetMd="2" sizeMd="8">
              <IonList>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
        */
