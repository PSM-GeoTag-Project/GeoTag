
  const firebaseConfig = {
    apiKey: "AIzaSyBxvBY-hT2DigCnNSY-t4_YQGIG5R4SGfw",
    authDomain: "geotag-8dae5.firebaseapp.com",
    databaseURL: "https://geotag-8dae5.firebaseio.com",
    projectId: "geotag-8dae5",
    storageBucket: "geotag-8dae5.appspot.com",
    messagingSenderId: "649673377801",
    appId: "1:649673377801:web:babf09388cdd79387d10d8",
    measurementId: "G-C8BT8GRT0C"
  };

  firebase.initializeApp(firebaseConfig);



 var firestore = firebase.firestore();
     var searchURL = window.location.search;
     var lastChar = searchURL.substr(searchURL.length - 1);
     document.getElementById("landmarkPhoto").src = "https://firebasestorage.googleapis.com/v0/b/geotag-8dae5.appspot.com/o/" + lastChar + ".jpg?alt=media";


      const data = firestore.doc("GeoTag/" + lastChar)
          data.get().then(function (doc) {
              if (doc && doc.exists) {
                  const myData = doc.data()
                  console.log(myData)

                            document.getElementById("landmark_name").innerHTML = myData.Name;
                            document.getElementById("landmark_short_description").innerHTML = myData.ShortDesc;
                            document.getElementById("description").innerHTML = myData.Description;
                            document.getElementById("facts").innerHTML = myData.FunFacts;
                            document.getElementById("place").innerHTML = myData.ListPlace;
                            document.getElementById("created").innerHTML = myData.ListCreated;
                            document.getElementById("cost").innerHTML = myData.ListCost;
                            document.getElementById("timeToSpend").innerHTML = myData.ListTimeToSpend;
                            document.getElementById("busStop").innerHTML = myData.ListBusStop;
                            document.getElementById("type").innerHTML = myData.ListType;
              }
          }).catch(function (error) {
              console.log("error: ", error)
      })

