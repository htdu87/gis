package com.dsc.qlnt.service;

import com.dsc.qlnt.model.ChuKhuTro;
import com.dsc.qlnt.repository.ChuKhuTroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChuKhuTroServiceImp implements ChuKhuTroService {
    @Autowired
    private ChuKhuTroRepository chuKhuTroRepo;

    @Override
    public List<ChuKhuTro> layDsChuKhuTro(String hoTen, String sdt) {
        return chuKhuTroRepo.search(hoTen, sdt);
    }

    @Override
    public ChuKhuTro layChuKhuTroTheoId(Integer id) {
        return chuKhuTroRepo.findById(id).orElse(null);
    }

    @Override
    public ChuKhuTro luu(ChuKhuTro c) {
        return chuKhuTroRepo.save(c);
    }

    @Override
    public void xoa(Integer id) {
        chuKhuTroRepo.deleteById(id);
    }
}
