// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// more variables
let supportReceived = 0; //chart variables
let supportNotReceived = 0; 
let supportUnsure = 0;

let theChart;

let yesSupport = L.featureGroup(); // layer andmap toggle variables
let noSupport = L.featureGroup();
let unsureSupport = L.featureGroup();

let layers = {
    "Received Family Support": yesSupport,
    "Did Not Receive Family Support": noSupport,
    "Unsure": unsureSupport
}

let circleOptions = {
    radius: 5,
    fillColor: "#ff7800",
    color: "#",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    // map points
    const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSn415MNwpNpFmQyxj2WbVnRJSDx85ki66G7zrcfeHpl8DSiErm9xD8psQxTwbPAzDLQeRMI8kF6eR/pub?output=csv"

    // create a function to add markers & layer stuff
function addMarker(data){
    if(data['supportReceived']=="Yes"){
        circleOptions.fillColor="#0038a7"
        yesSupport.addLayer(L.circleMarker([data.lat,data.lng],circleOptions))
    }
    if (data['supportReceived']=="No"){
        circleOptions.fillColor="#ce1127"
        noSupport.addLayer(L.circleMarker([data.lat,data.lng],circleOptions))
    }
    if (data['supportReceived']=="I am unsure."){
        circleOptions.fillColor="#fecb00"
        unsureSupport.addLayer(L.circleMarker([data.lat,data.lng],circleOptions))
    }
    return data
}

    function loadData(url){
        Papa.parse(url, {
            header: true,
            download: true,
            complete: results => processData(results)
        })
    }
    
   // pie chart stuff UNDER HERE
    // toggle variables - variables - supportReceived (red), supportNotReceived (blue), supportUnsure (yellow)

    function filterSupportResponses(supportResponse){
        if (supportResponse=="Yes"){
           supportReceived +=1
           return
        }
        if (supportResponse=="No"){
            supportNotReceived +=1
            return
        }
        if (supportResponse=="I am unsure."){
            supportUnsure +=1
            return
        }
    };

    function processData(results){
        console.log(results)
        results.data.forEach(data => {
            console.log(data)
            addMarker(data)
            filterSupportResponses(data.supportReceived)
        })
        addChart();
        // layer stuff
        yesSupport.addTo(map)
        noSupport.addTo(map)
        unsureSupport.addTo(map)
        let allLayers = L.featureGroup([yesSupport,noSupport,unsureSupport]);
        map.fitBounds(allLayers.getBounds());
    }
    loadData(dataUrl)


    function addChart(){
        // create the new chart here, target the id in the html called "chart"
        theChart = new Chart(document.getElementById("chart"), {
            type: 'pie', //can change to 'bar','line' chart or others
            data: {
                // labels for data here
            labels: ["Received Family Support","Did Not Receive Family Support", "Unsure"],
            datasets: [
                {
                label: "Count",
                backgroundColor: ["blue", "red", "yellow"],
                data: [supportReceived,supportNotReceived,supportUnsure]
                }
            ]
            },
            options: {
                responsive: true, //turn on responsive mode changes with page size
                maintainAspectRatio: false, // if `true` causes weird layout issues
                legend: { display: true },
                title: {
                    display: true,
                    text: 'Survey Respondants'
                }
            }
        });
    }
// chart interaction --> when we clikc on the each section, we want to change the chart title to the label, and the map layer to match the label
// then we also want to be able to toggle with a flab (if true -> false; if false -> true)
    document.getElementById("chart").onclick = function (evt) {
        var activePoints = theChart.getElementsAtEventForMode(evt, 'point', theChart.options);
        var firstPoint = activePoints[0];
        // console.log(activePoints[0].index)
        var label = theChart.data.labels[activePoints[0].index];
        // var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        console.log(label)
        doSomethingWithChart(SupportResponses) //run the function
    };

    function doSomethingWithChart(SupportResponses){
        let chartLayer = document.getElementById("layers") // do if statements for chart labels -> turn into map layer
        chartLayer.innerHTML = 
        element.classList.toggle("chart-title");
    }




