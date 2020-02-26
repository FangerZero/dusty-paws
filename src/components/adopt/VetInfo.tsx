import { IonItemGroup, IonItemDivider, IonLabel, IonItem, IonInput, IonIcon } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import React, { useState } from "react";

const VetInfo = (props: any) => {
    const [show, setShow] = useState(true);

    return (
        <IonItemGroup>
            <IonItemDivider color="primary" onClick={() => setShow(!show)}>
                <IonLabel>{show ? <IonIcon icon={removeCircleOutline} /> : <IonIcon icon={addCircleOutline} />} Veterinary Information</IonLabel>
            </IonItemDivider>
            { show &&
                <IonItem lines="none">
                    <IonLabel position="floating">Veterinary Name</IonLabel>
                    <IonInput type="text" name="vetName" required onIonBlur={e => props.updateForm(e, 'vetName') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">Veterinary Phone</IonLabel>
                    <IonInput type="tel" name="vetPhone" required onIonBlur={e => props.updateForm(e, 'vetPhone') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">Veterinary Clinic</IonLabel>
                    <IonInput type="text" name="vetClinic" required onIonBlur={e => props.updateForm(e, 'vetClinic') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">Veterinary Address</IonLabel>
                    <IonInput type="text" name="vetAddress" required onIonBlur={e => props.updateForm(e, 'vetAddress') }></IonInput>
                </IonItem>
            }
    </IonItemGroup>
    )
}

export default VetInfo;
