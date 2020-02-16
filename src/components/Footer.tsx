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
                    <IonRouterLink href="/home"> Home</IonRouterLink> |
                    <IonRouterLink href="/about"> About</IonRouterLink> |
                    <IonRouterLink href="/dogs"> Dogs</IonRouterLink> |
                    <IonRouterLink href="/adopt"> Adopt</IonRouterLink> |
                    <a href="https://www.gofundme.com/f/b54npk-save-the-puppies?utm_source=facebook&utm_medium=social&utm_campaign=p_cp+share-sheet" target="_blank" rel="noopener noreferrer"> Donate</a> |
                    <IonRouterLink href="/affiliates"> Affiliates</IonRouterLink> |
                    <a href="https://www.facebook.com/dustypawsasafehavenforgreatpyrenees/"  target="_blank" rel="noopener noreferrer" > FaceBook</a>
                </IonCol>
            </IonRow>
        </IonGrid>
        </IonFooter>
    );
};

export default Footer;

// <IonRouterLink href="/join"> Join</IonRouterLink> |
