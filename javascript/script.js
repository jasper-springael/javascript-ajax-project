


 document.querySelector("#submit-button").addEventListener("click", function() {
    
    let inputLat = document.querySelector("#inputLat").value;
    let inputLng = document.querySelector("#inputLng").value;
    let inputDate = document.querySelector("#inputDate").value;
    let defaultLatLondon = "51.507351";
    let defaultLngLondon = "-0.127758";
    let city="default";
    
    // function deciding between default or input date
    let usedDate;
    (function chooseDate() {
        let defaultDate;
        if (inputDate == null || inputDate == "") {
            (function findDefaultDate(){
                let newDate = new Date();
                defaultDate = `${newDate.getFullYear()}-${(newDate.getMonth())-1}`;
                console.log((defaultDate));
                return defaultDate;
            })();
            usedDate = defaultDate;
        } else usedDate = inputDate;
    })();

    // function deciding between default or input latitude
    let usedLat;
    (function chooseLat() {
        if (inputLat == null || inputLat == "") {
            usedLat = defaultLatLondon;
            return usedLat;
        } else return usedLat = inputLat;
    })();
    
    // function deciding between default or input longitude
    let usedLng;
    (function chooseLng() {
        if (inputLng == null || inputLng == "") {
            usedLng = defaultLngLondon;
        } else usedLng = inputLng;
    })();
    
     fetch(`https://data.police.uk/api/crimes-at-location?date=${usedDate}&lat=${usedLat}&lng=${usedLng}`)
    .then (response => response.json())
    .then (data => {
        console.log(data);
        console.log(usedDate);
        console.log(usedLat);
        console.log(usedLng);

        let resultsDomContainer = document.querySelector("#crime-event-results-container")
        // creates a "results" header in the DOM 
        let resultsHeader = document.createElement("h2");
        let resultsHeaderTn = document.createTextNode(`Results for:${city}`);
        resultsHeader.appendChild(resultsHeaderTn);
        resultsDomContainer.appendChild(resultsHeader);
        
        //function that gets results out of data list, 1 by 1.
        (function showResults(){
            for(let i=0;i<data.length;i++) {
                let typeOfCrime = `${data[i]["category"]}`;
                console.log(typeOfCrime);
                let typeOfNeighbourhood = `${data[i]["location"]["street"]["name"]}`;
                console.log(typeOfNeighbourhood);
                let typeOfOutcome = `${data[i]["outcome_status"]["category"]}`;
                console.log(typeOfOutcome);
                makeElements();
            }
        })();

        (function makeElements(){
            let resultsDiv = document.createElement("div");
            let typeOfNeighbourhoodTn = document.createTextNode(`${typeOfNeighbourhood}`);
            let typeOfCrimeTn = document.createTextNode(`${typeOfCrime}`);
            let typeOfOutcomeTn = document.createTextNode(`${typeOfOutcome}`);
            resultsDiv.appendChild(typeOfNeighbourhoodTn);
            resultsDiv.appendChild(typeOfCrimeTn);
            resultsDiv.appendChild(typeOfOutcomeTn);
            resultsDomContainer.appendChild(resultsDiv);

        })();
       
    })
    .catch(err => console.error(err));
});
