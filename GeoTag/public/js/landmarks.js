
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

var ratingDatabaseValue = 0;

 var firestore = firebase.firestore();
     var searchURL = window.location.search;
     var lastChar = searchURL.substr(searchURL.length - 1);
     document.getElementById("landmarkPhoto").src = "https://firebasestorage.googleapis.com/v0/b/geotag-8dae5.appspot.com/o/" + lastChar + ".jpg?alt=media";


      const data = firestore.doc("GeoTag/" + lastChar)
          data.get().then(function (doc) {
              if (doc && doc.exists) {
                  const myData = doc.data()
                  // console.log(myData)

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
      });

  var userNameToDisplay = ""
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          var displayName = user.displayName;
          var email = user.email;
          console.log('Current loged user: ' + user.displayName);
          if (user.displayName == null) {
              userNameToDisplay = email;
          } else {
              userNameToDisplay = user.displayName;
          }
          document.getElementById('quickstart-sign-in-status').textContent = ` ${userNameToDisplay}`;
      }
  })


  const  data2 = firestore.doc("GeoTag/" + lastChar )
  data2.get().then(function(querySnapshot) {
      const ranking = querySnapshot.data();
      ratingDatabaseValue = ranking.Rating;
      for (var i=0; i<ratingDatabaseValue.length;i++)
      {
          sumOfRating = sumOfRating + parseInt(ratingDatabaseValue.charAt(i));
      }
      var avgRating = sumOfRating/ratingDatabaseValue.length;

      document.getElementById("avgRating").innerHTML = avgRating.toFixed(1) +" / 5";
  });

document.addEventListener('DOMContentLoaded', function(){
    addListeners();
    setRating();
});



function addListeners(){
    var stars = document.querySelectorAll('.star');
    [].forEach.call(stars, function(star, index){
        star.addEventListener('click', (function(idx){
            document.querySelector('.stars').setAttribute('data-rating',  idx + 1);
            // console.log('User rated: ',idx+1 );
            setRating();

            var ratingString = ratingDatabaseValue + (idx+1).toString();

            if(userNameToDisplay == "Unknown" || userNameToDisplay == "Signed Out" || userNameToDisplay == "")
            {
                alert("You must be loged in to rate this place!");
            }
            else {
                data2.update({
                    Rating : ratingString
                })
            }
        }).bind(window,index) );
    });

}

var sumOfRating = 0;

function setRating(){
    const  data3 = firestore.doc("GeoTag/" + lastChar )
    data3.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data()

            for (var i=0; i<(myData.Rating).length;i++)
            {
                sumOfRating = sumOfRating + parseInt(myData.Rating.charAt(i));
            }
            var avgRating = sumOfRating/(myData.Rating).length;
        }

        var stars = document.querySelectorAll('.star');
        [].forEach.call(stars, function(star, index){
            if(Math.round(avgRating) > index){
                star.classList.add('rated');
            }else{
                star.classList.remove('rated');
            }
        });
    }).catch(function (error) {
        console.log("error: ", error)
    })


}






