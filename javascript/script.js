


 document.querySelector("#submit-button").addEventListener("click", function() {
    
    let inputLat = document.querySelector("#inputLat").value;
    let inputLng = document.querySelector("#inputLng").value;
    let inputDate = document.querySelector("#inputDate").value;
    let defaultLatLondon = "51.507351";
    let defaultLngLondon = "-0.127758";
    
    let usedDate;
    (function chooseDate() {
        let defaultDate;
        if (inputDate == null || inputDate == "") {
            (function findDefaultDate(){
                let newDate = new Date();
                defaultDate = `${newDate.getFullYear()}-${(newDate.getMonth())}`;
                console.log((defaultDate));
                return defaultDate;
            })();
            usedDate = defaultDate;
        } else usedDate = inputDate;
    })();

    let usedLat;
    (function chooseLat() {
        if (inputLat == null || inputLat == "") {
            usedLat = defaultLatLondon;
            return usedLat;
        } else return usedLat = inputLat;
    })();
    
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
    
       
    })
    .catch(err => console.error(err));
});
