package com.dsc.qlnt.service;

import com.dsc.qlnt.model.GiaThue;

import java.util.List;

public interface GiaThueService {
    List<GiaThue> layDsGiaThueTheoIdLoaiPhong(Integer id);
    GiaThue layGiaThueTheoId(Integer id);
    GiaThue luu(GiaThue gt);
}
