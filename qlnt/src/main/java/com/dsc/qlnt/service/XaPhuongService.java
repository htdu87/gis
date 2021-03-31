package com.dsc.qlnt.service;

import com.dsc.qlnt.model.XaPhuong;

import java.util.List;

public interface XaPhuongService {
    List<XaPhuong> layDsXaPhuong();
    List<XaPhuong> layDsXaPhuong(Integer idQuanHuyen);
    XaPhuong layXaPhuongTheoId(Integer id);
    boolean kiemTraViTri(double kd, double vd, int id);
}
