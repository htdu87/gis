var prefURL='/dm-quan-huyen';

$(document).ready(function() {
    $('#lst-item').jdGrid({
        columns:[
            {name:'tenQuanHuyen',title:'Tên quận/huyện'},
            {name:'tenTinhTp',title:'Tỉnh/Thành phố'},
            {name:'',title:'T.Tác',type:'control',css:{'text-align':'center','width':'70px'},content:function(obj) {
                return '<a href="#" class="cmd cmd-edit" data-rid="'+obj.idQuanHuyen+'" title="Chỉnh sửa" data-target="#mod-quan-huyen" data-toggle="modal"><i class="fa fa-edit"></i></a><a href="#" class="cmd cmd-del" rid="'+obj.idQuanHuyen+'" title="Xóa"><i class="fa fa-trash text-danger"></i></a>';
            }}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'STT',
        nocss:{'text-align':'center','width':'50px'}
    });

    $('#mod-quan-huyen').on('shown.bs.modal', function (e) {
        var button = $(e.relatedTarget);
        var id=button.data('rid');
        if(id != undefined) {
            layTtQuanHuyen(id);
        }
    });

    $('#mod-quan-huyen').on('hidden.bs.modal', function (e) {
        clear();
    });

    $('#btn-search').click(function() {
        layDsQuanHuyen();
    });

    $('#btn-clear').click(function() {
        $('#cmb-q-tinh').val(-1);
        $('#txt-q-ten').val('');
        layDsQuanHuyen();
    });

    $('#btn-save').click(function() {
        var tinh=$('#cmb-tinh').val();
        var ten=$('#txt-ten').val();
        var pol=$('#txt-polygon').val();

        if(tinh==null||ten==''||pol=='') {
            alert('Vui lòng nhập đầy đủ thông tin quận/huyện')
        } else {
            luu();
        }
    });

    init();
    layDsQuanHuyen();
});

function clear() {
    $('#txt-id').val('');
    //$('#cmb-tinh').val(res.resData.idTinhTp);
    $('#txt-ten').val('');
    $('#txt-polygon').val('');
}

function init() {
    $.ajax({
        url:prefURL+'/init',
        method:'post',
        beforeSend:function() {
            showBoxLoading('box-search');
        }, success:function(res) {
            if(res.resCode>0) {
                var dsTinhTp=res.resData['tinhTp'];

                $.each(dsTinhTp,function(i,obj){
                    $('#cmb-tinh, #cmb-q-tinh').append($('<option>', {
                        value: obj.idTinhTp,
                        text : obj.tenTinhTp
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

function luu() {
    $.ajax({
        url:prefURL+'/luu',
        method:'post',
        dataType:'json',
        data:new FormData($('#frm-quan-huyen')[0]),
        processData:false,
        contentType:false,
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                $('#mod-quan-huyen').modal('hide');
                layDsQuanHuyen();
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

function layDsQuanHuyen() {
    $.ajax({
        url:prefURL+'/lay-danh-sach',
        method:'post',
        data:{ten:$('#txt-q-ten').val(),idTTp:$('#cmb-q-tinh').val()},
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

function layTtQuanHuyen(id) {
    $.ajax({
        url:prefURL+'/lay-quan-huyen',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#txt-id').val(res.resData.idQuanHuyen);
                $('#cmb-tinh').val(res.resData.idTinhTp);
                $('#txt-ten').val(res.resData.tenQuanHuyen);
                $('#txt-polygon').val(res.resData.polygon);
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
        url:prefURL+'/xoa-quan-huyen',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('box-list');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                layDsQuanHuyen();
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