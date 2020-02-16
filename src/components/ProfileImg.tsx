import { IonImg } from '@ionic/react';
import React, { useState } from 'react';

import fire from '../fire';
import Dog from '../images/default-dog.svg';

const ProfileImg = (props: any) => {
    const [ img, setImg ] = useState('');
    
    const storageRef = fire.storage().ref();
    const imagesRef = storageRef.child(`dogs/${props.id}/profile.jpg`);

    imagesRef.getDownloadURL().then(url => setImg(url))
        .catch(() => setImg(Dog));

    return (
        <IonImg src={img || Dog}/>
    );
}
export default ProfileImg;