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

// Get the modal
const cardSpace = document.getElementById("spaceForCards");
const chartSpace = document.getElementById("chartSpace")

let cardsOpen = false;
const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSn415MNwpNpFmQyxj2WbVnRJSDx85ki66G7zrcfeHpl8DSiErm9xD8psQxTwbPAzDLQeRMI8kF6eR/pub?output=csv"

const colors = {
yesSupport: '#0038a7',
noSupport: '#ce1127',
unsureSupport: '#fecb00'
}