package com.dsc.qlnt.service;

import com.dsc.qlnt.model.PhongTro;
import com.dsc.qlnt.repository.PhongTroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhongTroServiceImp implements PhongTroService {
    @Autowired
    private PhongTroRepository phongTroRepo;

    @Override
    public List<PhongTro> layDsPhongTroTheoIdKhuTro(Integer id) {
        return phongTroRepo.findByLoaiPhong_KhuTro_IdKhuTroOrderByTinhTrang_IdTinhTrangAsc(id);
    }

    @Override
    public PhongTro luu(PhongTro pt) {
        return phongTroRepo.save(pt);
    }

    @Override
    public PhongTro layPhongTroTheoId(Integer id) {
        return phongTroRepo.findById(id).orElse(null);
    }

    @Override
    public void xoa(Integer id) {
        phongTroRepo.deleteById(id);
    }

    @Override
    public Integer demPhongTrong(Integer idKhuTro) {
        return phongTroRepo.demPhongTroConTrong(idKhuTro);
    }

    @Override
    public List<Object[]> thongKeTheoTinhTrang() {
        return phongTroRepo.demPhongTroTheoTinhTrang();
    }
}
