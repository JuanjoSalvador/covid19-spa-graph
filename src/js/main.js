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

    let dataLabels = stadistics.map(function(d) {
        let date = d.fecha.split('-')
        return date[2] + "/" + date[1] + "/" + date[0]
    });

    let dataset_confirmed = {
        label: "Casos confirmados",
        data: stadistics.map((d) => d.casos_pcr),
        fill: false,
        borderColor: 'lightblue',
        lineTension: 0
    };

    let datasets_actives = {
        label: "Casos activos",
        data: stadistics.map((d) => d.casos_pcr - d.fallecimientos),
        fill: false,
        borderColor: 'rgba(147,112,219, 0.5)',
        lineTension: 0
    };

    let dataset_deaths = {
        label: "Fallecimientos",
        data: stadistics.map((d) => d.fallecimientos),
        fill: false,
        borderColor: 'rgba(240,0,0,0.5)',
        lineTension: 0
    };

    let dataset_healed = {
        label: "Recuperados",
        data: stadistics.map((d) => d.altas),
        fill: false,
        borderColor: 'rgba(0,240,0,0.5)',
        lineTension: 0
    };

    last_date.innerHTML = dataLabels[dataLabels.length - 1];
    confirmed.innerHTML = dataset_confirmed.data[dataset_confirmed.data.length - 1];
    active.innerHTML = datasets_actives.data[datasets_actives.data.length - 1];
    deaths.innerHTML = dataset_deaths.data[dataset_deaths.data.length - 1];

    new Chart(national, {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: [
                dataset_confirmed, 
                datasets_actives,
                dataset_deaths, 
                /*dataset_healed, */ 
            ]
        },
        options: {
            responsive: true,
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