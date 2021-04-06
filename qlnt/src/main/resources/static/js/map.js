var prefURL='/map';
var homeMarkerIcon = L.icon({
    iconUrl: 'dist/img/home-marker-ico.png',
    iconSize: [36, 36],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

$(document).ready(function(){
    var mapOptions = {
        center: [10.0279603,105.7664918],
        zoom: 15
    };

    var myMap = new L.map('map-container', mapOptions);
    var layer = new L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {maxZoom: 20,subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
    myMap.addLayer(layer);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            myMap.panTo(new L.latLng(position.coords.latitude,position.coords.longitude));
        });
    }

    drawKhuTro(myMap);

    //drawTinhTp(2, myMap);
    //drawXaPhuong(2, myMap);
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

function drawKhuTro(map) {
    $.ajax({
        url:prefURL+'/lay-ds-khu-tro',
        method:'post',
        beforeSend: function() {
        }, success: function(res) {
            var size=res.resData.length;
            for(var i=0;i<size;i++) {
                var kt=res.resData[i];
                var popup = L.popup().setContent('<h4>'+kt.tenKhuTro+'</h4><ul class="marker-ul"><li><i class="fa fa-map-signs"></i> '+kt.fullAddress+'</li><li><i class="fa fa-phone"></i> <b>'+kt.sdtChuTro+'</b></li></ul><a href="#" data-rid="'+kt.idKhuTro+'" data-target="#mod-tt-khu-tro" data-toggle="modal">Xem chi tiết</a>');
                var marker = new L.marker(new L.latLng(kt.viDo, kt.kinhDo),{title:kt.tenKhuTro, alt:kt.tenKhuTro, icon:homeMarkerIcon});
                marker.bindPopup(popup).openPopup();
                marker.addTo(map);
            }
        }, error: function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, completed: function() {
        }
    });
}