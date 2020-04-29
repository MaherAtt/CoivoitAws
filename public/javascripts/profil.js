$("#voir_com").click(function(){
    $("#Modalavis").modal("show");
});

/* graphe répertoriant le Nombre de trajet par mois*/

var ctxL = $('#lineChart');
var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Nombre de trajet par mois en 2020",
            data: [0, 5, 2, 10, 3, 7, 10],
            backgroundColor: [
                'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
                'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true
    }
});

