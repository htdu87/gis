var prefURL = '/dm-tinh-tp';

$(document).ready(function() {
    $('#lst-item').jdGrid({
        columns:[
            {name:'tenTinhTp',title:'Tên tỉnh/thành phố'},
            {name:'',title:'T.Tác',type:'control',css:{'text-align':'center','width':'100px'},content:function(obj) {
                return '<a href="#" class="cmd cmd-edit" data-rid="'+obj.idTinhTp+'" title="Chỉnh sửa" data-target="#mod-tinh-tp" data-toggle="modal"><i class="fa fa-edit"></i></a><a href="#" class="cmd cmd-del" rid="'+obj.idTinhTp+'" title="Xóa"><i class="fa fa-trash text-danger"></i></a>';
            }}
        ],
        extclass:'tbl-primary',
        height:'400px',
        shwno:true,
        nolabel:'STT',
        nocss:{'text-align':'center','width':'50px'}
    });

    $('#btn-search').click(function() {
        layDsTinhTp();
    });

    $('#btn-save').click(function() {
        luu();
    });


    layDsTinhTp();
});

function layDsTinhTp() {
    $.ajax({
        url:prefURL+'/lay-danh-sach',
        method:'post',
        data:{ten:$('#txt-q-ten').val()},
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

function luu() {
    $.ajax({
        url:prefURL+'/luu',
        method:'post',
        dataType:'json',
        data:new FormData($('#frm-tinh-tp')[0]),
        processData:false,
        contentType:false,
        beforeSend:function() {
            showBoxLoading('mod-body');
        }, success:function(res) {
            if(res.resCode>0) {
                showToastSuc(res.resMsg);
                $('#mod-tinh-tp').modal('hide');
                //clear();
                //layDsChuKhuTro();
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