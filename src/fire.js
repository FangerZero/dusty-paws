import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAvOPs0JjHnM8UDipX6P1ethwEXATVz0M4",
  authDomain: "dusty-paws.firebaseapp.com",
  databaseURL: "https://dusty-paws.firebaseio.com",
  projectId: "dusty-paws",
  storageBucket: "dusty-paws.appspot.com",
  messagingSenderId: "1035378161737",
  appId: "1:1035378161737:web:d5af3f0f7fb092ea392798",
  measurementId: "G-MLQH10ZE5Z"
};
var fire = firebase.initializeApp(firebaseConfig);

export default fire;

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAvOPs0JjHnM8UDipX6P1ethwEXATVz0M4",
    authDomain: "dusty-paws.firebaseapp.com",
    databaseURL: "https://dusty-paws.firebaseio.com",
    projectId: "dusty-paws",
    storageBucket: "dusty-paws.appspot.com",
    messagingSenderId: "1035378161737",
    appId: "1:1035378161737:web:d5af3f0f7fb092ea392798",
    measurementId: "G-MLQH10ZE5Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>

*/