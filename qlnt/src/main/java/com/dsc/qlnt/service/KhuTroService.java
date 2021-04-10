package com.dsc.qlnt.service;

import com.dsc.qlnt.model.KhuTro;

import java.util.List;

public interface KhuTroService {
    KhuTro luu(KhuTro kt) throws Exception;
    List<KhuTro> layDsKhuTro(String ten, String dc, Integer idXaPhuong, Integer idQuanHuyen, Integer idTTp, Integer idChuTro);
    KhuTro layKhuTroTheoId(Integer id);
    void xoa(Integer id) throws Exception;
    List<KhuTro> timKiem(String keyword, double lat, double lon, float distance);
    List<Object[]> thongKeTheoTinh();
}
