import { IonRouterLink, IonFooter, IonGrid, IonRow, IonCol } from '@ionic/react';
// import { logoFacebook } from 'ionicons/icons';
// <IonRouterLink href="https://www.facebook.com/dustypawsasafehavenforgreatpyrenees/" ><IonIcon icon={logoFacebook} size="large" ></IonIcon></IonRouterLink>
import React from 'react';
//<IonRouterLink href="/donate"> Donate</IonRouterLink>
const Footer: React.FC = () => {
    return (
        <IonFooter>
            <IonGrid>
                <IonRow>
                    <IonCol offsetLg="5" offsetMd="4" offsetXs="1">
                        <IonRouterLink color="light" href="/home"> Home</IonRouterLink> |
                        <IonRouterLink color="light" href="/about"> About</IonRouterLink> |
                        <IonRouterLink color="light" href="/dogs"> Dogs</IonRouterLink> |
                        <IonRouterLink color="light" href="/adopt"> Adopt</IonRouterLink> |
                        <IonRouterLink color="light" href="https://www.paypal.me/dustypaws"> Donate</IonRouterLink> |
                        <IonRouterLink color="light" href="/affiliates"> Affiliates</IonRouterLink> |
                        <IonRouterLink color="light" href="https://www.facebook.com/dustypawsasafehavenforgreatpyrenees/"> Facebook</IonRouterLink> |
                        
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonFooter>
    );
};

export default Footer;

// <IonRouterLink href="/join"> Join</IonRouterLink> |
// <a href="https://www.paypal.me/dustypaws" target="_blank" rel="noopener noreferrer"> Donate</a> |
// <a href="https://www.facebook.com/dustypawsasafehavenforgreatpyrenees/"  target="_blank" rel="noopener noreferrer" > FaceBook</a>