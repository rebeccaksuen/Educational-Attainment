// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':7}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// more variables
let supportReceived = 0; //chart variables
let supportNotReceived = 0; 
let supportUnsure = 0;

let theChart;
let yesSupport = L.featureGroup(); // layer and map toggle variables
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

// add polygons to map if have time

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
    createButton(data.lat,data.lng,data['affectApplication'])
    createButton(data.lat,data.lng,data['affectSuccess'])
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

            labels: ["Received Family Support","Did Not Receive Family Support", "Unsure"],
            datasets: [
                {
                label: "Count",
                backgroundColor: ["#0038a7", "#ce1127", "#fecb00"],
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
// chart interaction 
// then we also want to be able to toggle with a flag (if true -> false; if false -> true)
    document.getElementById("chart").onclick = function (evt) {
        var activePoints = theChart.getElementsAtEventForMode(evt, 'point', theChart.options);
        var firstPoint = activePoints[0];
        // console.log(activePoints[0].index)
        var label = theChart.data.labels[activePoints[0].index];
        // var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        console.log(label)
        // showButtons() //run the function
    };
// when toggle -> pop up corresponding responses and a back button? corresponding layer changes on map too
// so need if then for the function

// 1. making the buttons that will pop up with the responses on them
    function createButton(lat,lng,title){
        const newButton = document.createElement("button")
        newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng], 8); 
    })
    const spaceForButtons = document.getElementById('storyButtons')
    document.body.appendChild(newButton);

}

//eventListener when click -> show buttons 
    document.getElementById("chart").addEventListener("click",showButtons) 
    
    // how to specify parts on the chart?
    let chartTriggers ={
        "chart":"",
        "Received Family Support": "yesSupportLayer",
        "Did Not Receive Family Support": "noSupportLayer",
        "Unsure": "unsureSupportLayer"
    }
    let yesSupportLayer ={
        //map layer
        //button type
        //title
    }
// similar to Tax Evaders changeCharts function
    function chartTrigger(target){
        chart = target;
        console.log('switch layer' + chart)
        let storyLayer = chartTriggers[target]
        switchLayer(target,storyLayer)
        // let storyButtons = document.getElementById("storyButtons");
        // storyButtons.style.display = "block";
        }
