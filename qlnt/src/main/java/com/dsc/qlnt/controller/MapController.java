package com.dsc.qlnt.controller;

import com.dsc.qlnt.Response;
import com.dsc.qlnt.model.*;
import com.dsc.qlnt.service.PhongTroService;
import com.dsc.qlnt.service.KhuTroService;
import com.dsc.qlnt.service.LoaiPhongService;
import com.dsc.qlnt.service.TinhTpService;
import com.dsc.qlnt.service.XaPhuongService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/map")
public class MapController {
    @Autowired
    private TinhTpService tinhTpSer;
    @Autowired
    private XaPhuongService xaPhuongSer;
    @Autowired
    private KhuTroService khuTroSer;
    @Autowired
    private LoaiPhongService loaiPhongSer;
    @Autowired
    private PhongTroService phongTroSer;

    @RequestMapping("")
    public String showView() {
        return "map";
    }

    @RequestMapping("/lay-ttp-theo-id")
    @ResponseBody
    public TinhTp layTinhTpTheoId(Integer id) {
        return tinhTpSer.layTinhTpTheoId(id);
    }

    @RequestMapping("/lay-xa-phuong-theo-id")
    @ResponseBody
    public XaPhuong layXaPhuongTheoId(Integer id) {
        return xaPhuongSer.layXaPhuongTheoId(id);
    }

    @RequestMapping("/lay-ds-khu-tro")
    @ResponseBody
    public Response layDsKhuTro() {
        return new Response(1, khuTroSer.layDsKhuTro("","",-1,-1,-1,-1));
    }

    @RequestMapping("/lay-tt-khu-tro")
    @ResponseBody
    public Response layTtKhuTro(Integer id) {
        KhuTro khuTro=khuTroSer.layKhuTroTheoId(id);
        khuTro.setSoPhongTrong(phongTroSer.demPhongTrong(id));
        List<PhongTro> dsPhongTro=phongTroSer.layDsPhongTroTheoIdKhuTro(id);
        //Set<LoaiPhong> dsLoaiPhong=khuTro.getLoaiPhongs();//loaiPhongSer.layDsLoaiPhongTheoIdKhuTro(id);

        ObjectMapper mapper=new ObjectMapper();
        ObjectNode resData=mapper.createObjectNode();

        ArrayNode nodePhongTro=mapper.valueToTree(dsPhongTro);
        resData.putArray("phongTro").addAll(nodePhongTro);

        ArrayNode nodeLoaiPhong=mapper.valueToTree(khuTro.getLoaiPhongs());
        resData.putArray("loaiPhong").addAll(nodeLoaiPhong);

        ArrayNode nodeKhoangCach=mapper.valueToTree(khuTro.getKhoangCaches());
        resData.putArray("khoangCach").addAll(nodeKhoangCach);

        ObjectNode nodeKhuTro=mapper.valueToTree(khuTro);
        resData.set("khuTro",nodeKhuTro);

        return new Response(1,resData);
    }

    @RequestMapping("/tim-khu-tro")
    @ResponseBody
    public Response timKiem(String keyword, Float distance, Double lat, Double lon) {
        if (distance==null || distance==0) distance=-1f;
        return new Response(1, khuTroSer.timKiem(keyword,lat,lon,distance));
    }
}
