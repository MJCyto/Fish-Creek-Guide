var weather;


function navigate(selectedDiv) {
    const conditionsDiv = document.getElementById('conditionsLink');
    const wildlifeDiv = document.getElementById('wildlifeLink');
    const trailsDiv = document.getElementById('trailsLink');
    const maintenanceDiv = document.getElementById('maintenanceLink');
    const conditionsContent = document.getElementById('conditionsContent');
    const wildlifeContent = document.getElementById('wildlifeContent');
    const maintenanceContent = document.getElementById('maintenanceContent');
    const navBar = document.getElementById('navBar');
    const weatherNav = document.getElementById('weatherNav');
    const logoLink = document.getElementById('logoLink');
    const mapDiv = document.getElementById('mapDiv');
    const allTrails = document.querySelectorAll('polyline');

    for (let i = 0; i < allTrails.length; i++){
        allTrails[i].classList.add('trailLine');
        allTrails[i].classList.remove('trailLineOrange');
    }

    const trailSections = document.querySelectorAll('.trailInfo');

    for (let i = 0; i < trailSections.length; i++){
        trailSections[i].style.height = '0'
    }

    conditionsContent.style.height = '0';
    wildlifeContent.style.height = '0';
    maintenanceContent.style.height = '0';
    mapDiv.style.height = '0';

    if (selectedDiv === logoLink){
        conditionsDiv.style.width = '25vw';
        wildlifeDiv.style.width = '25vw';
        trailsDiv.style.width = '25vw';
        maintenanceDiv.style.width = '25vw';
        navBar.style.height = '83vh';
        weatherNav.style.display = 'flex';
        weatherNav.style.opacity = '1';

    }
    else {
        weatherNav.style.display = 'none';
        weatherNav.style.opacity = '0';
        conditionsDiv.style.width = '33.33vw';
        wildlifeDiv.style.width = '33.33vw';
        trailsDiv.style.width = '33.33vw';
        maintenanceDiv.style.width = '33.33vw';

        navBar.style.height = '100px';

        switch (selectedDiv) {
            case (conditionsDiv):
                conditionsDiv.style.width = '0';
                conditionsContent.style.height = '63vh';
                break;

            case (wildlifeDiv):
                wildlifeDiv.style.width = '0';
                wildlifeContent.style.height = '63vh';
                break;

            case (trailsDiv):
                trailsDiv.style.width = '0';
                mapDiv.style.height = '600px';
                break;

            case (maintenanceDiv):
                maintenanceDiv.style.width = '0';
                maintenanceContent.style.height = '63vh';
                break;

        }
    }
}

function getWeather() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Calgary,ca&APPID=ae895e97d569b50fd4fa9a56923734cd");
    xhr.addEventListener("load", processResponse);
    xhr.send();
}

function processResponse() {
    weather = JSON.parse(this.responseText);
    const weatherNav = document.getElementById('weatherNav');
    let currTempElement = document.createElement('h2');
    let highTempElement = document.createElement('h3');
    let lowTempElement = document.createElement('h3');
    const currTemp = (Number(weather.main.temp) - 273.15).toFixed(0) + " °C";
    const lowTemp = "Low: " + (Number(weather.main.temp_min) - 273.15).toFixed(0) + " °C";
    const highTemp = "High: " + (Number(weather.main.temp_max) - 273.15).toFixed(0) + " °C";

    currTempElement.innerHTML = currTemp;
    highTempElement.innerHTML = highTemp;
    lowTempElement.innerHTML = lowTemp;

    weatherNav.append(currTempElement, highTempElement, lowTempElement);

    weatherNav.className = 'fade';
    console.log(weather);
    console.log(weather.main.temp);
}

function trailClicked(callingTrail) {
    const allTrails = document.querySelectorAll('polyline');
    const zooms = document.getElementById('zooms');
    const expandIcon = document.getElementById('expandIcon');

    expandIcon.style.width = '150px';

    for (let i = 0; i < allTrails.length; i++){
        allTrails[i].classList.add('trailLine');
        allTrails[i].classList.remove('trailLineOrange');
    }

    zooms.style.top = '30px';
    const containedTrail = callingTrail.querySelectorAll('*');
    const trailSections = document.querySelectorAll('.trailInfo');
    const mapDiv = document.getElementById('mapDiv');
    const interactiveMap = document.getElementById('interactiveMap');

    // callingTrail.firstElementChild.style.stroke = '#F05A28';

    containedTrail[0].classList.add("trailLineOrange");
    containedTrail[0].classList.remove("trailLine");

    trailSections[0].style.height = 'auto';
    mapDiv.style.height = '300px';
    interactiveMap.style.top = '-500px';
}

function zoomMap(callingButton) {
     const buttons = document.querySelectorAll('.zoomButton');
     const dragDiv = document.getElementById('draggable');
     let zoom = parseInt(getComputedStyle(dragDiv).width);

     console.log(zoom);

     if (buttons[0] === callingButton){
         if (zoom < 8000) {
             dragDiv.style.width = zoom + 500 + 'px';
         }
     }
     else {
         if (zoom > 1380) {
             dragDiv.style.width = zoom - 500 + 'px';
         }
     }
}

function expandMap() {
    const allTrails = document.querySelectorAll('polyline');
    const trailSections = document.querySelectorAll('.trailInfo');
    const mapDiv = document.getElementById('mapDiv');
    const expandIcon = document.getElementById('expandIcon');

    expandIcon.style.width = '0';

    mapDiv.style.height = '600px';

    for (let i = 0; i < allTrails.length; i++){
        allTrails[i].classList.remove('trailLineOrange');
        allTrails[i].classList.add('trailLine');
    }

    for (let i = 0; i < trailSections.length; i++){
        trailSections[i].style.height = '0'
    }
}