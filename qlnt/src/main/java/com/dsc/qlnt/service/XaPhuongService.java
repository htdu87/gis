package com.dsc.qlnt.service;

import com.dsc.qlnt.model.XaPhuong;

import javax.persistence.OrderBy;
import java.util.List;

public interface XaPhuongService {
    List<XaPhuong> layDsXaPhuong(Integer idQH, String ten, Integer idTTp);
    List<XaPhuong> layDsXaPhuong(Integer idQuanHuyen);
    XaPhuong layXaPhuongTheoId(Integer id);
    boolean kiemTraViTri(double vd,double kd, int id);
    void luu(int idXaPhuong, int idQuanHuyen, String ten, String polygon)throws Exception;
    void xoa(Integer id) throws Exception;
}
