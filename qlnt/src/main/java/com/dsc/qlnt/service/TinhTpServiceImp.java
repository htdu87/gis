package com.dsc.qlnt.service;

import com.dsc.qlnt.model.TinhTp;
import com.dsc.qlnt.repository.TinhTpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TinhTpServiceImp implements TinhTpService {
    @Autowired
    private TinhTpRepository tinhTpRepo;

    @Override
    public List<TinhTp> layDsTinhTp() {
        List<TinhTp> target = new ArrayList<>();
        tinhTpRepo.findAll().forEach(target::add);
        return target;
    }

    @Override
    public TinhTp layTinhTpTheoId(Integer id) {
        return tinhTpRepo.findById(id).orElse(null);
    }
}
