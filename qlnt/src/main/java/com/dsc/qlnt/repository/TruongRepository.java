package com.dsc.qlnt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.dsc.qlnt.model.Truong;


public interface TruongRepository extends CrudRepository<Truong, Integer>{
	@Query("select tr from Truong tr where tr.tenTruong like %?1% and tr.diaChi like %?2% and (tr.xaPhuong.idXaPhuong=?3 or ?3=-1)")
    @EntityGraph(attributePaths = {"xaPhuong.quanHuyen.tinhTp"})
    List<Truong> search(String tenTruong, String diaChi, Integer id);
}
