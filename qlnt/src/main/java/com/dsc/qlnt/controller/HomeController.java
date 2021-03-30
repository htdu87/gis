package com.dsc.qlnt.controller;

import com.dsc.qlnt.ModelAttr;
import com.dsc.qlnt.Utility;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController {

    @RequestMapping("")
    public String showView(Model model) {
        ModelAttr modelAttr=new ModelAttr(Utility.layNguoiDungHienTai(), "Trang chủ","sub/home");
        model.addAttribute("MODEL",modelAttr);
        return "layout";
    }
}
