(function($){
	jQuery.fn.jdPage=function(options){
		var defaults={
			totalPage:0,
			currentPage:0,
			totalItem:0,
			itemOnPage:0,
			activeCls:'active',
			showLabel:true,
			labelFormat:'Hiển thị <b>FROM_ITM</b> đến <b>TO_ITM</b> của <b>TOTAL_ITM</b> [Trang CUR_PAGE/TOL_PAGE]',
			onPageChanged:function(){}
		};
		var settings=$.extend({},defaults,options);
		var jdpage={
			element:this,
			setData:function(data){
				var pdata=$.extend({},{totalPage:0,currentPage:0,totalItem:0,itemOnPage:0},data);
				settings.totalPage=pdata.totalPage;
				settings.currentPage=pdata.currentPage;
				settings.totalItem=pdata.totalItem;
				settings.itemOnPage=pdata.itemOnPage;
				genPaging(this.element);
				regEvent();
			},
			setCurrentPage:function(page){
				settings.currentPage=page;
				genPaging(this.element);
				regEvent();
			},
			getCurrentPage:function(){
				return settings.currentPage;
			}
		};
		$(this).data('jdpage',jdpage);
		return this.each(function(){
			genPaging(this);
			regEvent();
		});
		
		function genPaging(dom){
			$(dom).empty();
			var row=$('<div/>').addClass('row');
			if(settings.showLabel){
				var frm=(settings.currentPage*settings.itemOnPage-settings.itemOnPage)+1;
				frm=frm<0?0:frm>settings.totalItem?settings.totalItem:frm;
				var to=settings.currentPage*settings.itemOnPage;
				to=to<0?0:to>settings.totalItem?settings.totalItem:to;
				settings.currentPage=Math.min(settings.currentPage,settings.totalPage);
				
				var col1=$('<div/>').addClass('col-md-6').css({'line-height':'35px'});
				col1.append(settings.labelFormat.replace('FROM_ITM',frm).replace('TO_ITM',to).replace('TOTAL_ITM',settings.totalItem).replace('CUR_PAGE',settings.currentPage).replace('TOL_PAGE',settings.totalPage));
				
				var col2=$('<div/>').addClass('col-md-6 text-right');
				if(settings.totalPage>1){
					col2.append(genPage());
				}
				
				row.append(col1).append(col2);
			}else{
				var col1=$('<div/>').addClass('col-md-12 text-right').css({'height':'35px'});
				if(settings.totalPage>1){
					col1.append(genPage());
				}
				row.append(col1);
			}
			
			$(dom).append(row);
		}
		
		function genPage(){
			var nav=$('<nav/>');
			var ul=$('<ul/>').addClass('pagination pagination-sm');
			var start=settings.currentPage-2>0?settings.currentPage-2:1;
			var end=start+4>settings.totalPage?settings.totalPage:start+4;
			//start=end-4!=start&&end-4>0?end-4:start;
			start=end-4<=0?1:end-4;
			ul.append('<li><a href="#" page="1" class="jdpage-page">&laquo;</a></li>');
			for(var i=start;i<=end;i++){
				var li=$('<li/>');
				li.append('<a href="#" page="'+i+'" class="jdpage-page">'+i+'</a>');
				if(i==settings.currentPage)li.addClass(settings.activeCls);
				ul.append(li);
			}
			ul.append('<li><a href="#" page="'+settings.totalPage+'" class="jdpage-page">&raquo;</a></li>');
			ul.css({'margin':'0px'});
			nav.append(ul);
			
			return nav;
		}
		
		function regEvent(){
			$('.jdpage-page').click(function(e){
				e.preventDefault();
				settings.onPageChanged($(this).attr('page'));
			});
		}
	};
})(jQuery);