import { IonItemGroup, IonItemDivider, IonLabel, IonItem, IonIcon } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import React, { useState } from "react";

const DogSelect = (props: any) => {
    const [show, setShow] = useState(true);

    return (
        <IonItemGroup>
            <IonItemDivider color="primary" onClick={() => setShow(!show)}>
                <IonLabel>{show ? <IonIcon icon={removeCircleOutline} /> : <IonIcon icon={addCircleOutline} />} Dog Selection</IonLabel>
            </IonItemDivider>
            { show &&
                <IonItem lines="none">
                <IonLabel position="floating">First Interested Dog</IonLabel>
                    { props.doggies && props.getDogOptions(props.doggies, 'dog_1') }
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                <IonLabel position="floating">Second Interested Dog</IonLabel>
                    { props.doggies && props.getDogOptions(props.doggies, 'dog_2') }
                </IonItem>
            }
            { show &&  
                <IonItem>
                <IonLabel position="floating">Third Interested Dog</IonLabel>
                    { props.doggies && props.getDogOptions(props.doggies, 'dog_3') }
                </IonItem>
            }
    </IonItemGroup>
    )
}

export default DogSelect;
