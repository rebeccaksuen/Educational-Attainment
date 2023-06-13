
function addChart(){
    cardSpace.style.display = "none";
    chartSpace.style.display = "block";
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
    // console.log(label)
    chartTrigger(label)
    // showButtons() //run the function
};

//eventListener when click -> show buttons 
document.getElementById("chart").addEventListener("click",clickShowResponses) 
    
// similar to Tax Evaders changeCharts function
function chartTrigger(target){
    chart = target;
    console.log('switch layer' + chart)
    let storyLayer = layers[target]
    // console.log(storyLayer)
    onlyShowClickedLayer(storyLayer)
    chartSpace.style.display = "none";
    // event.target.remove("chart");
    // event.target.remove("chart-title");
    // document.getElementById("chart-title").innerHTML = "<h3>Survey Respondants</h3>";
    // clickShowResponses(storyLayer);
    }
    
// #2a hide pie chart (in createCharts.js)☑️
// #2b show button responses
// function clickShowResponses(thisLayer){
//     // var buttons = document.getElementById('storyButtons').hidden = true;
//     // buttons.style.display = "none";

//     // 2b-1 loop through this particular map layers's features
//     console.log(thisLayer)
//     thisLayer.eachLayer(function(layer){
//         console.log(layer.feature.properties)
//     })

// }

    // console.log('hide buttons')
    // console.log(storyLayer)



//add another event to get back to chart
function removeChartTrigger(){
    chart = outsideTarget;
}
