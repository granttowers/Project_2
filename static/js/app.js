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

// Refresh the Mine information for each operator as you select it
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

// Get Data for the "Injuries by Body Part and Nature Pie Charts" 
function buildPie(id) {
    d3.json("/api/v1.0/injury_details").then(data => {
        var bodypart = {};
        var graphInfo = data;
        graphInfo = graphInfo.filter(row => row.mine_id == id);
        graphInfo.forEach(i => {
            if (i.injury_body_part in bodypart) { bodypart[i.injury_body_part] += 1; }
            else { bodypart[i.injury_body_part] = 1; }
        });
        d3.json("/api/v1.0/injury_details").then(data => {
            var nature = {};
            var graphInfo = data;
            graphInfo = graphInfo.filter(row => row.mine_id == id);
            graphInfo.forEach(i => {
                if (i.injury_nature in nature) { nature[i.injury_nature] += 1; }
                else { nature[i.injury_nature] = 1; }
            });

            // Plot the "Injuries by Body Part and Nature Pie Charts"
            var data = [{
                values: Object.values(bodypart),
                labels: Object.keys(bodypart),
                domain: { column: 0 },
                name: 'Injuries by Body Part',
                hoverinfo: 'label+percent',
                hole: .4,
                type: 'pie'
            }, {
                values: Object.values(nature),
                labels: Object.keys(nature),
                text: '',
                textposition: 'inside',
                domain: { column: 1 },
                name: 'Injuries by Nature',
                hoverinfo: 'label+percent',
                hole: .4,
                type: 'pie'
            }];


            var layout = {
                title: 'Injuries by Body Part and Nature',
                annotations: [
                    {
                        font: {
                            size: 20
                        },
                        showarrow: false,
                        text: "",
                        x: 0.17,
                        y: 0.5
                    },
                    {
                        font: {
                            size: 20
                        },
                        showarrow: false,
                        text: "",
                        x: 0.82,
                        y: 0.5
                    }
                ],
                height: 400,
                width: 540,
                showlegend: false,
                grid: { rows: 1, columns: 2 }
            };

            Plotly.newPlot('pie', data, layout);

        }
        )
    }
    )
};

// Get Data for the "Top Incident Categories"
function BuildHoriBar(id) {
    d3.json("/api/v1.0/incident_details").then(data => {
        var labellist = {};
        var graphInfo1 = data;
        graphInfo1 = graphInfo1.filter(row => row.mine_id == id);
        graphInfo1.forEach(i => {
            if (i.incident_category in labellist) { labellist[i.incident_category] += 1; }
            else { labellist[i.incident_category] = 1; }
        });

        // Plot the "Injuries by Body Part and Nature Pie Charts"
        var traceBar = {
            x: Object.keys(labellist),
            y: Object.values(labellist),
            type: "bar",
            marker: { color: 'gold', opacity: 0.6 }
        };

        var dataBar = [traceBar];
        var layoutBar = {
            title: "Incident Types"
        };
        Plotly.newPlot("hbar", dataBar, layoutBar);
    });
}

// Get Data for the "Line Graph by Month"
function line(id) {
    d3.json("/api/v1.0/incident_details").then(data => {
        var labellist2 = {};
        var line = data;
        line = line.filter(row => row.mine_id == id);
        line.forEach(i => {
            if (i.incident_month in labellist2) { labellist2[i.incident_month] += 1; }
            else { labellist2[i.incident_month] = 1; }
        });
        console.log(Object.keys(labellist2))
        console.log(Object.values(labellist2))

        var linekey = Object.keys(labellist2)
        var linevalue = Object.values(labellist2)

        // Plot the "Line Graph by Month"
        let chart = new frappe.Chart("#line", { // or DOM element
            data: {
                labels: linekey,

                datasets: [
                    {
                        // chartType: 'line',
                        values: linevalue
                    }
                ],
                // yMarkers: [{
                //     label: "Marker", value: 20,
                //     options: { labelPos: 'left' }
                // }],
                // yRegions: [{
                //     label: "Region", start: 0, end: 20,
                //     options: { labelPos: 'right' },
                //     regionFill: 1
                // }]
            },

            title: "Total Incidents by Month",
            type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
            height: 400,
            colors: ['yellow'],
            
            lineOptions: {
                dotSize: 12 // default: 4
            },
            tooltipOptions: {
                formatTooltipX: d => (d + ''),
                formatTooltipY: d => d + ' incidents',
            }
        });
    }
    )
};



function optionChanged(id) {
    DemographicInfo(id);
    BuildHoriBar(id);
    line(id);
    buildPie(id);
};