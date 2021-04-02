package com.dsc.qlnt.service;

import com.dsc.qlnt.model.KhuTro;

import java.util.List;

public interface KhuTroService {
    KhuTro luu(KhuTro kt) throws Exception;
    List<KhuTro> layDsKhuTro(String ten, String dc, Integer id);
    KhuTro layKhuTroTheoId(Integer id);
    void xoa(Integer id) throws Exception;
}
