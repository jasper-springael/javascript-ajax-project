


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

        let resultsDomContainer = document.querySelector("#crime-event-results-container"); 
        // creating a "results" header in the DOM 
        let resultsHeader = document.createElement("h2");
        let resultsHeaderTn = document.createTextNode(`Results for:${city}`);
        let resultsContainer = document.createElement("div");
        resultsContainer.className=".results-container"
        resultsHeader.appendChild(resultsHeaderTn);
        resultsDomContainer.appendChild(resultsHeader);
        resultsDomContainer.appendChild(resultsContainer);
        
        // creating elements in the DOM and groups them into a div
        // a b c are passed from below in showResults 
        function makeElements(a, b, c){
            let resultsDiv = document.createElement("div");
            resultsDiv.className =".result";
            let typeOfCrimeTn = document.createTextNode(`${a}`);
            let typeOfNeighbourhoodTn = document.createTextNode(`${b}`);
            let typeOfOutcomeTn = document.createTextNode(`${c}`);
            resultsDiv.appendChild(typeOfCrimeTn);
            resultsDiv.appendChild(typeOfNeighbourhoodTn);
            resultsDiv.appendChild(typeOfOutcomeTn);
            resultsContainer.appendChild(resultsDiv);
        };
        //function that gets results out of data list, 1 by 1.
        (function showResults(){
            for(let i=0;i<data.length;i++) {
                let typeOfCrime = `${data[i]["category"]}`;
                console.log(typeOfCrime);
                let typeOfNeighbourhood = `${data[i]["location"]["street"]["name"]}`;
                console.log(typeOfNeighbourhood);
                let typeOfOutcome = `${data[i]["outcome_status"]["category"]}`;
                console.log(typeOfOutcome);
                makeElements(typeOfCrime, typeOfNeighbourhood,typeOfOutcome); // important. these are abc (or any name) in makeElements function. otherwise you get a not defined error because the scope is defined when the function is made, not when its called.
            }
            })();
        
    })
    .catch(err => console.error(err));
});
