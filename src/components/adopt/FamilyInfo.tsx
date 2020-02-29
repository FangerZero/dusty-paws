import { IonItemGroup, IonItemDivider, IonLabel, IonItem, IonIcon, IonTextarea } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import React, { useState } from "react";

const FamilyInfo = (props: any) => {
    const [show, setShow] = useState(true);

    return (
        <IonItemGroup>
            <IonItemDivider color="primary" onClick={() => setShow(!show)}>
                <IonLabel>{show ? <IonIcon icon={removeCircleOutline} /> : <IonIcon icon={addCircleOutline} />} Family Information</IonLabel>
            </IonItemDivider>
            { show &&
                <IonItem lines="none">
                    <IonLabel position="floating" class="ion-text-wrap">Number of Adults and their age in household</IonLabel>
                    <IonTextarea name="adults" required onIonBlur={e => props.updateForm(e, 'adults') } rows={1} />
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating" class="ion-text-wrap" >Number of Children and their age in household</IonLabel>
                    <IonTextarea name="children" required onIonBlur={e => props.updateForm(e, 'children') } rows={2} />
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating" class="ion-text-wrap">Number of pets, type, gender, intact, age, and how long they've lived with you</IonLabel>
                    <IonTextarea name="pets" required onIonBlur={e => props.updateForm(e, 'pets') } rows={3} />
                </IonItem>
            }
        </IonItemGroup>
    )
}

export default FamilyInfo;
