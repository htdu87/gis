package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.PhongTro;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PhongTroRepository extends CrudRepository<PhongTro, Integer> {
    List<PhongTro> findByLoaiPhong_KhuTro_IdKhuTro(Integer id);
}
