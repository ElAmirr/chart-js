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
                    let labels = [];
                    let dataY11 = [];
                    let dataY12 = [];
                    let dataY13 = [];
                    let dataY2 = [];
                    for(i=0; i <= 23; i++) {
                        dataY11.push(apidata.list[i].main.temp);
                        dataY12.push(apidata.list[i].main.temp_max);
                        dataY13.push(apidata.list[i].main.temp_min);  
                        labels.push((hour+i)+ '');
                    }
                        console.log(dataY11);
                        console.log(dataY12);

                        console.log(labels);
                        
                    const ctx1 = document.querySelector('#myChart1').getContext('2d');
                    const ctx2 = document.querySelector('#myChart2').getContext('2d');

                    let delayed

                    //Gradient Fill 
                    let gradient = ctx1.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, "#44a08d");
                    gradient.addColorStop(1, "#093637");

                    const data1 = {
                        labels,
                        datasets: [
                            {
                                data: dataY11,
                                label: "Temperature",
                                fill: true,
                                borderColor: "#44a08d",
                                pointBackgroundColor: "#fff",
                                
                            },
                            {
                                data: dataY12,
                                label: "Temperature max",
                                fill: true, 
                                borderColor: '#000',
                            },
                            {
                                data: dataY13,
                                label: "Temperature min",
                                fill: true, 
                                borderColor: '#ffff00',
                            },
                        ],
                    };

                    for(i=0; i <= 23; i++) {
                        dataY2.push(apidata.list[i].pop); 
                    }
                        console.log(dataY2);
                        console.log(labels);

                    const data2 = {
                        labels,
                        datasets: [
                            {
                                data: dataY2,
                                label: "Precipitation",
                                backgroundColor: gradient,
                                borderColor: "#44a08d",
                                pointBackgroundColor: "#fff",
                                
                            },
                        ],
                    };

                    const config1 = {
                        type: "line",
                        data: data1,
                        options: {
                            radius: 0,
                            hitRadius: 30,
                            hoverRadius: 0,
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
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function (dataY11) {
                                            return dataY11 + "°C";
                                        },
                                    },
                                },
                            },
                            
                        },
                    };

                    const config2 = {
                        type: "bar",
                        data: data2,
                        options: {
                            radius: 0,
                            hitRadius: 30,
                            hoverRadius: 0,
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
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function (dataY2) {
                                            return dataY2 + "ml";
                                        },
                                    },
                                },
                            },
                            
                        },
                    };

                    const myChart1 = new Chart(ctx1, config1);
                    const myChart2 = new Chart(ctx2, config2);

                });
            });
        }
    });