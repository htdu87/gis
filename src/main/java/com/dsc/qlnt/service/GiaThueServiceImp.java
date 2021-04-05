package com.dsc.qlnt.service;

import com.dsc.qlnt.model.GiaThue;
import com.dsc.qlnt.repository.GiaThueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GiaThueServiceImp implements GiaThueService {
    @Autowired
    private GiaThueRepository giaThueRepo;

    @Override
    public List<GiaThue> layDsGiaThueTheoIdLoaiPhong(Integer id) {
        return giaThueRepo.findByLoaiPhong_IdLoaiPhongOrderByNgayApDungDesc(id);
    }

    @Override
    public GiaThue layGiaThueTheoId(Integer id) {
        return giaThueRepo.findById(id).orElse(null);
    }

    @Override
    public GiaThue luu(GiaThue gt) {
        return giaThueRepo.save(gt);
    }
}
