package com.dsc.qlnt.controller;

import com.dsc.qlnt.ModelAttr;
import com.dsc.qlnt.Response;
import com.dsc.qlnt.Utility;
import com.dsc.qlnt.model.TinhTp;
import com.dsc.qlnt.service.TinhTpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/dm-tinh-tp")
public class TinhTpController {
    @Autowired
    private TinhTpService tinhTpSer;

    @RequestMapping("")
    String showView(Model model) {
        ModelAttr modelAttr=new ModelAttr(Utility.layNguoiDungHienTai(),
                "Danh mục tỉnh/thành phố",
                "sub/tinh-tp",
                new String[]{"/bower_components/jdgrid/js/jdgrid-v4.js","js/tinh-tp.js"},
                new String[]{"/bower_components/jdgrid/css/jdgrid.css"}
        );
        model.addAttribute("MODEL",modelAttr);
        return "layout";
    }

    @RequestMapping("/luu")
    @ResponseBody
    public Response luuThongTin(TinhTp ttp) {
        try {
            tinhTpSer.luu(ttp.getIdTinhTp()==null?-1:ttp.getIdTinhTp(),ttp.getTenTinhTp(),ttp.getPolygon());
            return new Response(1, "Lưu thông tin thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1, "Lưu thông tin tỉnh/thành phố không thành công, vui lòng thử lại sau");
        }
    }

    @RequestMapping("/lay-danh-sach")
    @ResponseBody
    public Response layDanhSach(String ten) {
        List<TinhTp> data=tinhTpSer.layDsTinhTp(ten);
        for (TinhTp t:data) {
            t.setPolygon("");
        }
        return new Response(1,data);
    }

    @RequestMapping("/lay-tinh-tp")
    @ResponseBody
    public Response layTinhTp(Integer id) {
        return new Response(1,tinhTpSer.layTinhTpTheoId(id));
    }

    @RequestMapping("/xoa-tinh-tp")
    @ResponseBody
    public Response xoaTinhTp(Integer id) {
        try {
            tinhTpSer.xoa(id);
            return new Response(1,"Xóa thành thông!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1,"Xóa tỉnh/thành phố không thành thông, vui lòng thử lại sau");
        }
    }
}
