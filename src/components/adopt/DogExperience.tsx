import { IonItemGroup, IonItemDivider, IonLabel, IonItem, IonInput, IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import React, { useState } from "react";

const DogExperience = (props: any) => {
    const [show, setShow] = useState(true);
    const dogUnprepared = [
        {"value": "excessiveBarking", "display": "Excessive barking"},
        {"value": "digging", "display": "Digging"},
        {"value": "destructive", "display": "Destructive Chewing"},
        {"value": "notHousetrained", "display": "Not Housetrained"},
        {"value": "escape", "display": "Escape Artist"},
        {"value": "resourceGuarding", "display": "Resource Guarding"},
        {"value": "children", "display": "Not Good with Children"},
        {"value": "otherDogs", "display": "Not Good with Other Dogs"},
        {"value": "otherAnimals", "display": "Not Good with Small Animals/Cats"},
        {"value": "fearful", "display": "Shy/Fearful"},
        {"value": "training", "display": "Provide On-Going Training"},
        {"value": "scratchBite", "display": "Scratching/Biting"},
        {"value": "medications", "display": "Administering Medications"},
        {"value": "highActivity", "display": "High Activity Level"},
        {"value": "blindDeaf", "display": "Blind/Deaf"},
    ];

    return (
        <IonItemGroup>
            <IonItemDivider color="primary" onClick={() => setShow(!show)}>
                <IonLabel>{show ? <IonIcon icon={removeCircleOutline} /> : <IonIcon icon={addCircleOutline} />} Dog Experience</IonLabel>
            </IonItemDivider>
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">How experienced are you?</IonLabel>
                    <IonInput type="text" name="dogExperience" required onIonBlur={e => props.updateForm(e, 'dogExperience') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">How long will your dog be alone during the day?</IonLabel>
                    <IonInput type="text" name="dogAloneTime" required onIonBlur={e => props.updateForm(e, 'dogAloneTime') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">Where will your dog be when you're not at home?</IonLabel>
                    <IonInput type="text" name="dogAloneLocal" required onIonBlur={e => props.updateForm(e, 'dogAloneLocal') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">When you're home, where will your dog be most of the time?</IonLabel>
                    <IonInput type="text" name="dogHumanLocal" required onIonBlur={e => props.updateForm(e, 'dogHumanLocal') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                    <IonLabel position="floating">When you go to sleep where will your dog sleep?</IonLabel>
                    <IonInput type="text" name="dogSleepLocal" required onIonBlur={e => props.updateForm(e, 'dogSleepLocal') }></IonInput>
                </IonItem>
            }
            { show &&  
                <IonItem lines="none">
                        <IonLabel>Check which items you have yet to think about when adding a dog to your family...</IonLabel>
                    <IonSelect multiple={true} name="dogUnprepared" cancelText="Cancel" okText="Done" onIonChange={e =>  props.updateForm(e, 'dogUnprepared') }> 
                    {dogUnprepared.map(el => 
                        <IonSelectOption  key={el.value} value={el.value}>{el.display}</IonSelectOption > 
                    ) }</IonSelect>
                </IonItem>
            } 
            
        </IonItemGroup>
    )
}

export default DogExperience;
/*
                    {dogUnprepared.map(el => 
                        <IonItem key={el.value} lines="none"><IonLabel> {el.display}</IonLabel><IonCheckbox value={el.value} slot="start"/></IonItem> 
                    ) }
*/
