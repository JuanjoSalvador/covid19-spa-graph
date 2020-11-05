let national = document.getElementById("national");
let autonomic = document.getElementById("autonomic");

let datasets = []
let stadistics;

let confirmed = document.querySelector('#confirmed');
let active = document.querySelector('#active');
let deaths = document.querySelector('#deaths');
let last_date = document.querySelector('#last_date');

// Nacional
d3.csv('https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/nacional_covid19.csv').then(makeChartNational);

function makeChartNational(stadistics) {
    let stadistics_little = []
    stadistics.map(function(d,i) { if (i >= stadistics.length - 60) stadistics_little.push(d)})

    let dataLabels = stadistics_little.map(function(d) {
        let date = d.fecha.split('-')
        return date[2] + "/" + date[1] + "/" + date[0]
    });

    let dataset_confirmed = {
        label: "Casos confirmados",
        data: stadistics_little.map(function(d, i) { if (i >= stadistics_little.length - 60) return d.casos_pcr }),
        fill: false,
        borderColor: 'lightblue',
        lineTension: 0
    };

    let datasets_hospitalized = {
        label: "Hospitalizados",
        data: stadistics_little.map(function(d,i) { if (i >= stadistics_little.length - 60) return d.hospitalizados }),
        fill: false,
        borderColor: 'rgba(255,255,0, 0.5)',
        lineTension: 0
    };

    let dataset_deaths = {
        label: "Fallecimientos",
        data: stadistics_little.map(function(d,i) { if (i >= stadistics_little.length - 60) return d.fallecimientos }),
        fill: false,
        borderColor: 'rgba(240,0,0,0.5)',
        lineTension: 0
    };

    last_date.innerHTML = dataLabels[dataLabels.length - 1];
    confirmed.innerHTML = dataset_confirmed.data[dataset_confirmed.data.length - 1];
    hospitalized.innerHTML = datasets_hospitalized.data[datasets_hospitalized.data.length - 1];
    deaths.innerHTML = dataset_deaths.data[dataset_deaths.data.length - 1];

    new Chart(national, {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: [
                dataset_confirmed, 
                datasets_hospitalized,
                dataset_deaths, 
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 15,
                    fontColor: 'black'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:false
                    }
                }]
            }
        }
    })
}