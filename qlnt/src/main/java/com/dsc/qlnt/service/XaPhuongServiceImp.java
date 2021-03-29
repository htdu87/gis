package com.dsc.qlnt.service;

import com.dsc.qlnt.model.XaPhuong;
import com.dsc.qlnt.repository.XaPhuongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class XaPhuongServiceImp implements XaPhuongService {
    @Autowired
    private XaPhuongRepository xaPhuongRepo;

    @Override
    public List<XaPhuong> layDsXaPhuong() {
        List<XaPhuong> target = new ArrayList<>();
        xaPhuongRepo.findAll().forEach(target::add);
        return target;
    }

    @Override
    public XaPhuong layXaPhuongTheoId(Integer id) {
        return xaPhuongRepo.findById(id).orElse(null);
    }
}
