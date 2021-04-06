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
    public List<XaPhuong> layDsXaPhuong(Integer idQH, String ten, Integer idTTp) {
        List<XaPhuong> target = new ArrayList<>();
        xaPhuongRepo.findAll(idQH, ten,idTTp).forEach(target::add);
        return target;
    }

    @Override
    public List<XaPhuong> layDsXaPhuong(Integer idQuanHuyen) {
        List<XaPhuong> target = new ArrayList<>();
        xaPhuongRepo.LayDsTheoQuanHuyen(idQuanHuyen).forEach(target::add);
        return target;
    }

    @Override
    public XaPhuong layXaPhuongTheoId(Integer id) {
        return xaPhuongRepo.findById(id).orElse(null);
    }

    @Override
    public boolean kiemTraViTri(double vd,double kd, int id) {
        return xaPhuongRepo.kiemTraViTri(vd, kd, id);
    }

    @Override
    public void luu(int idXaPhuong, int idQuanHuyen, String ten, String polygon) {
        xaPhuongRepo.luu(idXaPhuong, idQuanHuyen, ten, polygon);
    }

    @Override
    public void xoa(Integer id) {
        xaPhuongRepo.deleteById(id);
    }
}
