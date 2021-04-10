Object.defineProperty(Array.prototype, 'chunk_inefficient', {
    value: function(chunkSize) {
        var array = this;
        return [].concat.apply([],
            array.map(function(elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
        );
    }
});

var prefURL='';
var myMap;
var bgColor=['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C'];

$(document).ready(function() {
    $('#cmb-tinh').change(function() {
        layDsQuanHuyen($(this).val());
    });

    $('#cmb-huyen').change(function() {
        if($(this).val()!=null) {
            drawMap($(this).val());
        }
    });

    drawChart();
    init();
});

function polyStyleL1(feature, lv) {
    return {
        fillColor: bgColor[lv],
        weight: 2,
        opacity: 1,
        color: '#800026',  //Outline color
        fillOpacity: 0.7
    };
}


function drawChart() {
    $.ajax({
        url:prefURL+'/draw-chart',
        method:'post',
        beforeSend: function() {
        }, success: function(res) {
            var barChartData=[];
            $.each(res.resData.barChart,function(i, obj) {
                barChartData.push({tinh:obj[0].tenTinhTp, count:obj[1]});
            });

            var donutChartData=[];
            $.each(res.resData.donutChart,function(i, obj) {
                donutChartData.push({label:obj[0].tenTinhTrang, value:obj[1]});
            });

            Morris.Bar({
                element: 'bar-chart',
                data: barChartData,
                xkey: 'tinh',
                ykeys: ['count'],
                labels: ['Số lượng']
            });

            Morris.Donut({
                element: 'donut-chart',
                data: donutChartData,
            });
        }, error: function(jqXHR) {
        }, complete: function() {
        }
    });
}

function findIndex(arr, val) {
    if(arr[0].constructor === Array) {
        for(var i=0;i<arr.length;i++) {
            for(var j=0;j<arr[i].length;j++) {
                if(arr[i][j]==val)
                    return i;
            }
        }
        return -1;
    } else {
        return arr.indexOf(val);
    }
}

function findMinMax(arr) {
    if(arr.constructor === Array) {
        return Math.min(arr)+' - '+Math.max(arr);
    } else {
        return arr;
    }
}

function layDsQuanHuyen(idTTp) {
    $.ajax({
        url:prefURL+'/lay-ds-quan-huyen',
        method:'post',
        data:{id:idTTp},
        beforeSend:function() {
            //showBoxLoading(idContain);
        }, success:function(res) {
            if(res.resCode>0) {
                var dsQuanHuyen=res.resData;

                $('#cmb-huyen').find('option').remove();

                $.each(dsQuanHuyen,function(i,obj){
                    $('#cmb-huyen').append($('<option>', {
                        value: obj.idQuanHuyen,
                        text : obj.tenQuanHuyen
                    }));
                });

            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            //hideBoxLoading(idContain);
        }
    });
}

function init() {
    $.ajax({
        url:prefURL+'/init',
        method:'post',
        beforeSend:function() {
            //showBoxLoading('box-search');
        }, success:function(res) {
            if(res.resCode>0) {
                var dsTinhTp=res.resData['tinhTp'];
                $.each(dsTinhTp,function(i,obj){
                    $('#cmb-tinh').append($('<option>', {
                        value: obj.idTinhTp,
                        text : obj.tenTinhTp
                    }));
                });

                var dsQuanHuyen=res.resData['quanHuyen'];
                $.each(dsQuanHuyen,function(i,obj){
                    $('#cmb-huyen').append($('<option>', {
                        value: obj.idQuanHuyen,
                        text : obj.tenQuanHuyen
                    }));
                });

                $('#cmb-huyen').change();
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            //hideBoxLoading('box-search');
        }
    });
}

function drawMap(idHuyen) {
    $.ajax({
        url:prefURL+'/draw-map',
        method:'post',
        data:{idHuyen:idHuyen},
        beforeSend: function() {
            showBoxLoading('map-body');
        }, success: function(res) {
            if(myMap==null) {
                myMap = new L.map('map-container', {center: [9.1881472,105.15906559999999],zoom: 12,zoomControl: false});
                var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
                myMap.addLayer(layer);
            } else {
                myMap.eachLayer(function(layer) {
                    if(layer instanceof L.Polygon) {
                        myMap.removeLayer(layer);
                    }
                });
            }

            var numArr=[];
            $.each(res.resData,function(i, obj) {
                if($.inArray(obj.soLuongNhaTro, numArr) === -1) numArr.push(obj.soLuongNhaTro);
            });

            //console.log(numArr);

            var len=numArr.length;
            var kt=1;
            if(len>6) {
                kt = Math.ceil(len/6);
                numArr.chunk_inefficient(kt);
            }

            //console.log(numArr);
            $('#map-legend').empty();
            if(numArr)
            for(var i=0; i<numArr.length;i++) {
                var leg=$('<div style="width:30px; height:10px;float:left; margin-top: 5px">').css('background-color',bgColor[i]);
                var legCont=$('<div style="float:left; margin-right:15px">').append(leg).append('&nbsp;&nbsp;<b>'+findMinMax(numArr[i])+'</b> Nhà trọ');
                $('#map-legend').append(legCont);
            }

            $.each(res.resData,function(i, obj) {
                var geoJSONFeature = {
                    type: 'Feature',
                    geometry: jQuery.parseJSON(obj['polygon'])
                };
                var idx=findIndex(numArr,obj.soLuongNhaTro);
                L.geoJSON(geoJSONFeature,{style:polyStyleL1(null,idx),onEachFeature:function(feature, layer){
                    layer.bindPopup('<h4>'+obj.tenXaPhuong+'</h4><h5><i>'+obj.tenQuanHuyen+' - '+obj.tenTinhTp+'</i></h5><p>Số lượng nhà trọ: <b>'+obj.soLuongNhaTro+'</b></p>');
                }}).addTo(myMap);
                //console.log(obj.tenXaPhuong,obj.soLuongNhaTro, idx);
            });

            myMap.eachLayer(function(layer) {
                if(layer instanceof L.Polygon) {
                    myMap.panTo(layer.getBounds().getCenter());
                    return false;
                }
            });
        }, error: function(jqXHR) {
        }, complete: function() {
            hideBoxLoading('map-body');
        }
    });
}