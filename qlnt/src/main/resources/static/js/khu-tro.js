var prefURL = '/ql-khu-tro'

var dsTinhTp;
var dsQuanHuyen;
var dsXaPhuong;
var dsChuKhuTro;
var dsTruong;
var dsKhoangCach=[];
var myGeoCoder=new L.Control.Geocoder.Nominatim();

$(document).ready(function() {
    $('#lst-item').jdGrid({
        columns:[
            {name:'tenKhuTro',title:'Tên khu trọ'},
            {name:'fullAddress',title:'Địa chỉ'},
            {name:'tenChuKhuTro',title:'Tên chủ khu trọ'},
            {name:'',title:'T.Tác',type:'control',css:{'text-align':'center'},content:function(obj) {
                return '<a href="#" class="cmd cmd-type" data-rid="'+obj.idKhuTro+'" title="Quản lý loại phòng" data-target="#mod-loai-phong" data-toggle="modal"><i class="fa fa-th-large"></i></a><a href="#" class="cmd cmd-edit" data-rid="'+obj.idKhuTro+'" title="Quản lý phòng trọ" data-target="#mod-phong-tro" data-toggle="modal"><i class="fa fa-home" style="font-size: 16px"></i></a><a href="#" class="cmd cmd-edit" data-rid="'+obj.idKhuTro+'" title="Chỉnh sửa" data-target="#mod-khu-tro" data-toggle="modal"><i class="fa fa-edit"></i></a><a href="#" class="cmd cmd-del" rid="'+obj.idKhuTro+'" title="Xóa"><i class="fa fa-trash text-danger"></i></a>';
            }}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'STT',
        nocss:{'text-align':'center','width':'50px'}
    });

    $('#lst-loai-phong').jdGrid({
        columns:[
            {name:'tenLoaiPhong',title:'Tên Loại phòng'},
            {name:'dienTich',title:'D.Tích (m<sup>2</sup>)',css:{'text-align':'right'}},
            {name:'soNguoiO',title:'SN Ở',css:{'text-align':'right'}},
            {name:'coGac',title:'Gác',type:'check',css:{'text-align':'center','width':'40px'}},
            {name:'giaThueHienTai',title:'Giá thuê',format:true,css:{'text-align':'right'}},
            {name:'',title:'T.Tác',type:'control',css:{'text-align':'center'},content:function(obj) {
                return '<a href="#" class="cmd cmd-edit-lp" rid="'+obj.idLoaiPhong+'" title="Chỉnh sửa"><i class="fa fa-edit"></i></a><a href="#" class="cmd cmd-del-lp" rid="'+obj.idLoaiPhong+'" title="Xóa"><i class="fa fa-trash text-danger"></i></a>';
            }}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'TT',
        nocss:{'text-align':'center','width':'30px'}
    });

    $('#lst-phong-tro').jdGrid({
        columns:[
            {name:'sttPhong',title:'Số thứ tự phòng'},
            {name:'tenLoaiPhong',title:'Loại phòng'},
            {name:'tenTinhTrang',title:'Tình trạng'},
            {name:'',title:'T.Tác',type:'control',css:{'text-align':'center'},content:function(obj) {
                return '<a href="#" class="cmd cmd-edit-pt" rid="'+obj.idPhongTro+'" title="Chỉnh sửa"><i class="fa fa-edit"></i></a><a href="#" class="cmd cmd-del-pt" rid="'+obj.idPhongTro+'" title="Xóa"><i class="fa fa-trash text-danger"></i></a>';
            }}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'TT',
        nocss:{'text-align':'center','width':'30px'}
    });

    $('#lst-truong').jdGrid({
        columns:[
            {name:'tenTruong',title:'Tên trường'},
            {name:'diaChi',title:'Địa chỉ'},
            {name:'distance',title:'K.Cách (m)',css:{'text-align':'center'}},
            {name:'',title:'T.Tác',type:'control',css:{'text-align':'center'},content:function(obj) {
                return '<a href="#" class="cmd cmd-re-computing" rid="'+obj.idTruong+'" lat="'+obj.viDo+'" lon="'+obj.kinhDo+'" title="Tính lại khoảng cách"><i class="fa fa-refresh"></i></a>';
            }}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'TT',
        nocss:{'text-align':'center','width':'30px'}
    });

    $('#mod-khu-tro').on('shown.bs.modal', function (e) {
        if(dsTinhTp==null||dsQuanHuyen==null||dsXaPhuong==null||dsChuKhuTro==null) {
            init();
        } else {
            var button = $(e.relatedTarget);
            var id=button.data('rid');
            if(id != undefined) {
                layTtKhuTro(id);
            }
        }
    });

    $('#mod-khu-tro').on('hidden.bs.modal', function (e) {
        clear();
        var grid=$('#lst-truong').data('jdgrid');
        for(var i=0;i<dsTruong.length;i++) {
            grid.setCellContent(i,2,'');
        }
    });

    $('#mod-loai-phong').on('shown.bs.modal', function (e) {
        var button = $(e.relatedTarget);
        var id=button.data('rid');
        $('#txt-id-khu-tro').val(id);

        layDsLoaiPhong(id);
    });

    $('#mod-loai-phong').on('hidden.bs.modal', function (e) {
        clearLoaiPhong();
    });

    $('#mod-phong-tro').on('shown.bs.modal', function (e) {
        var button = $(e.relatedTarget);
        var id=button.data('rid');
        $('#txt-id-khu-tro-pt').val(id);

        initPhongTro(id);
        layDsPhongTro(id);
    });

    $('#cmb-tinh').change(function(e, selectVal) {
        layQuanHuyen($(this).val(),'cmb-huyen', 'mod-body',selectVal==undefined?undefined:selectVal['idQuanHuyen'], selectVal==undefined?undefined:selectVal['idXaPhuong']);
    });

    $('#cmb-huyen').change(function(e, idXaPhuong) {
        layXaPhuong($(this).val(),'cmb-xa', 'mod-body', idXaPhuong);
    });

    $('#cmb-q-tinh').change(function() {
        layQuanHuyen($(this).val(),'cmb-q-huyen', 'box-search');
    });

    $('#cmb-q-huyen').change(function() {
        layXaPhuong($(this).val(),'cmb-q-xa', 'box-search');
    });

    $('#btn-save').click(function() {
        var xa=$('#cmb-xa').val();
        var chuTro=$('#cmb-chu-tro').val();
        var kd=$('#txt-lat').val();
        var vd=$('#txt-lon').val();
        var ten=$('#txt-ten').val();
        var dc=$('#txt-dia-chi').val();

        if(xa==null||chuTro==''||kd==''||vd==''||ten==''||dc=='') {
            alert('Vui lòng nhập đầy đủ thông tin khu trọ')
        } else {
            luu();
        }
    });

    $('#btn-search').click(function() {
        layDsKhuTro();
    });

    $('#btn-clear').click(function() {
        $('#txt-q-ten').val('');
        $('#txt-q-dia-chi').val('');
        $('#cmb-q-xa').val(-1);
        $('#cmb-q-huyen').val(-1);
        $('#cmb-q-tinh').val(-1);
        $('#cmb-q-chu-tro').val(-1);
        layDsKhuTro();
    });

    $('#btn-save-loai-phong').click(function() {
        var ten=$('#txt-ten-loai-phong').val();
        var dt=$('#txt-dien-tich').val();
        var sgo=$('#txt-so-nguoi-o').val();
        var gt=$('#txt-gia-thue').val();
        var nad=$('#txt-ngay-ad').val();

        if(ten==''||dt==''||sgo==''||gt==''||nad=='') {
            alert('Vui lòng nhập đầy đủ thông tin loại phòng trọ')
        } else {
            luuLoaiPhong();
        }
    });

    $('#btn-clear-loai-phong').click(function() {
        clearLoaiPhong();
    });

    $('#btn-new-price').click(function() {
        $('#txt-id-gia-thue').val('');
        $('#txt-gia-thue').val('');
        $('#txt-ngay-ad').val('');
    });

    $('#btn-save-phong-tro').click(function() {
        var loai=$('#cmb-loai-phong').val();
        var tt=$('#cmb-tinh-trang').val();
        var stt=$('#txt-stt-phong').val();

        if(loai==null || tt==null || stt=='') {
            alert('Vui lòng nhập đầy đủ thông tin phòng trọ');
        } else {
            luuPhongTro();
        }
    });

    $('#btn-clear-phong-tro').click(function() {
        clearPhongTro();
    });

    $('#btn-computing').click(function() {
        if($('#txt-lat').val()=='' || $('#txt-lon').val()=='') {
            alert('Vui lòng nhập tọa độ khu trọ');
        } else {
            dsKhoangCach=[];
            tinhKhoangCach();
        }
    });

    $('#btn-find-coordinate').click(function() {
        showBoxLoading('mod-body');
        myGeoCoder.geocode($('#txt-dia-chi').val()+','+$('#cmb-xa option:selected').text()+', '+$('#cmb-huyen option:selected').text()+','+$('#cmb-tinh option:selected').text()+', Viet Nam', function(results) {
            hideBoxLoading('mod-body');
            if(results.length>0) {
                $('#txt-lat').val(results[0].center.lat);
                $('#txt-lon').val(results[0].center.lng);
            } else {
                alert('Không tìm thấy tọa độ tương ứng với địa chỉ');
            }
           /*latLng= new L.LatLng(results[0].center.lat, results[0].center.lng);
           marker = new L.Marker (latLng);
           map.addlayer(marker);*/
           console.log(results);
        });
    });

    init();
});

function clear() {
    $('#txt-id').val('');
    $('#txt-lat').val('');
    $('#txt-lon').val('');
    $('#txt-ten').val('');
    $('#txt-dia-chi').val('');
}

function luu() {
    var formData=new FormData($('#frm-khu-tro')[0]);
    formData.append('strKC',JSON.stringify(dsKhoangCach));
    $.ajax({
        url:prefURL+'/luu',
        method:'post',
        dataType:'json',
        data:formData,
        processData:false,
        contentType:false,
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                $('#mod-khu-tro').modal('hide');
                layDsKhuTro();
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body');
        }
    });
}

function layDsKhuTro() {
    $.ajax({
        url:prefURL+'/lay-danh-sach',
        method:'post',
        data:{ten:$('#txt-q-ten').val(),dc:$('#txt-q-dia-chi').val(),idXaPhuong:$('#cmb-q-xa').val(),idQuanHuyen:$('#cmb-q-huyen').val(), idTTp:$('#cmb-q-tinh').val(),idChuTro:$('#cmb-q-chu-tro').val()},
        beforeSend:function() {
            showBoxLoading('box-search');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#lst-item').data('jdgrid').fillData(res.resData);
                $('.cmd-del').click(function(e) {
                    e.preventDefault();
                    if(confirm('Bạn chắc muốn xóa?')) {
                        xoa($(this).attr('rid'));
                    }
                });
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('box-search');
        }
    });
}

function init() {
    $.ajax({
        url:prefURL+'/init',
        method:'post',
        beforeSend:function() {
            showBoxLoading('box-search');
        }, success:function(res) {
            if(res.resCode>0) {
                dsTinhTp=res.resData['tinhTp'];
                dsQuanHuyen=res.resData['quanHuyen'];
                dsXaPhuong=res.resData['xaPhuong'];
                dsChuKhuTro=res.resData['chuKhuTro'];
                dsTruong=res.resData.truong;

                $.each(dsTinhTp,function(i,obj){
                    $('#cmb-tinh, #cmb-q-tinh').append($('<option>', {
                        value: obj.idTinhTp,
                        text : obj.tenTinhTp
                    }));
                });
                $.each(dsQuanHuyen,function(i,obj){
                    $('#cmb-huyen, #cmb-q-huyen').append($('<option>', {
                        value: obj.idQuanHuyen,
                        text : obj.tenQuanHuyen
                    }));
                });
                $.each(dsXaPhuong,function(i,obj){
                    $('#cmb-xa, #cmb-q-xa').append($('<option>', {
                        value: obj.idXaPhuong,
                        text : obj.tenXaPhuong
                    }));
                });
                $.each(dsChuKhuTro,function(i,obj){
                    $('#cmb-chu-tro, #cmb-q-chu-tro').append($('<option>', {
                        value: obj.idChuKhuTro,
                        text : obj.hoTen
                    }));
                });

                $('#lst-truong').data('jdgrid').fillData(res.resData.truong);
                $('.cmd-re-computing').click(function(e) {
                    e.preventDefault();
                    //console.log($('.cmd-re-computing').index($(this)));
                    tinhKhoangCach($('.cmd-re-computing').index($(this)), $(this).attr('lat'), $(this).attr('lon'), $(this).attr('rid'));
                });

                layDsKhuTro();
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('box-search');
        }
    });
}

function layQuanHuyen(idTinhTp, idCmb, idContain, idQuanHuyen, idXaPhuong) {
    $.ajax({
        url:prefURL+'/lay-quan-huyen',
        method:'post',
        data:{idTinhTp:idTinhTp},
        beforeSend:function() {
            showBoxLoading(idContain);
        }, success:function(res) {
            if(res.resCode>0) {
                if(idCmb.includes('-q-'))
                    $('#'+idCmb).find('option:gt(0)').remove();
                else
                    $('#'+idCmb).find('option').remove();

                $.each(res.resData,function(i,obj){
                    $('#'+idCmb).append($('<option>', {
                        value: obj.idQuanHuyen,
                        text : obj.tenQuanHuyen
                    }));
                });

                if(idQuanHuyen!=undefined)
                    $('#'+idCmb).val(idQuanHuyen);

                $('#'+idCmb).trigger('change',idXaPhuong);
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading(idContain);
        }
    });
}

function layXaPhuong(idQuanHuyen, idCmb, idContain, idXaPhuong) {
    $.ajax({
        url:prefURL+'/lay-xa-phuong',
        method:'post',
        data:{idQuanHuyen:idQuanHuyen},
        beforeSend:function() {
            showBoxLoading(idContain);
        }, success:function(res) {
            if(res.resCode>0) {
                if(idCmb.includes('-q-'))
                    $('#'+idCmb).find('option:gt(0)').remove();
                else
                    $('#'+idCmb).find('option').remove();

                $.each(res.resData,function(i,obj){
                    $('#'+idCmb).append($('<option>', {
                        value: obj.idXaPhuong,
                        text : obj.tenXaPhuong
                    }));
                });

                if(idXaPhuong!=undefined)
                    $('#'+idCmb).val(idXaPhuong);

            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading(idContain);
        }
    });
}

function layTtKhuTro(id) {
    $.ajax({
        url:prefURL+'/lay-khu-tro',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#txt-id').val(res.resData.khuTro.idKhuTro);
                $('#txt-ten').val(res.resData.khuTro.tenKhuTro);
                $('#txt-dia-chi').val(res.resData.khuTro.diaChi);
                $('#txt-lat').val(res.resData.khuTro.viDo);
                $('#txt-lon').val(res.resData.khuTro.kinhDo);
                $('#cmb-chu-tro').val(res.resData.khuTro.idChuTro);
                $('#cmb-tinh').val(res.resData.khuTro.idTinhTp);
                $('#cmb-tinh').trigger('change', {'idQuanHuyen':res.resData.khuTro.idQuanHuyen,'idXaPhuong':res.resData.khuTro.idXaPhuong});

                dsKhoangCach=res.resData.khoangCach;
                var grid=$('#lst-truong').data('jdgrid');
                for(var i=0;i<dsTruong.length;i++) {
                    grid.setCellContent(i,2,'');
                }
                $.each(res.resData.khoangCach,function(i, obj) {
                    grid.setCellContent(obj.id.idTruong-1,2,obj.khoangCach);
                });
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body');
        }
    });
}

function xoa(id) {
    $.ajax({
        url:prefURL+'/xoa-khu-tro',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('box-list');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                layDsKhuTro();
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('box-list');
        }
    });
}

function luuLoaiPhong() {
    $.ajax({
        url:prefURL+'/luu-loai-phong',
        method:'post',
        dataType:'json',
        data:new FormData($('#frm-loai-phong')[0]),
        processData:false,
        contentType:false,
        beforeSend:function() {
            showBoxLoading('mod-body-loai-phong');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                layDsLoaiPhong($('#txt-id-khu-tro').val());
                clearLoaiPhong();
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body-loai-phong');
        }
    });
}

function layDsLoaiPhong(id) {
    $.ajax({
        url:prefURL+'/lay-ds-loai-phong',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('mod-body-loai-phong');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#lst-loai-phong').data('jdgrid').fillData(res.resData);
                $('.cmd-edit-lp').click(function(e) {
                     e.preventDefault();
                     layTtLoaiPhong($(this).attr('rid'));
                });
                $('.cmd-del-lp').click(function(e) {
                    e.preventDefault();
                    if(confirm('Bạn chắc muốn xóa?')) {
                        xoaLoaiPhong($(this).attr('rid'));
                    }
                });
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body-loai-phong');
        }
    });
}

function layTtLoaiPhong(id) {
    $.ajax({
        url:prefURL+'/lay-loai-phong',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('mod-body-loai-phong');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#txt-id-loai-phong').val(res.resData.idLoaiPhong);
                $('#txt-ten-loai-phong').val(res.resData.tenLoaiPhong);
                $('#txt-dien-tich').val(res.resData.dienTich);
                $('#txt-so-nguoi-o').val(res.resData.soNguoiO);
                $('#txt-id-gia-thue').val(res.resData.idGiaThueHienTai);
                $('#txt-gia-thue').val(res.resData.giaThueHienTai);
                $('#txt-ngay-ad').val(millisec2Date(res.resData.ngayApDungGiaThueHienTai,'yyyy-mm-dd'));
                $('#txt-mo-ta').val(res.resData.moTa);
                $('#chk-gac').prop('checked',res.resData.coGac);
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body-loai-phong');
        }
    });
}

function clearLoaiPhong() {
    $('#txt-id-loai-phong').val('');
    $('#txt-ten-loai-phong').val('');
    $('#txt-dien-tich').val('');
    $('#txt-so-nguoi-o').val('');
    $('#txt-id-gia-thue').val('');
    $('#txt-gia-thue').val('');
    $('#txt-ngay-ad').val('');
    $('#txt-mo-ta').val('');
    $('#chk-gac').prop('checked',false);
}

function xoaLoaiPhong(id) {
    $.ajax({
        url:prefURL+'/xoa-loai-phong',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('mod-body-loai-phong');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                layDsLoaiPhong($('#txt-id-khu-tro').val());
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body-loai-phong');
        }
    });
}

function initPhongTro(idKhuTro) {
    $.ajax({
        url:prefURL+'/init-phong-tro',
        method:'post',
        data:{idKhuTro:idKhuTro},
        beforeSend:function() {
            //showBoxLoading('mod-body-phong-tro');
        }, success:function(res) {
            if(res.resCode>0) {
                var dsLoaiPhong=res.resData['loaiPhong'];
                var dsTinhTrang=res.resData['tinhTrang'];

                $.each(dsLoaiPhong,function(i,obj){
                    $('#cmb-loai-phong').append($('<option>', {
                        value: obj.idLoaiPhong,
                        text : obj.tenLoaiPhong
                    }));
                });
                $.each(dsTinhTrang,function(i,obj){
                    $('#cmb-tinh-trang').append($('<option>', {
                        value: obj.idTinhTrang,
                        text : obj.tenTinhTrang
                    }));
                });
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            //hideBoxLoading('mod-body-phong-tro');
        }
    });
}

function layDsPhongTro(id) {
    $.ajax({
        url:prefURL+'/lay-ds-phong-tro',
        method:'post',
        data:{idKhuTro:id},
        beforeSend:function() {
            showBoxLoading('mod-body-phong-tro');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#lst-phong-tro').data('jdgrid').fillData(res.resData);
                $('.cmd-edit-pt').click(function(e) {
                     e.preventDefault();
                     layTtPhongTro($(this).attr('rid'));
                });
                $('.cmd-del-pt').click(function(e) {
                    e.preventDefault();
                    if(confirm('Bạn chắc muốn xóa?')) {
                        xoaPhongTro($(this).attr('rid'));
                    }
                });
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body-phong-tro');
        }
    });
}

function luuPhongTro() {
    $.ajax({
        url:prefURL+'/luu-phong-tro',
        method:'post',
        dataType:'json',
        data:new FormData($('#frm-phong-tro')[0]),
        processData:false,
        contentType:false,
        beforeSend:function() {
            showBoxLoading('mod-body-phong-tro');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                clearPhongTro();
                layDsPhongTro($('#txt-id-khu-tro-pt').val());
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body-phong-tro');
        }
    });
}

function clearPhongTro() {
    $('#txt-stt-phong').val('');
    $('#txt-id-phong-tro').val('');
}

function layTtPhongTro(id) {
    $.ajax({
        url:prefURL+'/lay-phong-tro',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('mod-body-phong-tro');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#cmb-loai-phong').val(res.resData.idLoaiPhong);
                $('#cmb-tinh-trang').val(res.resData.idTinhTrang);
                $('#txt-id-phong-tro').val(res.resData.idPhongTro);
                $('#txt-stt-phong').val(res.resData.sttPhong);
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body-phong-tro');
        }
    });
}

function xoaPhongTro(id) {
    $.ajax({
        url:prefURL+'/xoa-phong-tro',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('mod-body-phong-tro');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                layDsPhongTro($('#txt-id-khu-tro-pt').val());
            } else {
                alert(res.resMsg);
            }
        }, error:function(jqXHR) {
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }, complete:function() {
            hideBoxLoading('mod-body-phong-tro');
        }
    });
}

function tinhKhoangCach(idx, lat, lon,idTruong) {
    var grid=$('#lst-truong').data('jdgrid');
    var myRoute = L.Routing.osrmv1();

    if(idx==undefined || lat==undefined || lon==undefined || idTruong==undefined) {

        $.each(dsTruong, function(i, obj) {
            grid.setCellContent(i,2,'<i class="fa fa-spinner fa-spin"></i>');

            var wayPoint1 = L.latLng($('#txt-lat').val(), $('#txt-lon').val());
            var wayPoint2 = L.latLng(obj.viDo, obj.kinhDo);

            var rWP1 = new L.Routing.Waypoint;
            rWP1.latLng = wayPoint1;

            var rWP2 = new L.Routing.Waypoint;
            rWP2.latLng = wayPoint2;

            myRoute.route([rWP1, rWP2], function(err, routes) {
                console.log(err);
                if(err) {
                    grid.setCellContent(i,2,'Err');
                } else {
                    var kc={};
                    distance = routes[0].summary.totalDistance;
                    //console.log('routing distance: ('+i+')('+obj.tenTruong+'): ' + distance);
                    //console.log(routes);
                    grid.setCellContent(i,2,distance);
                    var idck={};

                    idck.idTruong=Number(obj.idTruong);
                    idck.idKhuTro=Number($('#txt-id').val());
                    kc.id=idck;
                    kc.khoangCach=distance;
                    dsKhoangCach.push(kc);
                }
            });
        });
    } else {
        grid.setCellContent(idx,2,'<i class="fa fa-spinner fa-spin"></i>');

        var wayPoint1 = L.latLng($('#txt-lat').val(), $('#txt-lon').val());
        var wayPoint2 = L.latLng(lat, lon);

        var rWP1 = new L.Routing.Waypoint;
        rWP1.latLng = wayPoint1;

        var rWP2 = new L.Routing.Waypoint;
        rWP2.latLng = wayPoint2;

        myRoute.route([rWP1, rWP2], function(err, routes) {
            console.log(err);
            if(err) {
                grid.setCellContent(idx,2,'Err');
            } else {
                var kc={};
                distance = routes[0].summary.totalDistance;
                grid.setCellContent(idx,2,distance);
                var idck={};

                idck.idTruong=Number(idTruong);
                idck.idKhuTro=Number($('#txt-id').val());
                kc.id=idck;
                kc.khoangCach=distance;
                dsKhoangCach[idx]=kc;
            }
        });
    }
}