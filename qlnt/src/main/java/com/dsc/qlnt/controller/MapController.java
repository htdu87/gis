package com.dsc.qlnt.controller;

import com.dsc.qlnt.Response;
import com.dsc.qlnt.model.TinhTp;
import com.dsc.qlnt.model.XaPhuong;
import com.dsc.qlnt.service.KhuTroService;
import com.dsc.qlnt.service.TinhTpService;
import com.dsc.qlnt.service.XaPhuongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/map")
public class MapController {
    @Autowired
    private TinhTpService tinhTpSer;
    @Autowired
    private XaPhuongService xaPhuongSer;
    @Autowired
    private KhuTroService khuTroSer;

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
}
