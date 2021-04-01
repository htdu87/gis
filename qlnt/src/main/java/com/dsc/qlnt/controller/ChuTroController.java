package com.dsc.qlnt.controller;

import com.dsc.qlnt.ModelAttr;
import com.dsc.qlnt.Response;
import com.dsc.qlnt.Utility;
import com.dsc.qlnt.model.ChuKhuTro;
import com.dsc.qlnt.service.ChuKhuTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/ql-chu-tro")
public class ChuTroController {
    @Autowired
    private ChuKhuTroService chuKhuTroSer;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        sdf.setLenient(true);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(sdf, true));
    }

    @RequestMapping("")
    String showView(Model model) {
        ModelAttr modelAttr=new ModelAttr(Utility.layNguoiDungHienTai(),
                "Quản lý chủ trọ",
                "sub/chu-tro",
                new String[]{"/bower_components/jdgrid/js/jdgrid-v4.js","js/chu-tro.js"},
                new String[]{"/bower_components/jdgrid/css/jdgrid.css"}
        );
        model.addAttribute("MODEL",modelAttr);
        return "layout";
    }

    @RequestMapping("/luu")
    @ResponseBody
    public Response luuThongTin(ChuKhuTro c) {
        try {
            chuKhuTroSer.luu(c);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1,"Lưu thông tin không thành công, vui lòng thử lại sau.");
        }
        return new Response(1,"Lưu thông tin thành công!");
    }

    @RequestMapping("/lay-danh-sach")
    @ResponseBody
    public Response layDanhSach(String hoTen, String sdt) {
        return new Response(1,chuKhuTroSer.layDsChuKhuTro(hoTen, sdt));
    }

    @RequestMapping("/lay-chu-tro")
    @ResponseBody
    public Response layChuTro(Integer id) {
        return new Response(1,chuKhuTroSer.layChuKhuTroTheoId(id));
    }

    @RequestMapping("/xoa-chu-tro")
    @ResponseBody
    public Response xoaChuTro(Integer id) {
        try {
            chuKhuTroSer.xoa(id);
            return new Response(1,"Xóa thành thông!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1,"Xóa chủ trọ không thành thông, vui lòng thử lại sau");
        }
    }
}
