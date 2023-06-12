// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);
// toggle variables for chart from survey
let supportReceived = 0;
let supportNotReceived = 0; 
let supportUnsure = 0;

let theChart


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                return layer.feature.properties.place;
            }).addTo(map);
    })

    // map points
    const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSn415MNwpNpFmQyxj2WbVnRJSDx85ki66G7zrcfeHpl8DSiErm9xD8psQxTwbPAzDLQeRMI8kF6eR/pub?output=csv"

    // create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2>`)
    return message
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

    //step 4 still in progress
    function processData(results){
        console.log(results)
        results.data.forEach(data => {
            console.log(data)
            addMarker(data.lat,data.lng,data['Where is your hometown?'])
            filterSupportResponses(data.supportReceived)
        })
        addChart()
    };

    loadData(dataUrl)

//add legend here?
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
                backgroundColor: ["green", "red", "yellow"],
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




