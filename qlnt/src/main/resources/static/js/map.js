var prefURL='/map';
var homeMarkerIcon = L.icon({
    iconUrl: 'dist/img/home-marker-ico.png',
    iconSize: [36, 36],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});
var myMap;
var myMarker;
var myRouting;
var geoCoder;

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

    $('#lst-khoang-cach').jdGrid({
        columns:[
            {name:'tenTruong',title:'Tên trường'},
            {name:'khoangCach',title:'K.Cách (m)',css:{'text-align':'center'}}
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

    $('#btn-close-search').click(function(e) {
        e.preventDefault();
        $('#pnl-search').animate({
            left:'-410px'
        });
    });

    $('#btn-open-search').click(function(e) {
        e.preventDefault();
        $('#pnl-search').animate({
            left:'0px'
        });
    });

    $('#search-result').height($('#search-result').height()-240);

    var mapOptions = {
        center: [9.1881472,105.15906559999999],
        zoom: 15,
        zoomControl: false
    };

    geoCoder = L.Control.Geocoder.nominatim();

    myMap = new L.map('map-container', mapOptions);
    var layer = new L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {maxZoom: 20,subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
    myMap.addLayer(layer);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            myMap.panTo(new L.latLng(position.coords.latitude,position.coords.longitude));
            $('#txt-lat').val(position.coords.latitude);
            $('#txt-lon').val(position.coords.longitude);

            var marker = new L.marker(new L.latLng(position.coords.latitude,position.coords.longitude),{title:'Vị trí của bạn',alt:'Vị trí của bạn',draggable:'true'});
            var popup = L.popup().setContent('<h4>Vị trí của bạn</h4>');
            marker.bindPopup(popup).openPopup();
            marker.on('dragend', function(e) {
                $('#txt-lat').val(marker.getLatLng().lat);
                $('#txt-lon').val(marker.getLatLng().lng);
                findAddress(myMap, geoCoder, marker.getLatLng(),function(add) {
                    popup.setContent('<h4>Vị trí của bạn</h4><i>'+add+'</i>');
                });
            });

            marker.addTo(myMap);
            findAddress(myMap, geoCoder, new L.latLng(position.coords.latitude,position.coords.longitude), function(add) {
                popup.setContent('<h4>Vị trí của bạn</h4><i>'+add+'</i>');
            });
        }, function(err) {
            //console.log(err);
            var defLoc=new L.latLng(9.1881472,105.15906559999999);

            $('#txt-lat').val(9.1881472);
            $('#txt-lon').val(105.15906559999999);

            var marker = new L.marker(defLoc,{title:'Vị trí của bạn',alt:'Vị trí của bạn',draggable:'true'});
            var popup = L.popup().setContent('<h4>Vị trí của bạn</h4>');
            marker.bindPopup(popup).openPopup();
            marker.on('dragend', function(e) {
                $('#txt-lat').val(marker.getLatLng().lat);
                $('#txt-lon').val(marker.getLatLng().lng);
                findAddress(myMap, geoCoder, marker.getLatLng(),function(add) {
                    popup.setContent('<h4>Vị trí của bạn</h4><i>'+add+'</i>');
                });
            });

            marker.addTo(myMap);
            findAddress(myMap, geoCoder, defLoc, function(add) {
                popup.setContent('<h4>Vị trí của bạn</h4><i>'+add+'</i>');
            });
        });
    }

    drawKhuTro(myMap);

    //drawTinhTp(2, myMap);
    //drawXaPhuong(2, myMap);
});

function findAddress(map, geoCoder, latlng, func) {
    geoCoder.reverse(latlng, map.options.crs.scale(map.getZoom()), function(results) {
        //console.log(results);
        var r = results[0];
        if (r) {
            console.log('addr found: '+r.name);
            func(r.name);
        } else {
            console.log('Address not found');
            func('Không xác định');
        }
    });
}

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
                var popup = L.popup().setContent('<h4>'+kt.tenKhuTro+'</h4><ul class="marker-ul"><li><i class="fa fa-map-signs"></i> '+kt.fullAddress+'</li><li><a href="tel:'+kt.sdtChuTro+'"><i class="fa fa-phone"></i> <b>'+kt.sdtChuTro+'</b></a></li></ul><a href="#" data-rid="'+kt.idKhuTro+'" data-target="#mod-tt-khu-tro" data-toggle="modal">Xem chi tiết</a>');
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
                $('#lst-khoang-cach').data('jdgrid').fillData(res.resData.khoangCach);

                $('#spn-ten').text(res.resData.khuTro.tenKhuTro);
                $('#spn-trong').text(res.resData.khuTro.soPhongTrong);
                $('#spn-dc').text(res.resData.khuTro.fullAddress);
                $('#spn-sdt').text(res.resData.khuTro.sdtChuTro);
                $('#spn-ten-chu').text(res.resData.khuTro.tenChuKhuTro);
                $('#spn-nu').text(res.resData.khuTro.nu?'Nữ':'Nam');
                $('#spn-ns').text(res.resData.khuTro.namSinhChuTro==null?'':millisec2Date(res.resData.khuTro.namSinhChuTro,'dd/mm/yyyy'));
                $('#btn-call').attr('href','tel:'+res.resData.khuTro.sdtChuTro);
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
            $('#search-result').empty();
        }, success: function(res) {
            if(res.resCode>0) {
                var count=res.resData.length;
                if(count > 0) {
                    $('#search-result').append('<p class="text-muted"><i>Tìm thấy <b>'+count+'</b> kết quả:</i></p>');
                    for(var i=0;i<count;i++) {
                        var media=$('<div>').addClass('media');
                        var mediaBody=$('<div>').addClass('media-body');
                        var mediaTitle=$('<h4>').addClass('media-heading').html(res.resData[i].tenKhuTro);
                        var mediaContent=$('<span>').html('<b>Chủ trọ:</b> '+res.resData[i].tenChuKhuTro+'<br/><b>ĐC:</b> '+res.resData[i].fullAddress+'<br/><b>SĐT:</b> '+res.resData[i].sdtChuTro);
                        var btnLocate=$('<button title="Xem trên bản đổ" class="btn-locate">').attr('type','button').attr('lat',res.resData[i].viDo).attr('lon',res.resData[i].kinhDo).addClass('btn btn-primary btn-flat pull-right btn-sm').html('<i class="fa fa-map-marker"></i>');
                        var btnRouting=$('<button title="Chỉ đường" class="btn-routing">').attr('type','button').attr('lat',res.resData[i].viDo).attr('lon',res.resData[i].kinhDo).addClass('btn btn-primary btn-flat pull-right btn-sm').html('<i class="fa fa-map-signs"></i>');
                        var btnDetail=$('<a href="#" data-target="#mod-tt-khu-tro" data-toggle="modal" role="button" title="Xem thông tin">').attr('data-rid',res.resData[i].idKhuTro).addClass('btn btn-primary btn-flat pull-right btn-sm').html('<i class="fa fa-info-circle"></i>');

                        mediaBody.append(mediaTitle);
                        mediaBody.append(mediaContent);
                        mediaBody.append(btnLocate);
                        mediaBody.append(btnRouting);
                        mediaBody.append(btnDetail);
                        mediaBody.append('<hr/>');

                        media.append(mediaBody);

                        $('#search-result').append(media);
                    }

                    $('.btn-locate').click(function() {
                        var btn=$(this);
                        myMap.eachLayer(function(layer) {
                            if(layer instanceof L.Marker) {
                                mLatLng=layer.getLatLng();
                                if(mLatLng.lat==btn.attr('lat') && mLatLng.lng==btn.attr('lon')) {
                                    layer.openPopup();
                                    myMap.panTo(mLatLng);
                                    return false;
                                }
                            }
                        });
                    });

                    $('.btn-routing').click(function() {
                        showBoxLoading('pnl-search');
                        var btn=$(this);
                        if(myRouting != null) {
                            myMap.removeControl(myRouting);
                        }
                        myRouting=L.Routing.control({
                            waypoints: [
                                L.latLng($('#txt-lat').val(), $('#txt-lon').val()),
                                L.latLng(btn.attr('lat'), btn.attr('lon'))
                            ],
                            formatter: new L.Routing.Formatter({  }),
                            routeWhileDragging: true,
                            language: 'vi',
                            collapsible: true
                        }).on('routingstart', function() {
                        }).on('routingerror', function() {
                            hideBoxLoading('pnl-search');
                            alert('Không thể tìm đường đi lúc này, vui lòng thử lại sau');
                        }).on('routesfound', function(e) {
                            hideBoxLoading('pnl-search');
                            var routes = e.routes[0];
                            console.log('Found: ' + routes.summary.totalDistance + ' - '+routes.summary.totalTime);
                            hideBoxLoading('pnl-search');

                            $('.leaflet-routing-collapse-btn').click(function(e) {
                                e.preventDefault();
                                if(myRouting != null) {
                                    myMap.removeControl(myRouting);
                                }
                            });
                        }).addTo(myMap);
                    });
                } else {
                    $('#search-result').html('<p class="text-muted text-center"><i>Không tìm thấy kết quả phù hợp</i></p>');
                }
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