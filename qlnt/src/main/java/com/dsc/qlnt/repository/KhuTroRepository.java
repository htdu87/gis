package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.KhuTro;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface KhuTroRepository extends CrudRepository<KhuTro,Integer> {
    @Query("select kt from KhuTro kt where kt.tenKhuTro like %?1% and kt.diaChi like %?2% and (kt.xaPhuong.idXaPhuong=?3 or ?3=-1)")
    @EntityGraph(attributePaths = {"chuKhuTro","xaPhuong.quanHuyen.tinhTp"})
    List<KhuTro> search(String ten, String dc, Integer id);
}
