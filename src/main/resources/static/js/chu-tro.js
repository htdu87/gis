var prefURL='/ql-chu-tro';

$(document).ready(function() {
    $('#lst-item').jdGrid({
        columns:[
            {name:'hoTen',title:'Họ tên'},
            {name:'namSinh',title:'Năm sinh',type:'interval-wt'},
            {name:'nu',title:'Nữ',type:'check',css:{'text-align':'center','width':'50px'}},
            {name:'sdt',title:'Số điện thoại'},
            {name:'',title:'T.Tác',type:'control',css:{'text-align':'center','width':'70px'},content:function(obj) {
                return '<a href="#" class="cmd cmd-edit" data-rid="'+obj.idChuKhuTro+'" title="Chỉnh sửa" data-target="#mod-chu-tro" data-toggle="modal"><i class="fa fa-edit"></i></a><a href="#" class="cmd cmd-del" rid="'+obj.idChuKhuTro+'" title="Xóa"><i class="fa fa-trash text-danger"></i></a>';
            }}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'STT',
        nocss:{'text-align':'center','width':'50px'}
    });

    $('#mod-chu-tro').on('shown.bs.modal', function (e) {
        var button = $(e.relatedTarget);
        var id=button.data('rid');
        if(id != undefined) {
            layTtChuKhuTro(id);
        }
    });

    $('#mod-chu-tro').on('hidden.bs.modal', function (e) {
        clear();
    });

    $('#btn-save').click(function() {
        var id=$('#txt-id').val();
        var hoTen=$('#txt-hoten').val();
        var namSinh=$('#txt-namsinh').val();
        var sdt=$('#txt-sdt').val();
        var nu=$('#chk-nu').val();

        if(hoTen=='' || sdt=='') {
            alert('Vui lòng nhập đầy đủ họ tên và số điện thoại chủ trọ!');
        } else {
            luuThongTin();
        }
    });

    $('#btn-search').click(function() {
        layDsChuKhuTro();
    });

    $('#btn-clear').click(function() {
        $('#txt-q-hoten').val('');
        $('#txt-q-sdt').val('');

        layDsChuKhuTro();
    });

    layDsChuKhuTro();
});

function clear() {
    $('#txt-id').val('');
    $('#txt-hoten').val('');
    $('#txt-namsinh').val('');
    $('#txt-sdt').val('');
    $('#chk-nu').prop('checked',false);
}

function luuThongTin() {
    $.ajax({
        url:prefURL+'/luu',
        method:'post',
        dataType:'json',
        data:new FormData($('#frm-chu-tro')[0]),
        processData:false,
        contentType:false,
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                $('#mod-chu-tro').modal('hide');
                clear();
                layDsChuKhuTro();
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

function layDsChuKhuTro() {
    $.ajax({
        url:prefURL+'/lay-danh-sach',
        method:'post',
        data:{hoTen:$('#txt-q-hoten').val(),sdt:$('#txt-q-sdt').val()},
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

function layTtChuKhuTro(id) {
    $.ajax({
        url:prefURL+'/lay-chu-tro',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                $('#txt-id').val(res.resData.idChuKhuTro);
                $('#txt-hoten').val(res.resData.hoTen);
                $('#txt-namsinh').val(millisec2Date(res.resData.namSinh,'yyyy-mm-dd'));
                $('#txt-sdt').val(res.resData.sdt);
                $('#chk-nu').prop('checked',res.resData.nu);
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
        url:prefURL+'/xoa-chu-tro',
        method:'post',
        data:{id:id},
        beforeSend:function() {
            showBoxLoading('box-list');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                layDsChuKhuTro();
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