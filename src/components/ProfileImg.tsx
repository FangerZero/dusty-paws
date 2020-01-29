import { IonImg } from '@ionic/react';
import React, { useState } from 'react';

import fire from '../fire';

const ProfileImg = (props: any) => {
    const [ img, setImg ] = useState('');
    
    const storageRef = fire.storage().ref();
    const imagesRef = storageRef.child(`dogs/${props.id}/profile.jpg`);

    imagesRef.getDownloadURL().then(url => {
        setImg(url);
    }).catch(err => { console.log(err) });

    return (
        <IonImg src={img}/>
    );
}
export default ProfileImg;