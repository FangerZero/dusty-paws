import { IonItemGroup, IonItemDivider, IonLabel, IonItem, IonIcon, IonCheckbox } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import React, { useState } from "react";
// TODO Don't let submit be valid until terms of service checked
const TermsOfService = (props: any) => {
    const [show, setShow] = useState(true);

    return (
        <IonItemGroup>
            <IonItemDivider color="primary" onClick={() => setShow(!show)}>
                <IonLabel>{show ? <IonIcon icon={removeCircleOutline} /> : <IonIcon icon={addCircleOutline} />} Terms of Service</IonLabel>
            </IonItemDivider>
            { show &&
                <IonItem lines="none">
                    I understand that Dusty Paws has done their best to screen each adoption candidate for safety but due to the length of time in our care and the uncertain history of each animal we cannot always predict how an animal will respond in any given situation. Animals may act out which can include biting (breaking skin), barking, growling, attack of other animals, attack of people, destruction of property, urinating and defecating in unwanted places, etc. 
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    &nbsp;<IonCheckbox onIonChange={e => props.setTermsOfService('terms')}/>&nbsp;
                    <IonLabel>By Checking this box I attest that I have read and accept responsibility for myself and the animal once animal is placed in my care. </IonLabel>
                </IonItem>
            }
    </IonItemGroup>
    )
}

export default TermsOfService;
