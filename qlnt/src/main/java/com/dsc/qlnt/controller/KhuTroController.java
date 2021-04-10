package com.dsc.qlnt.controller;

import com.dsc.qlnt.ModelAttr;
import com.dsc.qlnt.Response;
import com.dsc.qlnt.Utility;
import com.dsc.qlnt.model.*;
import com.dsc.qlnt.service.PhongTroService;
import com.dsc.qlnt.service.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/ql-khu-tro")
public class KhuTroController {
    @Autowired
    private TinhTpService tinhTpSer;
    @Autowired
    private QuanHuyenService quanHuyenSer;
    @Autowired
    private XaPhuongService xaPhuongSer;
    @Autowired
    private ChuKhuTroService chuKhuTroSer;
    @Autowired
    private KhuTroService khuTroSer;
    @Autowired
    private LoaiPhongService loaiPhongSer;
    @Autowired
    private GiaThueService giaThueSer;
    @Autowired
    private TinhTrangService tinhTrangSer;
    @Autowired
    private PhongTroService phongTroSer;
    @Autowired
    private TruongService truongSer;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        sdf.setLenient(true);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(sdf, true));
    }

    @RequestMapping("")
    String showView(Model model) {
        ModelAttr modelAttr=new ModelAttr(Utility.layNguoiDungHienTai(),
                "Quản lý khu trọ",
                "sub/khu-tro",
                new String[]{"/bower_components/leaflet/leaflet.js","/bower_components/leaflet/leaflet-routing-machine.js","/bower_components/leaflet/Control.Geocoder.js","/bower_components/jdgrid/js/jdgrid-v4.js","js/khu-tro.js"},
                new String[]{"/bower_components/leaflet/leaflet.css","/bower_components/leaflet/leaflet.css","/bower_components/leaflet/Control.Geocoder.css","/bower_components/jdgrid/css/jdgrid.css"}
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
        List<ChuKhuTro> dsChuKhuTro=chuKhuTroSer.layDsChuKhuTro("","");
        List<Truong> dsTruong=truongSer.layDanhSachTruong();

        for (TinhTp ttp:dsTinhTp) {
            ttp.setPolygon("");
        }
        for (QuanHuyen qh:dsQuanHuyen) {
            qh.setPolygon("");
        }
        for (XaPhuong xp:dsXaPhuong) {
            xp.setPolygon("");
        }

        ObjectMapper mapper=new ObjectMapper();
        ObjectNode resData=mapper.createObjectNode();

        ArrayNode nodeTinhTp=mapper.valueToTree(dsTinhTp);
        resData.putArray("tinhTp").addAll(nodeTinhTp);

        ArrayNode nodeQuanHuyen=mapper.valueToTree(dsQuanHuyen);
        resData.putArray("quanHuyen").addAll(nodeQuanHuyen);

        ArrayNode nodeXaPhuong=mapper.valueToTree(dsXaPhuong);
        resData.putArray("xaPhuong").addAll(nodeXaPhuong);

        ArrayNode nodeChuKhuTro=mapper.valueToTree(dsChuKhuTro);
        resData.putArray("chuKhuTro").addAll(nodeChuKhuTro);

        ArrayNode nodeTruong=mapper.valueToTree(dsTruong);
        resData.putArray("truong").addAll(nodeTruong);

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
    public Response luuThongTin(KhuTro kt, String strKC) {
        if (xaPhuongSer.kiemTraViTri(kt.getViDo(),kt.getKinhDo(),kt.getXaPhuong().getIdXaPhuong())) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                KhuTro nkt=khuTroSer.luu(kt);
                Set<KhoangCach> dsKhoangCach=mapper.readValue(strKC, new TypeReference<Set<KhoangCach>>(){});
                for (KhoangCach kc : dsKhoangCach) {
                    if(kc!=null)
                        kc.getId().setIdKhuTro(nkt.getIdKhuTro());
                }
                nkt=khuTroSer.layKhuTroTheoId(nkt.getIdKhuTro());
                nkt.getKhoangCaches().clear();
                nkt.getKhoangCaches().addAll(dsKhoangCach);
                khuTroSer.luu(nkt);
                return new Response(1,"Lưu thông tin thành công!");
            } catch (Exception e) {
                e.printStackTrace();
                return new Response(-1,"Lưu thông tin không thành công, vui lòng thử lại sau.");
            }
        } else {
            return new Response(-2,"Vị trí khu trọ không thuộc "+xaPhuongSer.layXaPhuongTheoId(kt.getXaPhuong().getIdXaPhuong()).getTenXaPhuong());
        }
    }

    @RequestMapping("/lay-danh-sach")
    @ResponseBody
    public Response layDsKhuTro(String ten, String dc, Integer idXaPhuong, Integer idQuanHuyen, Integer idTTp, Integer idChuTro) {
        return new Response(1, khuTroSer.layDsKhuTro(ten, dc, idXaPhuong, idQuanHuyen, idTTp, idChuTro));
    }

    @RequestMapping("/lay-khu-tro")
    @ResponseBody
    public Response layTtKhuTro(Integer id) {
        KhuTro kt=khuTroSer.layKhuTroTheoId(id);

        ObjectMapper mapper=new ObjectMapper();
        ObjectNode resData=mapper.createObjectNode();

        ArrayNode nodeKhoangCach=mapper.valueToTree(kt.getKhoangCaches());
        resData.putArray("khoangCach").addAll(nodeKhoangCach);

        ObjectNode nodeKhuTro=mapper.valueToTree(kt);
        resData.set("khuTro",nodeKhuTro);

        return new Response(1, resData);
    }

    @RequestMapping("/xoa-khu-tro")
    @ResponseBody
    public Response xoaKhuTro(Integer id) {
        try {
            khuTroSer.xoa(id);
            return new Response(1, "Xóa thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1, "Xóa khu trọ không thành công, vui lòng thử lại sau");
        }

    }

    @RequestMapping("/luu-loai-phong")
    @ResponseBody
    public Response luuLoaiPhong(LoaiPhong lp, GiaThue giaThue) {
        try {
            if (lp.getIdLoaiPhong()==null) {
                LoaiPhong nlp = loaiPhongSer.luu(lp);
                giaThue.setLoaiPhong(nlp);
                nlp.getGiaThues().add(giaThue);
                loaiPhongSer.luu(nlp);
            } else {
                if (giaThue.getIdGiaThue()!=null) {
                    GiaThue gt=giaThueSer.layGiaThueTheoId(giaThue.getIdGiaThue());
                    gt.setGiaThue(giaThue.getGiaThue());
                    gt.setNgayApDung(giaThue.getNgayApDung());
                    giaThueSer.luu(gt);
                    List<GiaThue> giaThues=giaThueSer.layDsGiaThueTheoIdLoaiPhong(lp.getIdLoaiPhong());
                    lp.getGiaThues().clear();
                    lp.getGiaThues().addAll(giaThues);
                    loaiPhongSer.luu(lp);
                } else {
                    List<GiaThue> giaThues=giaThueSer.layDsGiaThueTheoIdLoaiPhong(lp.getIdLoaiPhong());
                    giaThue.setLoaiPhong(lp);
                    giaThues.add(giaThue);
                    lp.getGiaThues().clear();
                    lp.getGiaThues().addAll(giaThues);
                    loaiPhongSer.luu(lp);
                }
            }
            return new Response(1, "Lưu loại phòng thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-11, "Lưu loại phòng không thành công, vui lòng thử lại sau");
        }
    }

    @RequestMapping("/lay-ds-loai-phong")
    @ResponseBody
    public Response layDsLoaiPhong(Integer id) {
        return new Response(1, loaiPhongSer.layDsLoaiPhongTheoIdKhuTro(id));
    }

    @RequestMapping("/lay-loai-phong")
    @ResponseBody
    public Response layLoaiPhong(Integer id) {
        return new Response(1, loaiPhongSer.layLoaiPhongTheoId(id));
    }

    @RequestMapping("/xoa-loai-phong")
    @ResponseBody
    public Response xoaLoaiPhong(Integer id) {
        try {
            loaiPhongSer.xoa(id);
            return new Response(1, "Xóa thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1, "Xóa loại phòng không thành công, vui lòng thử lại sau");
        }
    }

    @RequestMapping("/init-phong-tro")
    @ResponseBody
    public Response initPhongTro(Integer idKhuTro) {
        List<LoaiPhong> dsLoaiPhong=loaiPhongSer.layDsLoaiPhongTheoIdKhuTro(idKhuTro);
        List<TinhTrang> dsTinhTrang=tinhTrangSer.layDsTinhTrang();

        ObjectMapper mapper=new ObjectMapper();
        ObjectNode resData=mapper.createObjectNode();

        ArrayNode nodeLoaiPhong=mapper.valueToTree(dsLoaiPhong);
        resData.putArray("loaiPhong").addAll(nodeLoaiPhong);

        ArrayNode nodeTinhTrang=mapper.valueToTree(dsTinhTrang);
        resData.putArray("tinhTrang").addAll(nodeTinhTrang);

        return new Response(1, resData);
    }

    @RequestMapping("/luu-phong-tro")
    @ResponseBody
    public Response luuTtPhongTro(PhongTro pt) {
        try {
            phongTroSer.luu(pt);
            return new Response(1, "Lưu thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1, "Lưu phòng trọ không thành công, vui lòng thử lại sau");
        }
    }

    @RequestMapping("/lay-ds-phong-tro")
    @ResponseBody
    public Response layDsPhongTro(Integer idKhuTro) {
        return new Response(1, phongTroSer.layDsPhongTroTheoIdKhuTro(idKhuTro));
    }

    @RequestMapping("/lay-phong-tro")
    @ResponseBody
    public Response layTtPhongTro(Integer id) {
        return new Response(1, phongTroSer.layPhongTroTheoId(id));
    }

    @RequestMapping("/xoa-phong-tro")
    @ResponseBody
    public Response xoaPhongTro(Integer id) {
        try {
            phongTroSer.xoa(id);
            return new Response(1, "Xóa thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(-1, "Xóa phòng trọ không thành công, vui lòng thử lại sau");
        }
    }
}
