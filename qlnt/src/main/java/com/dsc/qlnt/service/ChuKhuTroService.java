package com.dsc.qlnt.service;

import com.dsc.qlnt.model.ChuKhuTro;

import java.util.List;

public interface ChuKhuTroService {
    List<ChuKhuTro> layDsChuKhuTro(String hoTen, String sdt);
    ChuKhuTro layChuKhuTroTheoId(Integer id);
    ChuKhuTro luu(ChuKhuTro c) throws Exception;
    void xoa(Integer id) throws Exception;
}
