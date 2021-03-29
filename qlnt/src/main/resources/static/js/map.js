var prefURL='/map';

$(document).ready(function(){
    var mapOptions = {
        center: [10.0279603,105.7664918],
        zoom: 17
    };

    var myMap = new L.map('map-container', mapOptions);
    var layer = new L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {maxZoom: 20,subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
    myMap.addLayer(layer);

    //drawTinhTp(2, myMap);
    drawXaPhuong(1, myMap);
});


function drawTinhTp(id, map) {
    $.ajax({
        url:prefURL+'/lay-ttp-theo-id',
        method:'post',
        data:{id:id},
        beforeSend: function() {
        }, success: function(res) {
            var geoJSONFeature = {
                type: 'Feature',
                geometry: jQuery.parseJSON(res['polygon'])
            };
            L.geoJSON(geoJSONFeature).addTo(map);
        }, error: function(jqXHR) {
        }, completed: function() {
        }
    });
}

function drawXaPhuong(id, map) {
    $.ajax({
        url:prefURL+'/lay-xa-phuong-theo-id',
        method:'post',
        data:{id:id},
        beforeSend: function() {
        }, success: function(res) {
            var geoJSONFeature = {
                type: 'Feature',
                geometry: jQuery.parseJSON(res['polygon'])
            };
            L.geoJSON(geoJSONFeature).addTo(map);
        }, error: function(jqXHR) {
        }, completed: function() {
        }
    });
}