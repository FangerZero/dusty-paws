import { IonGrid, IonRow, IonCol, IonRouterLink, IonHeader } from '@ionic/react';
import React from 'react';

const Navigation: React.FC = () => {
    // <IonRouterLink href="/donate">Donate</IonRouterLink>
  return (
      <IonHeader>          
        <IonGrid>
            <IonRow>
                <IonCol offset="1">
                    <IonRouterLink href="/home">Home</IonRouterLink>
                </IonCol>
                <IonCol>
                    <IonRouterLink href="/dogs">Dogs</IonRouterLink>
                </IonCol>
                <IonCol>
                    <IonRouterLink href="/adopt">Adopt</IonRouterLink>
                </IonCol>
                <IonCol>
                    <a href="https://www.gofundme.com/f/b54npk-save-the-puppies?utm_source=facebook&utm_medium=social&utm_campaign=p_cp+share-sheet" target="_blank" rel="noopener noreferrer">Donate</a>
                </IonCol>
                <IonCol>
                    <IonRouterLink href="/about">About</IonRouterLink>
                </IonCol>
            </IonRow>
        </IonGrid>
      </IonHeader>
  );
};

export default Navigation;
