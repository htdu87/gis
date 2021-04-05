package com.dsc.qlnt.service;

import com.dsc.qlnt.model.TinhTp;

import java.util.List;

public interface TinhTpService {
    List<TinhTp> layDsTinhTp(String ten);
    TinhTp layTinhTpTheoId(Integer id);
    void luu(int id, String ten, String polygon) throws Exception;
    void xoa(Integer id) throws Exception;
}
