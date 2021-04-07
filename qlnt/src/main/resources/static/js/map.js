var prefURL='/map';
var homeMarkerIcon = L.icon({
    iconUrl: 'dist/img/home-marker-ico.png',
    iconSize: [36, 36],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

$(document).ready(function(){
    $('#lst-phong-tro').jdGrid({
        columns:[
            {name:'sttPhong',title:'Số phòng'},
            {name:'tenLoaiPhong',title:'Loại phòng'},
            {name:'tenTinhTrang',title:'Tình trạng'}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'TT',
        nocss:{'text-align':'center','width':'30px'}
    });

    $('#lst-loai-phong').jdGrid({
        columns:[
            {name:'tenLoaiPhong',title:'Tên Loại phòng'},
            {name:'dienTich',title:'D.Tích (m<sup>2</sup>)',css:{'text-align':'right'}},
            {name:'soNguoiO',title:'SN Ở',css:{'text-align':'right'}},
            {name:'coGac',title:'Gác',type:'check',css:{'text-align':'center','width':'40px'}},
            {name:'giaThueHienTai',title:'Giá thuê',format:true,css:{'text-align':'right'}},
            {name:'moTa',title:'Mô tả'}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'TT',
        nocss:{'text-align':'center','width':'30px'}
    });

    $('#mod-tt-khu-tro').on('shown.bs.modal', function (e) {
        var button = $(e.relatedTarget);
        var id=button.data('rid');
        if(id != undefined) {
            layTtKhuTro(id);
        }
    });

    $('#btn-search').click(function() {
        timKhuTro();
    });

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
            $('#txt-lat').val(position.coords.latitude);
            $('#txt-lon').val(position.coords.longitude);

            var marker = new L.marker(new L.latLng(position.coords.latitude,position.coords.longitude),{title:'This is marker',alt:'This is marker'});
            marker.addTo(myMap);
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
        }, complete: function() {
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
        }, complete: function() {
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
        }, complete: function() {
        }
    });
}

function layTtKhuTro(id) {
    $.ajax({
        url:prefURL+'/lay-tt-khu-tro',
        method:'post',
        data:{id:id},
        beforeSend: function() {
            showBoxLoading('mod-body');
        }, success: function(res) {
            if(res.resCode>0) {
                $('#lst-phong-tro').data('jdgrid').fillData(res.resData.phongTro);
                $('#lst-loai-phong').data('jdgrid').fillData(res.resData.loaiPhong);

                $('#spn-ten').text(res.resData.khuTro.tenKhuTro);
                $('#spn-trong').text(res.resData.khuTro.soPhongTrong);
                $('#spn-dc').text(res.resData.khuTro.fullAddress);
                $('#spn-sdt').text(res.resData.khuTro.sdtChuTro);
                $('#spn-ten-chu').text(res.resData.khuTro.tenChuKhuTro);
                $('#spn-nu').text(res.resData.khuTro.nu?'Nữ':'Nam');
                $('#spn-ns').text(res.resData.khuTro.namSinhChuTro==null?'':millisec2Date(res.resData.khuTro.namSinhChuTro,'dd/mm/yyyy'));
            } else {
                alert('Lấy thông tin nhà trọ không thành công, vui lòng thử lại sau');
            }
        }, error: function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete: function() {
            hideBoxLoading('mod-body');
        }
    });
}

function timKhuTro() {
    $.ajax({
        url:prefURL+'/tim-khu-tro',
        method:'post',
        dataType:'json',
        data:new FormData($('#frm-search')[0]),
        processData:false,
        contentType:false,
        beforeSend: function() {
            showBoxLoading('pnl-search');
        }, success: function(res) {
            if(res.resCode>0) {

            } else {
                alert('Lấy thông tin nhà trọ không thành công, vui lòng thử lại sau');
            }
        }, error: function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete: function() {
            hideBoxLoading('pnl-search');
        }
    });
}