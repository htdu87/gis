package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.NguoiDung;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

public interface NguoiDungRepository extends CrudRepository<NguoiDung, Integer> {
    @EntityGraph(attributePaths = {"vaiTro.menus.menus"})
    NguoiDung findByTenDangNhap(String tdn);
}
