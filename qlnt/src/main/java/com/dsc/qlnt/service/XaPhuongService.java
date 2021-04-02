package com.dsc.qlnt.service;

import com.dsc.qlnt.model.XaPhuong;

import java.util.List;

public interface XaPhuongService {
    List<XaPhuong> layDsXaPhuong(Integer idQH, String ten);
    List<XaPhuong> layDsXaPhuong(Integer idQuanHuyen);
    XaPhuong layXaPhuongTheoId(Integer id);
    boolean kiemTraViTri(double kd, double vd, int id);
    void luu(int idXaPhuong, int idQuanHuyen, String ten, String polygon)throws Exception;
}
