import { IonTabs, IonTabButton, IonRouterOutlet, IonIcon, IonTabBar, IonLabel } from '@ionic/react';
import { clipboard, paw, logOut } from 'ionicons/icons';
import React, { useState } from 'react';

import Dogs from './tabs/Dogs';
import Applications from './tabs/Applications';
import fire from '../../fire';
// import { Redirect } from 'react-router-dom';
import { Route, Redirect } from 'react-router';

const AdminHome = () => {  
  const [ redirect, setRedirect ] = useState(false);

  var auth = fire.auth();
  auth.onAuthStateChanged(user => {
    if (user) {
      setRedirect(false);
    } else {
      setRedirect(true);
    }
  })
  
  function renderRedirect() {
    if (redirect) {
      return <Redirect to='/admin/login' />
    }
  }

  return (<IonTabs>
      {renderRedirect()}
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
      <IonTabButton tab="dogs" href="/admin/dogs">
        <IonIcon icon={paw} />
        <IonLabel>Dogs</IonLabel>
      </IonTabButton>
      <IonTabButton tab="applications" href="/admin/applications">
        <IonIcon icon={clipboard} />
        <IonLabel>Applications</IonLabel>
      </IonTabButton>
      <IonTabButton tab="logout" href="/admin/login">
        <IonIcon icon={logOut} />
        <IonLabel>Logout</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
  );
};

export default AdminHome;
