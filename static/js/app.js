// Set Variable for sample data
var sample_data = './samples.json'

// Create funtion to import data and create dropdown listing of all names
function init() {
    d3.json("/api/v1.0/injury_details").then(
        function (data) {
            var injury_body_part = data.map(elem => elem.injury_body_part);
            console.log(injury_body_part);
        });
};

init();