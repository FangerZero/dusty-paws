import { IonItemGroup, IonItemDivider, IonLabel, IonItem, IonInput, IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import React, { useState } from "react";

const DogPreference = (props: any) => {
    const [show, setShow] = useState(true);

    return (
        <IonItemGroup>
            <IonItemDivider color="primary" onClick={() => setShow(!show)}>
                <IonLabel>{show ? <IonIcon icon={removeCircleOutline} /> : <IonIcon icon={addCircleOutline} />} Dog Preference</IonLabel>
            </IonItemDivider>
            { show &&  
                <IonItem lines="none">
                <IonLabel position="floating">Preferred Size</IonLabel>
                    <IonSelect placeholder="Select" name="dogSize" onIonChange={e => props.updateForm(e, "dogSize") }>
                        <IonSelectOption value="none">No Preference</IonSelectOption>
                        <IonSelectOption value="small">Small (&lt;22lbs)</IonSelectOption>
                        <IonSelectOption value="medium">Medium (&lt;60lbs)</IonSelectOption>
                        <IonSelectOption value="large">Large (&lt;100lbs)</IonSelectOption>
                        <IonSelectOption value="xLarge">X-Large (100lbs+)</IonSelectOption>
                    </IonSelect>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                <IonLabel position="floating">Dog Breed</IonLabel>
                    <IonInput type="text" name="dogBreed" required onIonBlur={e => props.updateForm(e, 'dogBreed') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">Dog Age</IonLabel>
                    <IonInput type="text" name="dogAge" required onIonBlur={e => props.updateForm(e, 'dogAge') }></IonInput>
                </IonItem>
            }
        </IonItemGroup>
    )
}

export default DogPreference;
