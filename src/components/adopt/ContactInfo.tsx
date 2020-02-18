import { IonItemGroup, IonItemDivider, IonLabel, IonItem, IonInput, IonIcon } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import React, { useState } from "react";

const ContactInfo = (props: any) => {
    const [show, setShow] = useState(true);
    return (
        <IonItemGroup>
            <IonItemDivider color="primary" onClick={() => setShow(!show)}>
                <IonLabel>{show ? <IonIcon icon={removeCircleOutline} /> : <IonIcon icon={addCircleOutline} />} Contact Information</IonLabel>
            </IonItemDivider>
            { show &&
                <IonItem lines="none">
                    <IonLabel position="floating">First Name</IonLabel>
                    <IonInput type="text" name="firstName" required onIonBlur={e => props.updateForm(e, 'firstName') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">Last Name</IonLabel>
                    <IonInput type="text" name="lastName" required onIonBlur={e => props.updateForm(e, 'lastName') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">Phone #</IonLabel>
                    <IonInput type="tel" name="phone" required onIonBlur={e => props.updateForm(e, 'phone') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                <IonLabel position="floating">Email</IonLabel>
                    <IonInput type="email" name="email" required onIonBlur={e => props.updateForm(e, 'email') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                <IonLabel position="floating">Address</IonLabel>
                    <IonInput type="text" name="address_1" onIonBlur={e => props.updateForm(e, 'address_1') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                <IonLabel position="floating">City</IonLabel>
                    <IonInput type="text" name="city" onIonBlur={e => props.updateForm(e, 'city') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                <IonLabel position="floating">State</IonLabel>
                    <IonInput type="text" max="2" name="state" onIonBlur={e => props.updateForm(e, 'state') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                <IonLabel position="floating">Zip</IonLabel>
                    <IonInput type="text" max="5" name="zip" onIonBlur={e => props.updateForm(e, 'zip') }></IonInput>
                </IonItem>
            }
        </IonItemGroup>
    )
}

export default ContactInfo;
