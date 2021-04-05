package com.dsc.qlnt.service;

import com.dsc.qlnt.model.QuanHuyen;

import java.util.List;

public interface QuanHuyenService {
    List<QuanHuyen> layDsQuanHuyen(Integer idTTp, String ten);
    List<QuanHuyen> layDsQuanHuyen(Integer idTinhTp);
    QuanHuyen layQuanHuyenTheoId(Integer id);
    void luu(int id, int idTtp, String ten, String polygon) throws Exception;
    void xoa(Integer id) throws Exception;
}
