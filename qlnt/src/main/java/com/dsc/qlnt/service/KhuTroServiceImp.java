package com.dsc.qlnt.service;

import com.dsc.qlnt.model.KhuTro;
import com.dsc.qlnt.repository.KhuTroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhuTroServiceImp implements KhuTroService {
    @Autowired
    private KhuTroRepository khuTroRepo;

    @Override
    public KhuTro luu(KhuTro kt) throws Exception {
        return khuTroRepo.save(kt);
    }

    @Override
    public List<KhuTro> layDsKhuTro(String ten, String dc, Integer idXaPhuong, Integer idQuanHuyen, Integer idTTp, Integer idChuTro) {
        return khuTroRepo.search(ten, dc, idXaPhuong, idQuanHuyen, idTTp, idChuTro);
    }

    @Override
    public KhuTro layKhuTroTheoId(Integer id) {
        return khuTroRepo.findById(id).orElse(null);
    }

    @Override
    public void xoa(Integer id) {
        khuTroRepo.deleteById(id);
    }

    @Override
    public List<KhuTro> timKiem(String keyword, double lat, double lon, float distance) {
        return khuTroRepo.timKiem(keyword, lat, lon, distance);
    }

    @Override
    public List<Object[]> thongKeTheoTinh() {
        return khuTroRepo.demKhuTroTheoTinh();
    }
}
