async function getGeometry(location, country) {
    const query = `${location}, ${country}`;
    const response = await mapboxClient.forwardGeocode({
        query: query,
        limit: 1,
    }).send();

    if (response.body.features.length > 0) {
        return response.body.features[0].geometry;
    } else {
        console.error(`No coordinates found for ${query}`);
        return null;
    }
}
