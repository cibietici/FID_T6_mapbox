/* //  enkelt måte med error
window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('../sw.js')
    .then(_ => console.log('Registered service worker'))
    .catch(e => console.log('Error registering: ', e));
}); */

/*// ISW enkel variant
 if (navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register('../sw.js');
} */

// SERVICE WORKER med errors

const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          '../sw_allcache.js',
          {
            scope: '/',
          }
        );
        if (registration.installing) {
          console.log('Service worker installing');
        } else if (registration.waiting) {
          console.log('Service worker installed');
        } else if (registration.active) {
          console.log('Service worker active');
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };
  registerServiceWorker(); // invoke

const mapbox_key = 'pk.eyJ1IjoiY2liaWV0aWNpIiwiYSI6ImNrenM1Z2gwdjZ6aHUydm16dzBldXJmcjIifQ.ugFvlWIvOLmyqr7v__e_Ug';

async function getMap(){

    mapboxgl.accessToken = mapbox_key;

    const statusStations = await getStatus();
    const checkStatus = id => {
        return statusStations.find(station => station.station_id === id)
    }

    const bikeStations = await getStations();
    const featuresBikes = bikeStations.map(station => {
        return {
            type: 'Feature',
            properties: {
                station: station.name,
                status: checkStatus(station.station_id),
                lon: station.lon,
                lat: station.lat,
                center: [station.lon, station.lat]
                },
            geometry: {
                type: 'Point',
                coordinates: [station.lon, station.lat]
                }
            }
    });

    const geoStations = {
        type: 'FeatureCollection',
        features: featuresBikes
    }

    const map = new mapboxgl.Map(
        {
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [10.75, 59.91], // starting position [lng, lat]
            zoom: 16, // starting zoom
            pitch: 60, // 3d
            bearing: 40, // 3d
            antialias: true
        }
    );

    geoStations.features.forEach(station => {
        const markerEl = document.createElement('div');
        markerEl.classList.add('marker');
        markerEl.addEventListener('click', () => {
            showPopUp(station.properties.station, station.properties.status, map, station.properties.center)
        });
        new mapboxgl.Marker(markerEl)
        .setLngLat(station.geometry.coordinates)
        .addTo(map);
    });


};

function showPopUp(station, status, map, center) {
    const popUpEl = document.querySelector('.pop-up');
    const stationTitle = document.querySelector('.pop-up h2');
    const bikes = document.querySelector('.pop-up p');
    const closeEl = document.querySelector('.close-pop');
    stationTitle.textContent = station;
    bikes.textContent = `${status.num_bikes_available} / ${status.num_docks_available}`
    popUpEl.classList.remove('hidden');
    map.flyTo({
        center: center,
        zoom: 20,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
    closeEl.addEventListener('click', () => {
        popUpEl.classList.add('hidden');
        map.flyTo({
            center: [10.75, 59.91],
            zoom: 16,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    });
}

async function getStations() {
    const urlStations = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
    const response = await fetch(urlStations);
    const stations = await response.json();
    return stations.data.stations;
};

async function getStatus() {
    const urlStations = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json';
    const response = await fetch(urlStations);
    const status = await response.json();
    return status.data.stations;
}

getMap();

/* // Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
.setLngLat([10.77, 59.92])
.addTo(map);
 
// Create a default Marker, colored black, rotated 45 degrees.
const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 90 })
.setLngLat([10.78, 59.90])
.addTo(map); */
