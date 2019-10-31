let firebaseConfig = {
apiKey: "AIzaSyBwmf0G1zMdu1O6NW-MdOUv4qh6p5l_P5M",
authDomain: "pokepedia-e0d75.firebaseapp.com",
databaseURL: "https://pokepedia-e0d75.firebaseio.com",
projectId: "pokepedia-e0d75",
storageBucket: "pokepedia-e0d75.appspot.com",
messagingSenderId: "550121451759",
appId: "1:550121451759:web:5df4350ec5b50f52616b1a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let database = firebase.database();

// All of our connections will be stored in this directory.
let ref = database.ref();

//All of the pokemon in our group
let partyRef = database.ref("/party-members");

// Attach an asynchronous callback to read the data at our posts reference
partyRef.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });