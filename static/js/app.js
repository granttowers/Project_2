// // Create funtion to import data and create dropdown listing of all names
// function init() {
//     d3.json("/api/v1.0/injury_details").then(
//         function (data) {
//             var injury_body_part = data.map(elem => elem.injury_body_part);
//             console.log(injury_body_part);
//         });
// };

// init();

function init() {
    // Select the frop down menu from the html file
    var dropDownMenu = d3.select("#selDataset")
    d3.json("/api/v1.0/company_details").then(data => {

        var IDName = data[0].mine_id;
        data.forEach(d => dropDownMenu
            .append('option')
            .text(d.mine_id)
            .property('value', d.mine_id))
    });
};

function DemographicInfo(id) {
    var panel = d3.select("#sample-metadata");
    panel.html("");
    d3.json("/api/v1.0/company_details").then(data => {
        var demInfo = data;
        demInfo = demInfo.filter(row => row.mine_id == id);
        Object.entries(demInfo[0]).forEach(([key, value]) => {
            panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}
init();




// Chart.js Details

function BuildPlots(id) {
    d3.json("/api/v1.0/incident_details").then(data => {
        console.log(data);
        //var data1 = ;
        var label1 = data.map(function(index){
            return index.incident_catergory;
        }); 
        console.log(label1);
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255,99,132,1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });
}
)};


function optionChanged(id) {
    DemographicInfo(id);
    BuildPlots();
};