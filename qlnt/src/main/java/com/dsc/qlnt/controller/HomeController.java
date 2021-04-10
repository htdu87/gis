package com.dsc.qlnt.controller;

import com.dsc.qlnt.ModelAttr;
import com.dsc.qlnt.Response;
import com.dsc.qlnt.Utility;
import com.dsc.qlnt.model.QuanHuyen;
import com.dsc.qlnt.model.TinhTp;
import com.dsc.qlnt.model.XaPhuong;
import com.dsc.qlnt.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Controller
@RequestMapping("/")
public class HomeController {
    @Autowired
    private KhuTroService khuTroSer;
    @Autowired
    private PhongTroService phongTroSer;
    @Autowired
    private XaPhuongService xaPhuongSer;
    @Autowired
    private TinhTpService tinhTpSer;
    @Autowired
    private QuanHuyenService quanHuyenSer;

    @RequestMapping("")
    public String showView(Model model) {
        ModelAttr modelAttr=new ModelAttr(Utility.layNguoiDungHienTai(),
                "Thống kê",
                "sub/home",
                new String[]{"bower_components/leaflet/leaflet.js","bower_components/morris/raphael-min.js","bower_components/morris/morris.min.js","js/home.js"},
                new String[]{"bower_components/leaflet/leaflet.css","bower_components/morris/morris.css"});
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

    @RequestMapping("/draw-chart")
    @ResponseBody
    public Response drawChart() {
        List<Object[]> barChart=khuTroSer.thongKeTheoTinh();
        for (Object[] obj : barChart) {
            ((TinhTp)obj[0]).setPolygon("");
        }

        List<Object[]> donutChart = phongTroSer.thongKeTheoTinhTrang();

        ObjectMapper mapper=new ObjectMapper();
        ObjectNode resData=mapper.createObjectNode();

        ArrayNode nodeBarChart=mapper.valueToTree(barChart);
        resData.putArray("barChart").addAll(nodeBarChart);

        ArrayNode nodeDonutChart=mapper.valueToTree(donutChart);
        resData.putArray("donutChart").addAll(nodeDonutChart);

        return new Response(1, resData);
    }

    @RequestMapping("/draw-map")
    @ResponseBody
    public Response drawMap(Integer idHuyen) {
        List<XaPhuong> dsXaPhuong = xaPhuongSer.layDsXaPhuong(idHuyen);
        dsXaPhuong.sort((xaPhuong, t1) -> xaPhuong.getSoLuongNhaTro()-t1.getSoLuongNhaTro());
        return new Response(1,dsXaPhuong);
    }
}
