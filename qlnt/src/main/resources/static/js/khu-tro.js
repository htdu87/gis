var prefURL = '/ql-khu-tro'

var dsTinhTp;
var dsQuanHuyen;
var dsXaPhuong;
var dsChuKhuTro;

$(document).ready(function() {
    $('#lst-item').jdGrid({
        columns:[
            {name:'tenKhuTro',title:'Tên khu trọ'},
            {name:'fullAddress',title:'Địa chỉ'},
            {name:'tenChuKhuTro',title:'Tên chủ khu trọ'},
            {name:'',title:'T.Tác',type:'control',css:{'text-align':'center'},content:function(obj) {
                return '<a href="#" class="cmd cmd-edit" data-rid="'+obj.idPhiKhac+'" title="Chỉnh sửa" data-target="#mod-edit" data-toggle="modal"><i class="fa fa-edit"></i></a><a href="#" class="cmd cmd-del" rid="'+obj.idPhiKhac+'" title="Xóa"><i class="fa fa-trash text-danger"></i></a>';
            }}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'STT',
        nocss:{'text-align':'center','width':'50px'}
    });

    $('#mod-khu-tro').on('shown.bs.modal', function (e) {
        if(dsTinhTp==null||dsQuanHuyen==null||dsXaPhuong==null||dsChuKhuTro==null) {
            init();
        }
    });

    $('#cmb-tinh').change(function() {
        layQuanHuyen($(this).val(),'cmb-huyen', 'mod-body');
    });

    $('#cmb-huyen').change(function() {
        layXaPhuong($(this).val(),'cmb-xa', 'mod-body');
    });

    $('#cmb-q-tinh').change(function() {
        layQuanHuyen($(this).val(),'cmb-q-huyen', 'box-search');
    });

    $('#cmb-q-huyen').change(function() {
        layXaPhuong($(this).val(),'cmb-q-xa', 'box-search');
    });

    $('#btn-save').click(function() {
        luu();
    });

    $('#btn-search').click(function() {
        layDsKhuTro();
    });

    init();
    layDsKhuTro();
});

function luu() {
    $.ajax({
        url:prefURL+'/luu',
        method:'post',
        dataType:'json',
        data:new FormData($('#frm-khu-tro')[0]),
        processData:false,
        contentType:false,
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                $('#mod-khu-tro').modal('hide');
                //clear();
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
        data:{ten:$('#txt-q-ten').val(),dc:$('#txt-q-dia-chi').val(),id:$('#cmb-q-xa').val()},
        beforeSend:function() {
            showBoxLoading('box-search');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#lst-item').data('jdgrid').fillData(res.resData);
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

function layQuanHuyen(idTinhTp, idCmb, idContain) {
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

                $('#'+idCmb).change();
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

function layXaPhuong(idQuanHuyen, idCmb, idContain) {
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