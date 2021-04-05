var prefURL='/dm-xa-phuong';

$(document).ready(function() {
    $('#lst-item').jdGrid({
        columns:[
            {name:'tenXaPhuong',title:'Tên xã/phường'},
            {name:'tenQuanHuyen',title:'Quận/Huyện'},
            {name:'tenTinhTp',title:'Tỉnh/Thành phố'},
            {name:'',title:'T.Tác',type:'control',css:{'text-align':'center','width':'70px'},content:function(obj) {
                return '<a href="#" class="cmd cmd-edit" data-rid="'+obj.idXaPhuong+'" title="Chỉnh sửa" data-target="#mod-xa-phuong" data-toggle="modal"><i class="fa fa-edit"></i></a><a href="#" class="cmd cmd-del" rid="'+obj.idXaPhuong+'" title="Xóa"><i class="fa fa-trash text-danger"></i></a>';
            }}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'STT',
        nocss:{'text-align':'center','width':'50px'}
    });

    $('#mod-xa-phuong').on('shown.bs.modal', function (e) {
        var button = $(e.relatedTarget);
        var id=button.data('rid');
        if(id != undefined) {
            layTtXaPhuong(id);
        }
    });

    $('#mod-xa-phuong').on('hidden.bs.modal', function (e) {
        clear();
    });

    $('#cmb-q-tinh').change(function() {
        layDsQuanHuyen($(this).val(), 'box-search', 'cmb-q-huyen');
    });

    $('#cmb-tinh').change(function(e,selectedVal) {
        layDsQuanHuyen($(this).val(), 'mod-body', 'cmb-huyen',selectedVal);
    });

    $('#btn-search').click(function() {
        layDsXaPhuong();
    });

    $('#btn-clear').click(function() {
        $('#cmb-q-tinh').val(-1);
        $('#cmb-q-huyen').val(-1);
        $('#txt-q-ten').val('');
        layDsXaPhuong();
    });

    $('#btn-save').click(function() {
        var huyen=$('#cmb-huyen').val();
        var ten=$('#txt-ten').val();
        var pol=$('#txt-polygon').val();

        if(huyen==null||ten==''||pol=='') {
            alert('Vui lòng nhập đầy đủ thông tin xã/phường')
        } else {
            luu();
        }
    });

    init();
});

function clear() {
    $('#txt-id').val('');
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

                var dsQuanHuyen=res.resData['quanHuyen'];
                $.each(dsQuanHuyen,function(i,obj){
                    $('#cmb-q-huyen').append($('<option>', {
                        value: obj.idQuanHuyen,
                        text : obj.tenQuanHuyen
                    }));
                });

                layDsXaPhuong();
                $('#cmb-tinh').change();
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

function layDsXaPhuong() {
    $.ajax({
        url:prefURL+'/lay-danh-sach',
        method:'post',
        data:{ten:$('#txt-q-ten').val(),idQuanHuyen:$('#cmb-q-huyen').val(), idTTp:$('#cmb-q-tinh').val()},
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

function layDsQuanHuyen(idTTp, idContain, idCmb, selectedVal) {
    $.ajax({
        url:prefURL+'/lay-ds-quan-huyen',
        method:'post',
        data:{id:idTTp},
        beforeSend:function() {
            showBoxLoading(idContain);
        }, success:function(res) {
            if(res.resCode>0) {
                var dsQuanHuyen=res.resData;
                if(idCmb.includes('-q-'))
                    $('#'+idCmb).find('option:gt(0)').remove();
                else
                    $('#'+idCmb).find('option').remove();

                $.each(dsQuanHuyen,function(i,obj){
                    $('#'+idCmb).append($('<option>', {
                        value: obj.idQuanHuyen,
                        text : obj.tenQuanHuyen
                    }));
                });

                if(selectedVal!=undefined)
                    $('#'+idCmb).val(selectedVal);

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

function luu() {
    $.ajax({
        url:prefURL+'/luu',
        method:'post',
        dataType:'json',
        data:new FormData($('#frm-xa-phuong')[0]),
        processData:false,
        contentType:false,
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                $('#mod-xa-phuong').modal('hide');
                layDsXaPhuong();
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

function layTtXaPhuong(id) {
    $.ajax({
        url:prefURL+'/lay-xa-phuong',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#txt-id').val(res.resData.idXaPhuong);
                $('#cmb-tinh').val(res.resData.idTinhTp);
                $('#txt-ten').val(res.resData.tenXaPhuong);
                $('#txt-polygon').val(res.resData.polygon);
                $('#cmb-tinh').trigger('change', res.resData.idQuanHuyen);
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
        url:prefURL+'/xoa-xa-phuong',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('box-list');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                layDsXaPhuong();
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