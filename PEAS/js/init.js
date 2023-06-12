// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// more variables
let supportReceived = 0; //chart variables
let supportNotReceived = 0; 
let supportUnsure = 0;

let theChart;

let yesSupport = L.featureGroup(); //map toggle variables
let noSupport = L.featureGroup();
let unsureSupport = L.featureGroup();

let layers = {
    "Received Family Support": yesSupport,
    "Did Not Receive Family Support": noSupport,
    "Unsure if Received Family Suport": unsureSupport
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    // map points
    const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSn415MNwpNpFmQyxj2WbVnRJSDx85ki66G7zrcfeHpl8DSiErm9xD8psQxTwbPAzDLQeRMI8kF6eR/pub?output=csv"

    // create a function to add markers & layer stuff
function addMarker(data){
    if(data['supportReceived']=="Yes"){
        yesSupport.addLayer(L.circleMarker([data.lat,data.lng]))
        circleOptions.fillColor="blue"
    }
    if (data['supportReceived']=="No"){
        circleOptions.fillColor="red"
        noSupport.addLayer(L.circleMarker([data.lat,data.lng]))
    }
    if (data['supportReceived']=="I am unsure."){
        circleOptions.fillColor="yellow"
        unsureSupport.addLayer(L.circleMarker([data.lat,data.lng]))
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
            addMarker(data.lat,data.lng,data['Where is your hometown?'])
            filterSupportResponses(data.supportReceived)
        })
        addChart()
        // layer stuff
        yesSupport.addTo(map)
        noSupport.addTo(map)
        unsureSupport.addTo(map)
        let allLayers = L.featureGroup([yesSupport,noSupport,unsureSupport]);
        map.fitBounds(allLayers.getBounds());
    }
    loadData(dataUrl)

//toggle layers code

    // adding chart here (step 5 on prof al's tutorial)
    // function addChart(){
    //     new chart(document.getElementById("chart"), { 
    //         type: 'pie',
    //         data: {
    //             labels:["Received Family Support", "Did Not Receive Family Support", "Unsure if Received Family Support"],
    //             datasets: [
    //                 {
    //                     label: "count",
    //                     backgroundColor: ["red", "blue", "yellow"],
    //                     data: [supportReceived, supportNotReceived, supportUnsure]
    //                 }
    //             ]

    //         },
    //     })
    // }

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

    document.getElementById("chart").onclick = function (evt) {
        var activePoints = theChart.getElementsAtEventForMode(evt, 'point', theChart.options);
        var firstPoint = activePoints[0];
        // console.log(activePoints[0].index)
        var label = theChart.data.labels[activePoints[0].index];
        // var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        console.log(label)
        doSomethingWithChart(label)
    };

    function doSomethingWithChart(label){
        let chartTitle = document.getElementById("chart-title") // do if statements for chart labels -> turn into map layer
        chartTitle.innerHTML = label
    }




