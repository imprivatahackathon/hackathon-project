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
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    currentUID = user.uid
    console.log("success");
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    window.open("/../projectListPage.html");
    // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      currentUID = null;
      console.log(email)
      // ...
    });
});

var currentUID;


function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}
