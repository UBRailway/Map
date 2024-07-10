function initMap() {

    var gmarkers = [];

    let redColor = "#ED1C24";
    let orangeColor = "#FF7F27";
    let greenColor = "#22B14C";
    let blackColor = "black"
    let color = "";

    /*
        Инициализация карты
    */
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: 47.90844642431756,
            lng: 106.88389041968603
        },
        disableDefaultUI: true
    });

    //Рисование железной дороги
    function addRailway(){
        let color;
        for (var i = 0; i < arrayKilometers.length - 1; i++) {
            if (i%2==0)
                color = greenColor
            else
                color = redColor

            var PathStyle = new google.maps.Polyline({
                path: [
                        new google.maps.LatLng(arrayKilometers[i].start_latitude, arrayKilometers[i].start_longitude),
                        new google.maps.LatLng(arrayKilometers[i+1].start_latitude, arrayKilometers[i+1].start_longitude)
                ],
                strokeColor: color,
                strokeOpacity: 1.0,
                strokeWeight: 10,
                map: map
            });

            var markerRailway = new google.maps.Marker({
                position: {
                    lat: arrayKilometers[i+1].start_latitude,
                    lng: arrayKilometers[i+1].start_longitude
                },
                title: "" + arrayKilometers[i].name,
                map: map
            });
        }
        path.setMap(map);
    }
    //Подсчет риска размыва (проста функция под собой пока ничего не несетФФ)
//    var arrayRiskDay = [];
//    var arrayRiskNight = [];
//    function calculatingRiskErosion(array){
//        var coreAccordingCriteria = 0;
//        array.forEach(function(location){
//            coreAccordingCriteria = (location.ratioTypeBallast * location.riskTypeBallast) +
//                   (location.ratioTypeRail * location.riskTypeRail) +
//                   (location.ratioHeightEmbankmen * location.riskHeightEmbankmen) +
//                   (location.ratioAvailabilityArtificialConstruction * location.riskAvailabilityArtificialConstruction) +
//                   (location.ratioChangingWatercours * location.riskChangingWatercours) +
//                   (location.ratioConditionDrainageDitches * location.riskConditionDrainageDitches) +
//                   (location.ratioDams * location.riskDams) +
//                   (location.ratioStrengtheningBridgeCones * location.riskStrengtheningBridgeCones) +
//                   (location.ratioConditionCulvertCapacity * location.riskConditionCulvertCapacity) +
//                   (location.ratioCatchmentArea * location.riskCatchmentArea) +
//                   (location.ratioTerrain * location.riskTerrain) +
//                   (location.ratioWaterFlowRate * location.riskWaterFlowRate) +
//                   (location.ratioWaterFlowDirection * location.riskWaterFlowDirection) +
//                   (location.ratioCrossCountryRoads * location.riskCrossCountryRoads) +
//                   (location.ratioSufficiency * location.riskSufficiency) +
//                   (location.ratioWorkExperience * location.riskWorkExperience)
//            arrayRiskDay.push(coreAccordingCriteria * location.weatherReportDay);
//            arrayRiskNight.push(coreAccordingCriteria * location.weatherReportNight);
//        }
//    }

    addMarkersOnMap(arrayStation);
//    addMarkersConstructionsOnMap(markerConstruction);
    addRailway();
    //Добавление маркера станции на карту
    function addMarkersOnMap(array){
        array.forEach(function(location) {
            var marker = new google.maps.Marker({
                position: {
                    lat: location.lat,
                    lng: location.lng
                },
                title: location.title,
                map: map
            });

            // Добавляем информационные окна при клике на маркер
            marker.addListener('click', function() {
                var infoWindow = new google.maps.InfoWindow({ content: "Описание станции"});
                infoWindow.open(map, marker);
            });

            gmarkers.push(marker);
        });
    }
    //Вывод объектов ИССО на карту
    function addMarkersConstructionsOnMap(array){
        array.forEach(function(location) {
            var marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                title: location.title,
                map: map,
                icon: location.icon
            });

//            // Добавляем информационные окна при клике
//            marker.addListener('click', function() {
//                var infoWindow = new google.maps.InfoWindow({
//                    content: "<div><img src=\"" + location.image1 + "\"></div> <div><img src=\"" + location.image2 + "\"></div> <div><img src=\"" + location.image3 + "\"></div>"
//                });
//                // var infoWindow = new google.maps.InfoWindow({ content: "<div> \"" + location.title + "\" </div><br><div> \"" + location.image + "\" </div>" });
//                infoWindow.open(map, marker);
//            });

            gmarkers.push(marker);
        });
    }
    //Очистка карты
    function clearMarker(){
        for(let i = 0; i < gmarkers.length; i++){
            gmarkers[i].setMap(null);
        }
        gmarkers = [];
    }
    //Событие прослушивания изменения зума карты
    google.maps.event.addListener(map, 'zoom_changed', function(){
        if(map.getZoom() >= 6 && map.getZoom() <= 8){
//            addMarkersOnMap(arrayStation);
        }
        else if (map.getZoom() >= 18){
//            addMarkersConstructionsOnMap(markerConstruction);
//            addRailway();
        }
        else{
//            clearMarker();
        }
    });
}