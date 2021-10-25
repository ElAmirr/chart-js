const api = {
    key: "7d599ce045a697247a327dd3f4029960",
    basurl: "https://maps.openweathermap.org/maps/2.0/weather/TA2",
    iconurl: 'http://openweathermap.org/img/wn/'  
}

window.addEventListener("load", () => {
    let long;
    let lat;
    let alt;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            alt = position.coords.altitude;

            console.log(long);
            console.log(alt);
            console.log(lat);


            fetch(`${api.basurl}/${lat}/${long}/${alt}?appid=${api.key}`)
                .then(responce => {
                    return responce.json();
                })
                .then(apidata => {
                    console.log(apidata);
                });
            });
        }
    });