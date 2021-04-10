package com.dsc.qlnt.service;

import com.dsc.qlnt.model.PhongTro;

import java.util.List;

public interface PhongTroService {
    List<PhongTro> layDsPhongTroTheoIdKhuTro(Integer id);
    PhongTro luu(PhongTro pt) throws Exception;
    PhongTro layPhongTroTheoId(Integer id);
    void xoa(Integer id) throws Exception;
    Integer demPhongTrong(Integer idKhuTro);
    List<Object[]> thongKeTheoTinhTrang();
}
