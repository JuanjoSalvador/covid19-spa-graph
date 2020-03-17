let national = document.getElementById("national");

d3.csv('https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/nacional_covid19.csv')
  .then(makeChartNational);

function makeChartNational(stadistics) {
    let dataLabels = stadistics.map(function(d) {
        return d.fecha;
    });

    let dataset_confirmed = {
        label: "Casos confirmados",
        data: stadistics.map((d) => d.casos),
        fill: false,
        borderColor: 'lightblue',
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

    let chart = new Chart(national, {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: [dataset_confirmed, dataset_deaths, dataset_healed]
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
                        beginAtZero:true
                    }
                }]
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: false,
                        mode: 'xy'
                    },
                    zoom: {
                        enabled: false,
                        mode: 'xy',
                    }
                }
            }
        }
    })
}