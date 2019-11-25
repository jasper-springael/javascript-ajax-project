function createResults () { 
    let inputLat = document.querySelector("#inputLat").value;
    let inputLng = document.querySelector("#inputLng").value;
    let inputDate = document.querySelector("#inputDate").value;
    let defaultLatLondon = "51.507351";
    let defaultLngLondon = "-0.127758";
    let inputCity= document.querySelector("#inputCity").value;
    let defaultCity="London";
    
    // functio deciding between default or input city
    let usedCity;
    (function chooseLat() {
        if (inputCity == null || inputCity == "") {
            usedCity= defaultCity;
            return usedCity;
        } else return usedCity = inputCity;
    })();
    // function deciding between default or input date
    let usedDate;
    (function chooseDate() {
        let defaultDate;
        if (inputDate == null || inputDate == "") {
            (function findDefaultDate(){
                let newDate = new Date();
                defaultDate = `${newDate.getFullYear()}-${(newDate.getMonth())-1}`;
                return defaultDate;
            })();
            usedDate = defaultDate;
            console.log(usedDate);
        } else {
            usedDate = inputDate;
            console.log(usedDate);
        }
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
        let resultsHeaderTn = document.createTextNode(`Results for: ${usedCity}`);
        let resultsContainer = document.createElement("div");
        resultsContainer.className="results-container"
        resultsHeader.appendChild(resultsHeaderTn);
        resultsDomContainer.appendChild(resultsHeader);
        resultsDomContainer.appendChild(resultsContainer);

        
        // creating elements in the DOM and groups them into a div
        // a b c are passed from below in showResults 
        function makeElements(a, b, c){
            let resultsDiv = document.createElement("div");
            resultsDiv.className ="result";
            let resultsDivCrime= document.createElement("div");
            resultsDivCrime.className = "resultChild"
            let typeOfCrimeHeader= document.createElement("h3");
            let typeOfCrimeHeaderTn= document.createTextNode(`Type of crime: `);
            let typeOfCrimeP = document.createElement("p");
            typeOfCrimeP.textContent= `${a}`;
            let resultsDivNeighbourhood= document.createElement("div");
            resultsDivNeighbourhood.className = "resultChild"
            let typeOfNeighbourhoodHeader= document.createElement("h3");
            let typeOfNeighbourhoodHeaderTn= document.createTextNode(`In the vicinity of: `);
            let typeOfNeighbourhoodP = document.createElement("p");
            typeOfNeighbourhoodP.textContent= `${b}`;
            let resultsDivOutcome= document.createElement("div");
            resultsDivOutcome.className = "resultChild"
            let typeOfOutcomeHeader= document.createElement("h3");
            let typeOfOutcomeHeaderTn= document.createTextNode(`Current status: `);
            let typeOfOutcomeP = document.createElement("p");
            typeOfOutcomeP.textContent= `${c}`;
            typeOfCrimeHeader.appendChild(typeOfCrimeHeaderTn);
            resultsDivCrime.appendChild(typeOfCrimeHeader);
            resultsDivCrime.appendChild(typeOfCrimeP);
            resultsDiv.appendChild(resultsDivCrime);
            typeOfNeighbourhoodHeader.appendChild(typeOfNeighbourhoodHeaderTn);
            resultsDivNeighbourhood.appendChild(typeOfNeighbourhoodHeader);
            resultsDivNeighbourhood.appendChild(typeOfNeighbourhoodP);
            resultsDiv.appendChild(resultsDivNeighbourhood);
            typeOfOutcomeHeader.appendChild(typeOfOutcomeHeaderTn);
            resultsDivOutcome.appendChild(typeOfOutcomeHeader);
            resultsDivOutcome.appendChild(typeOfOutcomeP);
            resultsDiv.appendChild(resultsDivOutcome);
            resultsContainer.appendChild(resultsDiv);
        };
        //function that gets results out of data list, 1 by 1.
        (function showResults(){
            for(let i=0;i<data.length;i++) {
                let typeOfCrimePre = `${data[i]["category"]}`;
                typeOfCrimePre = typeOfCrimePre.split("-").join(" ");
                const typeOfCrime = typeOfCrimePre.charAt(0).toUpperCase() + typeOfCrimePre.substring(1);
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
    }


 document.querySelector("#submit-button").addEventListener("click", function() {
    let nodes=document.querySelector("#crime-event-results-container");
    if (nodes == "" || nodes == null) {
        createResults();
    } else {
        while (nodes.firstChild) nodes.removeChild(nodes.firstChild);
        createResults();

    }

});

