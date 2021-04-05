package com.dsc.qlnt.service;

import com.dsc.qlnt.model.NguoiDung;
import com.dsc.qlnt.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NguoiDungServiceImp implements NguoiDungService {
    @Autowired
    private NguoiDungRepository nguoiDungRepo;

    @Override
    public NguoiDung layTheoTenDangNhap(String tdn) {
        return nguoiDungRepo.findByTenDangNhap(tdn);
    }
}
