'use strict';

var firebaseConfig = {
  apiKey: "AIzaSyBN31nZd44oUvOTJGCaLOiqrXF5VQ36zlE",
  authDomain: "hackathon-project-44f1f.firebaseapp.com",
  databaseURL: "https://hackathon-project-44f1f.firebaseio.com",
  projectId: "hackathon-project-44f1f",
  storageBucket: "hackathon-project-44f1f.appspot.com",
  messagingSenderId: "444568735158",
  appId: "1:444568735158:web:a9e0bfbb4f143e33"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

$('#view-projects').on('click', function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
});

firebase.auth().onAuthStateChanged(onAuthStateChanged);
var currentUID;

function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }

  if (user) {
    currentUID = user.uid;
    window.open("/projectListPage.html")
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    //start to get the database info
  } else {
    // Set currentUID to null.
    currentUID = null;
    // Display the splash page where you can sign-in.
    //window.open("/index.html")
  }
}

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}
