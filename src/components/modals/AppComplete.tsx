import React from "react";
import { IonModal, IonGrid, IonRow, IonCol, IonRouterLink } from "@ionic/react";

const AppComplete = (props: any) => {
    return (
        <IonModal isOpen={props.showModal} backdropDismiss={false}>
          <IonGrid>
            <IonRow>
              <IonCol offset="2" size="5" >
                <p>
                  Your Application has been received, please give 3 business days for us to get back to you.
                </p>
                <IonRouterLink href="/home">Done</IonRouterLink>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonModal>
    )
}

export default AppComplete