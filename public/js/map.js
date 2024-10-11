let mapToken = mapToken1;
console.log(mapToken);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 6 // starting zoom
});



// let coordinate1= coordinates;
const marker2 = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates) // Set the longitude and latitude for the marker
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // Create the popup with an offset
            .setHTML(`
            <div style="background-color: #f0f8ff ; border-radius: 15px; text-align: center;">
                <h3 style="margin: 0; font-size: 13px;">Your adventure begins here !</h3>
            </div>
        `)
    )
    .addTo(map); // Add the marker to the map

