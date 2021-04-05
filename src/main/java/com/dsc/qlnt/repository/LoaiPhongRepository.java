package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.LoaiPhong;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LoaiPhongRepository extends CrudRepository<LoaiPhong, Integer> {
    List<LoaiPhong> findByKhuTro_IdKhuTro(Integer id);
}
