(function($) {
	jQuery.fn.jdGrid=function(options){
		var defaults={
			columns:[],
			data:[],
			footer:[],
			height:'300px',
			class:'table table-bordered table-striped table-hover',
			extclass:'',
			border:{'border':'1px solid #d2d6de'},
			shwfooter:false,
			decsym:',',
			thosym:'.',
			decnum:0,
			dateformat:'dd/mm/yyyy hh:MM:ss',
			shwno:false,
			nocss:{},
			nolabel:'TT',
			page:1,
			rowonpage:0,
			onRowSelected:function(){},
			onCellCommit:function(){},
			onCellCommiting:function(){return true;},
			onRowDoubleClick:function(){},
			onDataUpdated:function(){}
		};
		var settings=$.extend({},defaults,options);
		return this.each(function(){
			var jdgrid={
				element:this,
				fillData:function(data){
					settings.data=data;
					$(this.element).find('table tbody').remove();
					$(this.element).find('table').append(genTableBody());
					regEvent(this.element);
					//adjColums(this.element);
				},
				clearData:function(){
					clrData(this.element);
				},
				getData:function(){
					return settings.data;
				},
				addRow:function(row){
					settings.data.push(row);
					$(this.element).find('table tbody').append(genTableRow(settings.data.length-1, row));
					regEvent(this.element);
					//adjColums(this.element);
				},
				removeRow:function(i){
					settings.data.splice(i,1);
					$(this.element).find('table tbody tr:eq('+i+')').remove();
					//adjColums(this.element);
				},
				refresh:function(){
					//adjColums(this.element);
				},
				setFooter:function(footer){
					if(settings.shwfooter){
						var _this=$(this.element);
						$(this.element).find('table tfoot tr').remove();
						if(Array.isArray(footer)){
							$.each(footer,function(i,f){
								$(_this).find('table tfoot').append(genFooterRow(f));
							});
						}else{
							$(this.element).find('table tfoot').append(genFooterRow(footer));
						}
						//adjColums(this.element);
					}
				},
				getSelectedRow:function(){
					var i=$(this.element).find('table tbody tr.actived').index();
					return i<0?null:settings.data[i];
				},
				getSelectedRowIndex:function(){
					return $(this.element).find('table tbody tr.actived').index();
				},
				clearSelectedRow:function(){
					$(this.element).find('table tbody tr.actived').removeClass('actived');
				},
				updateRow:function(row,i){
					if(i>=0){
						settings.data[i]=row;
						$(this.element).find('table tbody tr:eq('+i+')').replaceWith(genTableRow(i,row));
						regEvent(this.element);
						//adjColums(this.element);
					}
				},
				getCellValue:function(rowIndex,colName){
					return settings.data[rowIndex][colName];
				},
				setCellValue:function(rowIndex,colName,val,refresh){
					settings.data[rowIndex][colName]=val;
					row=settings.data[rowIndex];
					if(refresh)this.updateRow(row,rowIndex);
					settings.onDataUpdated();
				},
				setCellContent:function(rowIndex,colIndex,val){
                    settings.data[rowIndex][colIndex]=val;
                    $(this.element).find('table tbody tr:eq('+rowIndex+') td:eq('+(settings.shwno?colIndex+1:colIndex)+')').html(genTableCellValue(colIndex, val));
                    settings.onDataUpdated();
                },
				setPage:function(page) {
				    settings.page=page;
				},
				setRowOnPage:function(num) {
				    settings.rowonpage=num;
				},
				addColumns: function(cols) {
				    if(Array.isArray(cols)){
				        settings.columns.push.apply(settings.columns,cols);
				    } else {
				        settings.columns.push(cols);
				    }
                    $(this.element).find('table thead tr').remove();
                    $(this.element).find('table thead').append(genTableColumnHeader);
				},
				remColumn: function(colName) {
                    var idx=-1;
                    $.each(settings.columns, function(i, col) {
                        if(col.name==colName) {
                            idx=i;
                            return false;
                        }
                    });

                    if(idx>=0) {
                        settings.columns.splice(idx,1);
                        $.each($(this.element).find('table tr'),function(i, tr) {
                            $(this).children('td:eq('+settings.shwno?idx+1:idx+')').remove();
                        });
                    }
				}
			};

			$(this).removeData('jdgrid');
			$(this).find('table').remove();
			$(this).data('jdgrid',jdgrid);
            $(this).addClass('jdgrid');//.css(settings.border).height(settings.height);

            var tbl=$('<table/>').addClass(settings.class).addClass(settings.extclass);

            // Generate header
            var thead=$('<thead/>');
            thead.append(genTableColumnHeader);
            tbl.append(thead);

            // Generate body
            tbl.append(genTableBody());

            $(this).append(tbl);
		});
		
		function debug(){
			console.log(settings);
		}

		function genTableColumnHeader() {
            var trhead=$('<tr/>');

            if(settings.shwno) {
                var th=$('<th/>');
                th.html(settings.nolabel);
                var css=Object.assign({}, settings.nocss);
                delete css["text-align"];
                th.css(css);
                trhead.append(th);
            }

            $.each(settings.columns,function(i,colm){
                if(colm.title!=undefined){
                    var th=$('<th/>');
                    th.html(colm.title);
                    if(colm.css!=undefined){
                        var css=Object.assign({}, colm.css);
                        delete css["text-align"];
                        th.css(css);
                    }
                    trhead.append(th);
                }
            });
            return trhead;
		}

		function genTableBody(){
			var tblBodyBody=$('<tbody/>');
			$.each(settings.data,function(i,row){
				tblBodyBody.append(genTableRow(i,row));
			});
			return tblBodyBody;
		}
		
		function genTableRow(index,row){
			var tr=$('<tr/>');

			if(settings.shwno) {
                var td=$('<td/>').css(settings.nocss);
                td.html((settings.page*settings.rowonpage-settings.rowonpage)+1+index);
                tr.append(td);
            }

			$.each(settings.columns,function(j,colm){
				var td=$('<td/>');
				switch(colm.type){
					case 'control':
						td.html(colm.content(row));
						break;
					case 'check':
						var checked=row[colm.name]==true||row[colm.name]==1||row[colm.name]=='1'?'checked="checked"':'';
						td.html('<input type="checkbox" onclick="return false" '+checked+'/>');
						break;
					case 'interval':
						td.html(milisec2Date(row[colm.name]));
						break;
					case 'interval-wt':
						td.html(row[colm.name]==null?'':milisec2DateWithoutTime(row[colm.name]));
						break
                    case 'textbox':
                        td.html('<input type="text" class="form-control input-sm jdgrid-input" value="'+row[colm.name]+'" '+(row['disable']?'disabled':'')+' style="text-align:inherit">');
						break;
					default:
						td.html(colm.format?formatNum(row[colm.name],settings.decnum,settings.decsym,settings.thosym):row[colm.name]);
				}
				
				if(colm.css!=undefined){
					td.css(colm.css);
				}
				if(colm.editable){
					td.addClass('editable');
				}
				tr.append(td);
			});
			return tr;
		}

		function genTableCellValue(colIndex, val) {
		    var colm=settings.columns[colIndex];
		    switch(colm.type){
                case 'control':
                    return val;
                case 'check':
                    var checked=val==true||val==1||val=='1'?'checked="checked"':'';
                    return '<input type="checkbox" onclick="return false" '+checked+'/>';
                case 'interval':
                    return milisec2Date(val);
                case 'interval-wt':
                    return milisec2DateWithoutTime(val);
                case 'textbox':
                    return '<input type="text" class="form-control input-sm jdgrid-input" value="'+val+'" style="text-align:inherit"/>';
                    break;
                default:
                    return colm.format?formatNum(val,settings.decnum,settings.decsym,settings.thosym):val;
            }
		}
		
		function genFooterRow(footer){
			var tr=$('<tr/>');
			$.each(settings.columns,function(j,colm){
				var td=$('<td/>');
				if(footer[colm.name]!=undefined){
					td.html(colm.format?formatNum(footer[colm.name],settings.decnum,settings.decsym,settings.thosym):footer[colm.name]);
					if(colm.css!=undefined){
						td.css(colm.css);
					}
				}
				tr.append(td);
			}); 
			return tr;
		}
		
		/*function adjColums(dom){
			$(dom).find('.jdgrid-body-wrapper table thead tr:first th').each(function(i,td){
				$(dom).find('.jdgrid-header-wrapper table thead tr th:eq('+i+'),.jdgrid-footer-wrapper table tfoot tr td:eq('+i+')').outerWidth($(td).outerWidth());
			});
		}*/
		
		function clrData(dom){
			settings.data=[];
			$(dom).find('table tbody tr').remove();
		}
		
		function regEvent(dom){
			// Row click
			$(dom).find('table tbody tr').off('click').on('click',function(){
				//debug();
				$(dom).find('table tbody tr').removeClass('actived');
				$(this).addClass('actived');
				settings.onRowSelected(settings.data[$(this).index()]);
			});

			// Row double click
			$(dom).find('table tbody tr').off('dblclick').on('dblclick',function(){
				settings.onRowDoubleClick(settings.data[$(this).index()]);
			});

			// Cell editable double click
			$(dom).find('table tbody tr td.editable').off('dblclick').on('dblclick',function(){
				//debug();
				var row = $(this).parent().index();
				var col = $(this).index();
				var inpt=$('<input type="text"/>');
				inpt.css({'color':'#000'}).val(settings.data[row][settings.columns[col]['name']]).width($(this).width()-4).height($(this).height()-1);
				$(this).html(inpt);
				//adjColums(dom);
				inpt.select();
				inpt.keypress(function(e){
					if(e.which==13){
						var val=settings.columns[col].format?formatNum($(this).val(),settings.decnum,settings.decsym,settings.thosym):$(this).val();
						if(settings.onCellCommiting(val,row,col)){
							settings.data[row][settings.columns[col]['name']]=$(this).val();
							$(this).parent().html(val);
							//adjColums(dom);
							settings.onCellCommit($(this).val(),row,col);
						}else{
							$(this).parent().html(settings.data[row][settings.columns[col]['name']]);
						}
					}
				});
			});

			// Cell text box focus out
			$(dom).find('table tbody tr td input.jdgrid-input').off('focusout').on('focusout',function(){
                //debug();
                var row = $(this).parent().parent().index();
                var col = $(this).parent().index();
                if(settings.shwno) {
                    col=col-1;
                }
                settings.data[row][settings.columns[col]['name']]=$(this).val();
                settings.onCellCommit($(this).val(),row,col);
                settings.onDataUpdated();
            });

            // Cell text box enter press
            $(dom).find('table tbody tr td input.jdgrid-input').off('keypress').on('keypress',function(e){
                //debug();
                if(e.which==13) {
                    var row = $(this).parent().parent();
                    var textbox=row.next().find('.jdgrid-input');
                    if(textbox.length>0) {
                        textbox.select();
                    } else {
                        $(this).focusout();
                    }
                }
            });
		}
		
		function formatNum(n,c,d,t){
			//console.log(n);
			if(n==='')return '';
			var n = n, 
				c = isNaN(c = Math.abs(c)) ? 2 : c, 
				d = d == undefined ? "." : d, 
				t = t == undefined ? "," : t, 
				s = n < 0 ? "-" : "", 
				i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
				j = (j = i.length) > 3 ? j % 3 : 0;
			
			return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		}
		
		function milisec2Date(milisec){
			var date=new Date(milisec);
			var dd=('0'+date.getDate()).slice(-2);
			var mm=('0'+(date.getMonth() + 1)).slice(-2);
			var yyyy=date.getFullYear();
			var hh=('0'+date.getHours()).slice(-2);
			var MM=('0'+date.getMinutes()).slice(-2);
			var ss=('0'+date.getSeconds()).slice(-2);
			return settings.dateformat.replace('dd',dd).replace('mm',mm).replace('yyyy',yyyy).replace('hh',hh).replace('MM',mm).replace('ss',ss);
		}

		function milisec2DateWithoutTime(milisec){
            var date=new Date(milisec);
            var dd=('0'+date.getDate()).slice(-2);
            var mm=('0'+(date.getMonth() + 1)).slice(-2);
            var yyyy=date.getFullYear();
            return settings.dateformat.replace('dd',dd).replace('mm',mm).replace('yyyy',yyyy).replace('hh','').replace('MM','').replace('ss','').replace(/:/g,'');
        }
	};
	
})(jQuery);