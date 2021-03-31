package com.dsc.qlnt.service;

import com.dsc.qlnt.model.QuanHuyen;

import java.util.List;

public interface QuanHuyenService {
    List<QuanHuyen> layDsQuanHuyen();
    List<QuanHuyen> layDsQuanHuyen(Integer idTinhTp);
    QuanHuyen layQuanHuyenTheoId(Integer id);
}
