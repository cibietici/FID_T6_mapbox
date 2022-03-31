const mapbox_key = 'pk.eyJ1IjoiY2liaWV0aWNpIiwiYSI6ImNrenM1Z2gwdjZ6aHUydm16dzBldXJmcjIifQ.ugFvlWIvOLmyqr7v__e_Ug';

async function getMap(){

    mapboxgl.accessToken = mapbox_key;
    const bikeStations = await getStations();
    const featuresBikes = bikeStations.map(station => {
        return {
            type: 'Feature',
            properties: {
                message: station.title + ' ' +  station.subtitle
                },
            geometry: {
                type: 'Point',
                coordinates: [station.center.longitude, station.center.latitude]
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
            alert(station.properties.message);
        });
        new mapboxgl.Marker(markerEl)
        .setLngLat(station.geometry.coordinates)
        .addTo(map);
    });


};

async function getStations() {
    //const url = 'https://data-legacy.urbansharing.com/legacy-api/stations.json';
    const corsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://data-legacy.urbansharing.com/legacy-api/stations.json')}`;
    const response = await fetch(corsUrl);
    const result = await response.json();
    const stations = JSON.parse(result.contents);
    return stations.stations;
};

getMap();

/* // Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
.setLngLat([10.77, 59.92])
.addTo(map);
 
// Create a default Marker, colored black, rotated 45 degrees.
const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 90 })
.setLngLat([10.78, 59.90])
.addTo(map); */
