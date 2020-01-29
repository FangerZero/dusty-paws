import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import About from './pages/About';
import Dogs from './pages/Dogs';
import Adopt from './pages/Adopt';
import Donate from './pages/Donate';
import Join from './pages/Join';
import AdminLogin from './pages/admin/Login';
import AdminHome from './pages/admin/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Firebase Backend */
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
// const meow = firebase.initializeApp('dusty-paws');


/* Theme variables */
import './theme/variables.css';
import './theme/misc.css'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/admin/home" component={AdminHome} exact={true} />
        <Route path="/admin/login" component={AdminLogin} exact={true} />
        <Route path="/home" component={Home} exact={true} />
        <Route path="/about" component={About} exact={true} />
        <Route path="/dogs" component={Dogs} exact={true} />
        <Route path="/adopt" component={Adopt} exact={true} />
        <Route path="/donate" component={Donate} exact={true} />
        <Route path="/join" component={Join} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
