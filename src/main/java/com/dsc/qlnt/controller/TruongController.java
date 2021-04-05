package com.dsc.qlnt.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dsc.qlnt.ModelAttr;
import com.dsc.qlnt.Response;
import com.dsc.qlnt.Utility;

import com.dsc.qlnt.model.QuanHuyen;
import com.dsc.qlnt.model.TinhTp;
import com.dsc.qlnt.model.Truong;
import com.dsc.qlnt.model.XaPhuong;
import com.dsc.qlnt.service.QuanHuyenService;
import com.dsc.qlnt.service.TinhTpService;
import com.dsc.qlnt.service.TruongService;
import com.dsc.qlnt.service.XaPhuongService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Controller
@RequestMapping("/ql-truong")
public class TruongController {
	@Autowired
    private TinhTpService tinhTpSer;
    @Autowired
    private QuanHuyenService quanHuyenSer;
    @Autowired
    private XaPhuongService xaPhuongSer;
	@Autowired
	private TruongService truongSer;
    
	@RequestMapping("")
    String showView(Model model) {
        ModelAttr modelAttr=new ModelAttr(Utility.layNguoiDungHienTai(),
                "Quản lý trường Đại học và Cao đẳng",
                "sub/truong",
                new String[]{"/bower_components/jdgrid/js/jdgrid-v4.js","js/truong.js"},
                new String[]{"/bower_components/jdgrid/css/jdgrid.css"}
        );
        model.addAttribute("MODEL",modelAttr);
        return "layout";
    }
	
	@RequestMapping("/init")
    @ResponseBody
    public Response init() {
        List<TinhTp> dsTinhTp=tinhTpSer.layDsTinhTp("");
        List<QuanHuyen> dsQuanHuyen=dsTinhTp.size()>0?quanHuyenSer.layDsQuanHuyen(dsTinhTp.get(0).getIdTinhTp()):new ArrayList<>();
        List<XaPhuong> dsXaPhuong=dsQuanHuyen.size()>0?xaPhuongSer.layDsXaPhuong(dsQuanHuyen.get(0).getIdQuanHuyen()):new ArrayList<>();
       

        ObjectMapper mapper=new ObjectMapper();
        ObjectNode resData=mapper.createObjectNode();

        ArrayNode nodeTinhTp=mapper.valueToTree(dsTinhTp);
        resData.putArray("tinhTp").addAll(nodeTinhTp);

        ArrayNode nodeQuanHuyen=mapper.valueToTree(dsQuanHuyen);
        resData.putArray("quanHuyen").addAll(nodeQuanHuyen);

        ArrayNode nodeXaPhuong=mapper.valueToTree(dsXaPhuong);
        resData.putArray("xaPhuong").addAll(nodeXaPhuong);        

        return new Response(1, resData);
    }
	
	 @RequestMapping("/lay-quan-huyen")
    @ResponseBody
    public Response layQuanHuyen(Integer idTinhTp) {
        return new Response(1,quanHuyenSer.layDsQuanHuyen(idTinhTp));
    }

    @RequestMapping("/lay-xa-phuong")
    @ResponseBody
    public Response layXaPhuong(Integer idQuanHuyen) {
        return new Response(1,xaPhuongSer.layDsXaPhuong(idQuanHuyen));
    }

    @RequestMapping("/luu")
    @ResponseBody
    public Response luuThongTin(Truong truong) {
        
            try {
                truongSer.luuThongTinTruong(truong);
                return new Response(1,"Lưu thông tin thành công!");
            } catch (Exception e) {
                e.printStackTrace();
                return new Response(-1,"Lưu thông tin không thành công, vui lòng kiểm tra lại.");
            }
        
    }
    
    @RequestMapping(value = "/lay-danh-sach-truong", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public Response layDanhSachTruong(String tenTruong, String diaChi, Integer id) {
    	//List<Truong> truong = new ArrayList<>();
    	//truong =  truongSer.layDanhSachTruong(tenTruong, diaChi, id);    	
    	
    	
        return new Response(1, truongSer.layDanhSachTruong(tenTruong, diaChi, id));    	
    }
}

