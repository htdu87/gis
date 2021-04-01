package com.dsc.qlnt.controller;

import com.dsc.qlnt.ModelAttr;
import com.dsc.qlnt.Response;
import com.dsc.qlnt.Utility;
import com.dsc.qlnt.model.QuanHuyen;
import com.dsc.qlnt.model.TinhTp;
import com.dsc.qlnt.service.QuanHuyenService;
import com.dsc.qlnt.service.TinhTpService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/dm-quan-huyen")
public class QuanHuyenController {
    @Autowired
    private TinhTpService tinhTpSer;
    @Autowired
    private QuanHuyenService quanHuyenSer;

    @RequestMapping("")
    String showView(Model model) {
        ModelAttr modelAttr=new ModelAttr(Utility.layNguoiDungHienTai(),
                "Danh mục quận/huyện",
                "sub/quan-huyen",
                new String[]{"/bower_components/jdgrid/js/jdgrid-v4.js","js/quan-huyen.js"},
                new String[]{"/bower_components/jdgrid/css/jdgrid.css"}
        );
        model.addAttribute("MODEL",modelAttr);
        return "layout";
    }

    @RequestMapping("/init")
    @ResponseBody
    public Response init() {
        List<TinhTp> dsTinhTp=tinhTpSer.layDsTinhTp("");
        for (TinhTp t:dsTinhTp) {
            t.setPolygon("");
        }

        ObjectMapper mapper=new ObjectMapper();
        ObjectNode resData=mapper.createObjectNode();

        ArrayNode nodeTinhTp=mapper.valueToTree(dsTinhTp);
        resData.putArray("tinhTp").addAll(nodeTinhTp);

        return new Response(1,resData);
    }

    @RequestMapping("/luu")
    @ResponseBody
    public Response luuThongTin(QuanHuyen qh) {
        try {
            quanHuyenSer.luu(qh.getIdQuanHuyen()==null?-1:qh.getIdQuanHuyen(),
                    qh.getTinhTp().getIdTinhTp(),qh.getTenQuanHuyen(), qh.getPolygon());
            return new Response(1, "Lưu thông tin thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1, "Lưu thông tin quận/huyện không thành công, vui lòng thử lại sau");
        }
    }

    @RequestMapping("/lay-danh-sach")
    @ResponseBody
    public Response layDsQuanHuyen(Integer idTTp, String ten) {
        List<QuanHuyen> data=quanHuyenSer.layDsQuanHuyen(idTTp, ten);
        for (QuanHuyen qh:data) {
            qh.setPolygon("");
        }
        return new Response(1, data);
    }

    @RequestMapping("/lay-quan-huyen")
    @ResponseBody
    public Response layTtQuanHuyen(Integer id) {
        return new Response(1, quanHuyenSer.layQuanHuyenTheoId(id));
    }

    @RequestMapping("/xoa-quan-huyen")
    @ResponseBody
    public Response xoaTtQuanHuyen(Integer id) {
        try {
            quanHuyenSer.xoa(id);
            return new Response(1, "Xóa thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1, "Xóa quận/huyện không thành công, vui lòng thử lại sau");
        }
    }
}
