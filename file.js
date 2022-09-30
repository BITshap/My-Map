



    



// map object
const UserMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},

    createMap() {
    this.map = L.map('map', {
    center: this.coordinates,
    zoom: 14,
    });
   
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(this.map);
    
     const marker = L.marker(this.coordinates)
     marker
     .addTo(this.map)
     .bindPopup("You are Here!")
     .openPopup(); 
},

    addMarkers(){
    for (let i = 0; i < this.businesses.length; i++) {
        this.markers = L.marker([
            this.businesses[i].lat,
            this.businesses[i].long,
        ])
        .bindPopup('This is '+ this.businesses[i].name)
        .addTo(this.map)
    }
},
}
// get coordinates via geolocation api

async function getLocation(){
    const pos = await new Promise((resolve, reject) =>  {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}



// get foursquare businesses
async function gatherBusiness(business) {

   const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3yc/2FLX9gRGo/lW54giARCQWBvKBlZwzTRiWaYsfNmk='
     }
   }
  
  let limit = 5
  let lat = UserMap.coordinates[0]
  let lon = UserMap.coordinates[1]
  var url = 'https://api.foursquare.com/v3/places/search?&query=' + business + '&limit=' + limit + '&ll=' + lat + '%2C' + lon; 
  let response = await fetch(url, options)
  let data = await response.text()
  let parsedData = JSON.parse(data)
  let businesses =  parsedData.results
  return businesses

}

// process foursquare array
function gatheringResults(data) {
   let business = data.map((element) => {
        let location = {
            name: element.name,
            lat: element.geocodes.main.latitude,
            long: element.geocodes.main.longitude
        };
        return location
   })
   return business
}
// event handlers

// window load
window.onload = async () => { 
    const coords = await getLocation()
    UserMap.coordinates = coords
    UserMap.createMap()
}


// business submit button
document.getElementById('business').addEventListener('click', async (event) => {
    event.preventDefault()
    let business = document.getElementById('business').value
    let data = await gatherBusiness(business)
    UserMap.businesses = gatheringResults(data)
    UserMap.addMarkers()
    console.log("clicked!")
})

