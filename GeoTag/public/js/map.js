function initMap() {

          data.get().then(function (doc) {
              if (doc && doc.exists) {
                  const myData = doc.data()

                     var uluru = {lat: Number(myData.MapLat), lng: Number(myData.MapLng)};
                     var map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: uluru});
                     var marker = new google.maps.Marker({position: uluru, map: map});
              }
          }).catch(function (error) {
              console.log("error: ", error)
          })
}

