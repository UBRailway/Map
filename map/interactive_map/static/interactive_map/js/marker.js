function initMap() {

    var gmarkers = [];

    /*
        Инициализация карты
    */
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        minZoom: 6,
        maxZoom: 15,
        center: {
            lat: 50.240038,
            lng: 106.187941
        },
        disableDefaultUI: true
    });

    //Рисование железной дороги
    function addRailway(){

        //Переменая для изменения цвета участка дороги
        let color = "";

        let flag_back = arraySectionsKilometers[0].id_kil;
        let flag_next = arraySectionsKilometers[0].id_kil;

        for (var i = 0; i < arraySectionsKilometers.length - 1; i++) {

            //Переменные для того, чтобы понимать когла происходит смена киллометра на железной дороге
            flag_back = flag_next;
            flag_next = arraySectionsKilometers[i].id_kil;

            if (arraySectionsKilometers[i].risk <= 50){
                color = "#22B14C";
            }
            else if (arraySectionsKilometers[i].risk <= 84){
                color = "#FFF200";
            }
            else if (arraySectionsKilometers[i].risk <= 120){
                color = "#FF7F27";
            }
            else{
                color = "#ED1C24";
            }

            var PathStyle = new google.maps.Polyline({
                path: [
                        new google.maps.LatLng(arraySectionsKilometers[i].start_latitude, arraySectionsKilometers[i].start_longitude),
                        new google.maps.LatLng(arraySectionsKilometers[i+1].start_latitude, arraySectionsKilometers[i+1].start_longitude)
                ],
                strokeColor: color,
                strokeOpacity: 1.0,
                strokeWeight: 10,
                map: map
            });

            if (flag_back != flag_next) {
                var markerRailway = new google.maps.Marker({
                    position: {
                        lat: arraySectionsKilometers[i].start_latitude,
                        lng: arraySectionsKilometers[i].start_longitude
                    },
                    title: "Киллометр №" + arraySectionsKilometers[i].title,
                    map: map
                });

                // Отображение ифнормационного окна
                markerRailway.addListener('click', function() {
                    var infoWindow = new google.maps.InfoWindow({
                        content: "Киллометр №" + arraySectionsKilometers[i].title
                    });
                    infoWindow.open(map, markerRailway);
                });
            }
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
    addMarkersConstructionsOnMap(markerConstruction, arrayMediaArtificialConstruction);
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
            gmarkers.push(marker);
        });
    }

    //Вывод объектов ИССО на карту
    function addMarkersConstructionsOnMap(array, mediaConstructions){

        array.forEach(function(location) {

            var contentImages = ""; //Переменная для сохранения тегов с картинками
            var contentVideos = ""; //Переменная для сохранения тегов с видео

            for (let i = 0; i <= mediaConstructions.length-1; i++) {
                if (mediaConstructions[i].id_artificial_construction == location.id_construction){
                    if (mediaConstructions[i].link.includes(".gif") || mediaConstructions[i].link.includes(".png") || mediaConstructions[i].link.includes(".jpg") || mediaConstructions[i].link.includes(".jpeg")){
                        contentImages += "<img src=\"" + mediaConstructions[i].link + "\" width=\"" + 200 + "\" height=\""+140+"\">";
                    }
                    else if (mediaConstructions[i].link.includes(".mp4") || mediaConstructions[i].link.includes(".WebM") || mediaConstructions[i].link.includes(".Ogg")) {
                        contentVideos = "<video width=\"" + 600 + "\" height=\""+320+"\" controls autoplay><source src=\"" + mediaConstructions[i].link + "\"/></video>"
                    }
                }
            }

            var marker = new google.maps.Marker({
                position: {
                    lat: location.lat - 0.00093,
                    lng: location.lng
                },
                title: location.title,
                map: map,
                icon: location.icon
            });

            // Отображение ифнормационного окна
            marker.addListener('click', function() {
                var infoWindow = new google.maps.InfoWindow({
                    content: "Тип объекта: " + "<span style=\"font-weight: bold;\">" + location.title + "</span>" +
                    ". Координаты - широта: " + "<span style=\"font-weight: bold;\">" + location.lat + "</span>" + ", долгота: " + "<span style=\"font-weight: bold;\">" + location.lng + "</span>" + "." +
                    "<br><br> Характеристика объекта: " +
                    "<br><br> Фотографии объекта: <br><br>" + contentImages +
                    "<br><br> Видеозапись объекта: <br><br>" + contentVideos
                });
                infoWindow.open(map, marker);
            });

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
        alert(map.getZoom());
        if(map.getZoom() >= 15 && map.getZoom() <= 13){
//            addMarkersOnMap(arrayStation);
//            addMarkersConstructionsOnMap(markerConstruction, arrayMediaArtificialConstruction);
        }
        else{
//            clearMarker();
        }
    });
}