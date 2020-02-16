import { IonTabs, IonTabButton, IonRouterOutlet, IonIcon, IonTabBar, IonLabel } from '@ionic/react';
import { clipboard, paw, logOut } from 'ionicons/icons';
import React, { useState } from 'react';

import Dogs from './tabs/Dogs';
import Applications from './tabs/Applications';
// import Login from './Login';
import fire from '../../fire';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router';

const AdminHome = () => {  
  var auth = fire.auth();
  const [ redirect, setRedirect ] = useState(false);

  auth.onAuthStateChanged(user => {
    if (user) {
      setRedirect(false);
    } else {
      setRedirect(true);
    }
  })

  function loginRender() {
    return <Redirect to="/admin/login" />
  }

  function logoutRender() {
    auth.signOut();
    return <Redirect to="/admin/login" />
  }

  function pageRender() {
    return (
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/admin/dogs" render={() => <Dogs />} exact={true} />
          <Route path="/admin/applications" render={() => <Applications />} exact={true} />
          <Route path="/admin/logout" render={() => logoutRender()} exact={true} />
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
          <IonTabButton tab="logout" href="/admin/logout">
            <IonIcon icon={logOut} />
            <IonLabel>Logout</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
  }

  return redirect ? loginRender() : pageRender();
};

export default AdminHome;
