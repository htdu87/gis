package com.dsc.qlnt.service;

import com.dsc.qlnt.model.LoaiPhong;
import com.dsc.qlnt.repository.LoaiPhongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoaiPhongServiceImp implements LoaiPhongService {
    @Autowired
    private LoaiPhongRepository loaiPhongRepo;

    @Override
    public LoaiPhong luu(LoaiPhong lp) {
        return loaiPhongRepo.save(lp);
    }

    @Override
    public List<LoaiPhong> layDsLoaiPhongTheoIdKhuTro(Integer id) {
        return loaiPhongRepo.findByKhuTro_IdKhuTro(id);
    }

    @Override
    public LoaiPhong layLoaiPhongTheoId(Integer id) {
        return loaiPhongRepo.findById(id).orElse(null);
    }

    @Override
    public void xoa(Integer id) {
        loaiPhongRepo.deleteById(id);
    }
}
