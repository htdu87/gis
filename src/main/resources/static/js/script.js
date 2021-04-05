function millisec2Date(millisec, format) {
    if(millisec==null)return null;
    var date=new Date(millisec);
    var dd=('0'+date.getDate()).slice(-2);
    var mm=('0'+(date.getMonth() + 1)).slice(-2);
    var yyyy=date.getFullYear();
    return format.replace('dd',dd).replace('mm',mm).replace('yyyy',yyyy);
}

function showBoxLoading(boxId){
    var div=$('<div/>').addClass('overlay');
    div.append('<i class="fa fa-spinner fa-spin"></i>');
    $('#'+boxId).append(div);
}

function hideBoxLoading(boxId){
    $('#'+boxId+' .overlay').remove();
}

function showPageLoading(){
    var div=$('<div/>').addClass('page-overlay');
    div.append('<i class="fa fa-spinner fa-spin"></i>');
    $('body').append(div);
}

function hidePageLoading(){
    $('body .page-overlay').remove();
}

function showErr(title, message){
	var modal ='<div class="modal bs-example-modal-sm" tabindex="-1" role="dialog" id="jAlert">'
				+'<div class="modal-dialog modal-sm" role="document">'
				+'	<div class="modal-content">'
				+'		<div class="modal-header modal-err">'
				+'			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
				+'			<h4 class="modal-title">'+title+'</h4>'
				+'		</div>'
				+'		<div class="modal-body text-danger">'+message+'</div>'
				+'		<div class="modal-footer">'
				+'			<button type="button" class="btn btn-danger btn-flat btn-sm" data-dismiss="modal">&nbsp;&nbsp;OK&nbsp;&nbsp;</button>'
				+'		</div>'
				+'	</div>'
				+'</div>'
			+'</div>';
	$('body').append(modal);
	$('#jAlert').on('shown.bs.modal', function (e) {$(this).find(".btn-danger").focus();});
	$('#jAlert').on('hidden.bs.modal', function (e) {$('#jAlert').remove();});
	$("#jAlert").modal("show");
}

function showCfm(title, message, callback){
	var yesClk = false;
	var modal ='<div class="modal bs-example-modal-sm" tabindex="-1" role="dialog" id="jConfirm">'
				+'<div class="modal-dialog modal-sm" role="document">'
				+'	<div class="modal-content">'
				+'		<div class="modal-header modal-cfrm">'
				+'			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
				+'			<h4 class="modal-title">'+title+'</h4>'
				+'		</div>'
				+'		<div class="modal-body text-warning">'+message+'</div>'
				+'		<div class="modal-footer">'
				+'			<button type="button" class="btn btn-default btn-flat btn-sm" data-dismiss="modal">KHÔNG</button>'
				+'			<button type="button" class="btn btn-warning btn-flat btn-sm" data-dismiss="modal" id="btnModalYes">&nbsp;&nbspCÓ&nbsp;&nbsp;</button>'
				+'		</div>'
				+'	</div>'
				+'</div>'
			+'</div>';
	$('body').append(modal);
	$('#btnModalYes').click(function(){yesClk=true;});
	$('#jConfirm').on('shown.bs.modal', function (e) {$(this).find('.btn-warning').focus();});
	$('#jConfirm').on('hidden.bs.modal', function (e) {$('#jConfirm').remove();if(yesClk && callback!=undefined)callback();});
	$("#jConfirm").modal("show");
}

function showToastSuc(message,timeout){
	var time= !isNaN(timeout)?timeout:3000;
	var toast='<div id="toast-inf" class="toast toast-info">'+message+'</div>';
	$('body').append(toast);
	$('#toast-inf').fadeIn().delay(time).fadeOut(function(){
		$(this).remove();
	});
}

function showToastErr(message,timeout){
    var time= !isNaN(timeout)?timeout:3000;
	var toast='<div id="toast-err" class="toast toast-err">'+message+'</div>';
	$('body').append(toast);
	$('#toast-err').fadeIn().delay(time).fadeOut(function(){
		$(this).remove();
	});
}
