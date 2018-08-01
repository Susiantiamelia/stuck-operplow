import firebase from 'firebase'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC8FBNbfF7-c2A5btoMb9QcVE38mlZ7QAQ",
    authDomain: "sandbox-210608.firebaseapp.com",
    databaseURL: "https://sandbox-210608.firebaseio.com",
    projectId: "sandbox-210608",
    storageBucket: "sandbox-210608.appspot.com",
    messagingSenderId: "581545695298"
  };
  firebase.initializeApp(config);

  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    }
  };