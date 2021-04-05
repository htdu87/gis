package com.dsc.qlnt.service;

import com.dsc.qlnt.model.TinhTrang;
import com.dsc.qlnt.repository.TinhTrangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TinhTrangServiceImp implements TinhTrangService {
    @Autowired
    private TinhTrangRepository tinhTrangRepo;

    @Override
    public List<TinhTrang> layDsTinhTrang() {
        List<TinhTrang> target=new ArrayList<>();
        tinhTrangRepo.findAll().forEach(target::add);
        return target;
    }
}
