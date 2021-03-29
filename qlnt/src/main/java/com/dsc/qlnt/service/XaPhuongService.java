package com.dsc.qlnt.service;

import com.dsc.qlnt.model.XaPhuong;

import java.util.List;

public interface XaPhuongService {
    List<XaPhuong> layDsXaPhuong();
    XaPhuong layXaPhuongTheoId(Integer id);
}
