import { IonImg } from '@ionic/react';
import React, { useState } from 'react';

import fire from '../fire';

const DogImg = (props: any) => {
    const [ imgs, setImgs ] = useState([]);
    
    const storageRef = fire.storage().ref();
    const imagesRef = storageRef.child(`dogs/${props.id}/`);
    
    imagesRef.listAll().then(results => {
        var urls = [];

        results.items.map(item => {
            return item.getDownloadURL().then( mreow => urls.push(mreow));
        });
        return urls;
    }).then(urls => setImgs(urls));

    return (
        <div>
            {imgs.map( img => <IonImg src={img}/>)}
        </div>
    );
}
export default DogImg;