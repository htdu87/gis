package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.PhongTro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PhongTroRepository extends CrudRepository<PhongTro, Integer> {
    List<PhongTro> findByLoaiPhong_KhuTro_IdKhuTroOrderByTinhTrang_IdTinhTrangAsc(Integer id);

    @Query("select count(pt.idPhongTro) from PhongTro pt where pt.tinhTrang.idTinhTrang=1 and pt.loaiPhong.idLoaiPhong in (select lp.idLoaiPhong from LoaiPhong lp where lp.khuTro.idKhuTro=?1)")
    Integer demPhongTroConTrong(Integer inKhuTro);
    @Query("select pt.tinhTrang, count(pt.idPhongTro) from PhongTro pt group by pt.tinhTrang")
    List<Object[]> demPhongTroTheoTinhTrang();
}
