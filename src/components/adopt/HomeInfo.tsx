import { IonItemGroup, IonItemDivider, IonLabel, IonItem, IonInput, IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import React, { useState } from "react";

const HomeInfo = (props: any) => {
    const [show, setShow] = useState(true);

    return (
        <IonItemGroup>
            <IonItemDivider color="primary" onClick={() => setShow(!show)}>
                <IonLabel>{show ? <IonIcon icon={removeCircleOutline} /> : <IonIcon icon={addCircleOutline} />} Home Information</IonLabel>
            </IonItemDivider>
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">Home Type</IonLabel>
                    <IonSelect placeholder="Select" name="homeType" onIonChange={e => props.updateForm(e, "homeType") }>
                        <IonSelectOption value="house">House</IonSelectOption>
                        <IonSelectOption value="apartment">Apartment</IonSelectOption>
                        <IonSelectOption value="condo">Condo</IonSelectOption>
                        <IonSelectOption value="duplex">Duplex</IonSelectOption>
                        <IonSelectOption value="mobileHome">Mobile Home</IonSelectOption>
                        <IonSelectOption value="townhouse">Townhouse</IonSelectOption>
                    </IonSelect>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                <IonLabel position="floating">Do you rent?</IonLabel>
                    <IonSelect placeholder="Select" name="rent" onIonChange={e => props.updateForm(e, "rent") }>
                        <IonSelectOption value="yes">Yes</IonSelectOption>
                        <IonSelectOption value="no">No</IonSelectOption>
                    </IonSelect>
                </IonItem>
            }
            { show && props.getFormData('rent') === 'yes' &&
                <IonItem lines="none">
                    <IonLabel position="floating">Landlord Name</IonLabel>
                    <IonInput type="text" name="landlordName" required onIonBlur={e => props.updateForm(e, 'landlordName') }></IonInput>
                </IonItem>
            }
            { show && props.getFormData('rent') === 'yes' &&
                <IonItem lines="none">
                    <IonLabel position="floating">Landloard Phone</IonLabel>
                    <IonInput type="text" name="landlordPhone" required onIonBlur={e => props.updateForm(e, 'landlordPhone') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">Yard Type</IonLabel>
                    <IonSelect placeholder="Select" name="yardType" onIonChange={e => props.updateForm(e, "yardType") }>
                        <IonSelectOption value="none">None</IonSelectOption>
                        <IonSelectOption value="community">Community</IonSelectOption>
                        <IonSelectOption value="unfenced">Unfenced</IonSelectOption>
                        <IonSelectOption value="partiallyFenced">Partially Fenced</IonSelectOption>
                        <IonSelectOption value="fenced">Fenced</IonSelectOption>
                    </IonSelect>
                </IonItem>
            }
            { show && props.getFormData('yardType') === 'fenced' &&
                <IonItem lines="none">
                    <IonLabel position="floating">Fence Height</IonLabel>
                    <IonSelect placeholder="Select" name="fenceHeight" onIonChange={e => props.updateForm(e, "fenceHeight") }>
                        <IonSelectOption value="3">3 foot</IonSelectOption>
                        <IonSelectOption value="4">4 foot</IonSelectOption>
                        <IonSelectOption value="5">5 foot</IonSelectOption>
                        <IonSelectOption value="6">6 foot</IonSelectOption>
                    </IonSelect>
                </IonItem>
            }
            { show && props.getFormData('yardType') === 'fenced' &&
                <IonItem lines="none">
                    <IonLabel position="floating">Fence Material</IonLabel>
                    <IonSelect placeholder="Select" name="fenceMaterial" onIonChange={e => props.updateForm(e, "fenceMaterial") }>
                        <IonSelectOption value="wood">Wood</IonSelectOption>
                        <IonSelectOption value="chainLink">Chain Link</IonSelectOption>
                        <IonSelectOption value="brick">Brick</IonSelectOption>
                        <IonSelectOption value="stone">Stone</IonSelectOption>
                        <IonSelectOption value="vinyl">Vinyl</IonSelectOption>
                        <IonSelectOption value="other">Other</IonSelectOption>
                    </IonSelect>
                </IonItem>
            }
        </IonItemGroup>
    )
}

export default HomeInfo;
