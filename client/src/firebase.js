const firebase = require('firebase')

var config = {
  apiKey: "AIzaSyDZwLUPqk-bINvPBoAdJSU-w7UB94ll1w4",
  authDomain: "stuck-operplow.firebaseapp.com",
  databaseURL: "https://stuck-operplow.firebaseio.com",
  projectId: "stuck-operplow",
  storageBucket: "",
  messagingSenderId: "269692795374"
};

firebase.initializeApp(config);

var provider = new firebase.auth.FacebookAuthProvider()
var auth = firebase.auth()

module.exports = {provider, auth}