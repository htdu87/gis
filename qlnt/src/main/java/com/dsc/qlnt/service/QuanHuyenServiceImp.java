package com.dsc.qlnt.service;

import com.dsc.qlnt.model.QuanHuyen;
import com.dsc.qlnt.repository.QuanHuyenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuanHuyenServiceImp implements QuanHuyenService {
    @Autowired
    private QuanHuyenRepository quanHuyenRepo;

    @Override
    public List<QuanHuyen> layDsQuanHuyen() {
        List<QuanHuyen> target = new ArrayList<>();
        quanHuyenRepo.findAll().forEach(target::add);
        return target;
    }

    @Override
    public List<QuanHuyen> layDsQuanHuyen(Integer idTinhTp) {
        List<QuanHuyen> target = new ArrayList<>();
        quanHuyenRepo.layTheoTinhTp(idTinhTp).forEach(target::add);
        return target;
    }

    @Override
    public QuanHuyen layQuanHuyenTheoId(Integer id) {
        return quanHuyenRepo.findById(id).orElse(null);
    }
}
