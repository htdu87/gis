package com.dsc.qlnt.service;

import com.dsc.qlnt.model.LoaiPhong;

import java.util.List;

public interface LoaiPhongService {
    LoaiPhong luu(LoaiPhong lp) throws Exception;
    List<LoaiPhong> layDsLoaiPhongTheoIdKhuTro(Integer id);
    LoaiPhong layLoaiPhongTheoId(Integer id);
    void xoa(Integer id) throws Exception;
}
