package com.dsc.qlnt.controller;

import com.dsc.qlnt.ModelAttr;
import com.dsc.qlnt.Response;
import com.dsc.qlnt.Utility;
import com.dsc.qlnt.model.QuanHuyen;
import com.dsc.qlnt.model.TinhTp;
import com.dsc.qlnt.model.XaPhuong;
import com.dsc.qlnt.service.QuanHuyenService;
import com.dsc.qlnt.service.TinhTpService;
import com.dsc.qlnt.service.XaPhuongService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/dm-xa-phuong")
public class XaPhuongController {
    @Autowired
    private TinhTpService tinhTpSer;
    @Autowired
    private QuanHuyenService quanHuyenSer;
    @Autowired
    private XaPhuongService xaPhuongSer;

    @RequestMapping("")
    String showView(Model model) {
        ModelAttr modelAttr=new ModelAttr(Utility.layNguoiDungHienTai(),
                "Danh mục xã/phường",
                "sub/xa-phuong",
                new String[]{"/bower_components/jdgrid/js/jdgrid-v4.js","js/xa-phuong.js"},
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

        List<QuanHuyen> dsQuanHuyen=quanHuyenSer.layDsQuanHuyen(-1);
        for (QuanHuyen qh:dsQuanHuyen) {
            qh.setPolygon("");
        }

        ObjectMapper mapper=new ObjectMapper();
        ObjectNode resData=mapper.createObjectNode();

        ArrayNode nodeTinhTp=mapper.valueToTree(dsTinhTp);
        resData.putArray("tinhTp").addAll(nodeTinhTp);

        ArrayNode nodeQuanHuyen=mapper.valueToTree(dsQuanHuyen);
        resData.putArray("quanHuyen").addAll(nodeQuanHuyen);

        return new Response(1,resData);
    }

    @RequestMapping("/init-form")
    @ResponseBody
    public Response initForm() {
        List<TinhTp> dsTinhTp=tinhTpSer.layDsTinhTp("");
        for (TinhTp t:dsTinhTp) {
            t.setPolygon("");
        }

        List<QuanHuyen> dsQuanHuyen=dsTinhTp.size()>0?quanHuyenSer.layDsQuanHuyen(dsTinhTp.get(0).getIdTinhTp()):new ArrayList<>();
        for (QuanHuyen qh:dsQuanHuyen) {
            qh.setPolygon("");
        }

        ObjectMapper mapper=new ObjectMapper();
        ObjectNode resData=mapper.createObjectNode();

        ArrayNode nodeTinhTp=mapper.valueToTree(dsTinhTp);
        resData.putArray("tinhTp").addAll(nodeTinhTp);

        ArrayNode nodeQuanHuyen=mapper.valueToTree(dsQuanHuyen);
        resData.putArray("quanHuyen").addAll(nodeQuanHuyen);

        return new Response(1,resData);
    }

    @RequestMapping("/lay-ds-quan-huyen")
    @ResponseBody
    public Response layQuanHuyen(Integer id) {
        List<QuanHuyen> dsQuanHuyen=quanHuyenSer.layDsQuanHuyen(id);
        for (QuanHuyen qh:dsQuanHuyen) {
            qh.setPolygon("");
        }

        return new Response(1,dsQuanHuyen);
    }

    @RequestMapping("/lay-danh-sach")
    @ResponseBody
    public Response layDsXaPhuong(Integer idQuanHuyen, String ten, Integer idTTp) {
        List<XaPhuong> data=xaPhuongSer.layDsXaPhuong(idQuanHuyen, ten, idTTp);
        for (XaPhuong xp:data) {
            xp.setPolygon("");
        }
        return new Response(1,data);
    }

    @RequestMapping("/luu")
    @ResponseBody
    public Response luuThongTin(XaPhuong xp) {
        try {
            xaPhuongSer.luu(xp.getIdXaPhuong()==null?-1:xp.getIdXaPhuong(),
                    xp.getQuanHuyen().getIdQuanHuyen(),
                    xp.getTenXaPhuong(),
                    xp.getPolygon());
            return new Response(1, "Lưu thông tin thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1, "Lưu thông tin xa/phường không thành công, vui lòng thử lại sau");
        }
    }

    @RequestMapping("/lay-xa-phuong")
    @ResponseBody
    public Response layTtXaPhuong(Integer id) {
        return new Response(1,xaPhuongSer.layXaPhuongTheoId(id));
    }

    @RequestMapping("/xoa-xa-phuong")
    @ResponseBody
    public Response xoaXaPhuong(Integer id) {
        try {
            xaPhuongSer.xoa(id);
            return new Response(1,"Xóa thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1,"Xóa xã/phường không thành công, vui lòng thử lại sau");
        }
    }
}
