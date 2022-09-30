



    



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
}
// get coordinates via geolocation api

async function getLocation(){
    const pos = await new Promise((resolve, reject) =>  {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}



// get foursquare businesses

// process foursquare array

// event handlers

// window load
window.onload = async () => { 
    const coords = await getLocation()
    console.log(coords)
    UserMap.coordinates = coords
    UserMap.createMap()
}


// business submit button
document.querySelectorAll('button').addeventlistner('click', async () => {
    let UserBusiness = document.getElementById('business').value
    UserMap.businesses = UserBusiness
})

