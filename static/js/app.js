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

            console.log(bodypart);
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
                width: 600,
                showlegend: false,
                grid: { rows: 1, columns: 2 }
            };

            Plotly.newPlot('pie', data, layout);

        }
        )
    }
    )
};

function BuildHoriBar(id) {
    d3.json("/api/v1.0/incident_details").then(data => {
        var labellist = {};
        var graphInfo1 = data;
        graphInfo1 = graphInfo1.filter(row => row.mine_id == id);
        graphInfo1.forEach(i => {
            if (i.incident_category in labellist) { labellist[i.incident_category] += 1; }
            else { labellist[i.incident_category] = 1; }
        });
        var traceBar = {
            x: Object.keys(labellist),
            y: Object.values(labellist),
            type: "bar",
            marker: {color: 'gold', opacity: 0.6}
        };

        var dataBar = [traceBar];
        var layoutBar = {
            title: "Top Incident Categories"
        };
        Plotly.newPlot("hbar", dataBar, layoutBar);

    });
}



function optionChanged(id) {
    DemographicInfo(id);
    BuildHoriBar(id);
    buildPie(id);
};


