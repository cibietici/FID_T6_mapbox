const mapbox_key = 'pk.eyJ1IjoiY2liaWV0aWNpIiwiYSI6ImNrenM1Z2gwdjZ6aHUydm16dzBldXJmcjIifQ.ugFvlWIvOLmyqr7v__e_Ug';

mapboxgl.accessToken = mapbox_key;
const map = new mapboxgl.Map(
    {
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [10.75, 59.91], // starting position [lng, lat]
        zoom: 14 // starting zoom
    }
);

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
.setLngLat([10.77, 59.92])
.addTo(map);
 
// Create a default Marker, colored black, rotated 45 degrees.
const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 90 })
.setLngLat([10.78, 59.90])
.addTo(map);