const api = {
    key: "7d599ce045a697247a327dd3f4029960",
    basurl: "https://pro.openweathermap.org/data/2.5/forecast/hourly?",
    iconurl: 'http://openweathermap.org/img/wn/'  
}

window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            fetch(`${api.basurl}lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
                .then(responce => {
                    return responce.json();
                })
                .then(apidata => {
                    const d = new Date();
                    let hour = d.getHours();
                    let dataX = [];
                    let dataY = [];
                    for(i=0; i <= 23; i++) {
                        dataY.push(apidata.list[i].main.temp);
                        
                        dataX.push((hour+i + ''));
                    }
                        console.log(dataY);
                        
                    const ctx = document.querySelector('#myChart').getContext('2d');
                    let delayed

                    //Gradient Fill 
                    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, "rgba(54,123,213,1)");
                    gradient.addColorStop(1, "rgba(0,210,255,0.3)");

                    const data = {
                        dataX,
                        datasets: [
                            {
                                data: dataY,
                                label: "weather temperature",
                                fill: true,
                                backgroundColor: gradient,
                                borderColor: "#000",
                                pointBackgroundColor: "#fff",
                                tension: 0.4,
                            },
                        ],
                    };
                    const config = {
                        type: "line",
                        data: data,
                        options: {
                            radius: 5,
                            hitRadius: 30,
                            hoverRadius: 12,
                            responsive: true,
                            animation: {
                                onComplete: () => {
                                  delayed = true;
                                },
                                delay: (context) => {
                                  let delay = 0;
                                  if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                                  }
                                  return delay;
                                },
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        callback: function (dataY) {
                                            return dataY + "°C";
                                        },
                                    },
                                },
                            },
                            
                        },
                    };
                    
                    const myChart = new Chart(ctx, config);
                });
            });
        }
    });