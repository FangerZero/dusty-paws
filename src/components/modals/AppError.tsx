import {IonModal, IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import React from "react";

const DogExperience = (props: any) => {
    return (
        <IonModal isOpen={props.validModal}>
            <IonGrid>
            <IonRow>
                <IonCol offset="2" size="9" >
                <p>
                    Please ensure your personal information is filled out so we can contact you. 
                </p>
                <p>
                    Mising Values: {props.invalidList}
                </p>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol offset="5" >
                <IonButton onClick={() => props.setValidModal(false)}>Close</IonButton>
                </IonCol>
            </IonRow>
            </IonGrid>
        </IonModal>
    )
}

export default DogExperience;
