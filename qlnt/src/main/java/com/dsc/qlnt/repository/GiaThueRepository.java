package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.GiaThue;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GiaThueRepository extends CrudRepository<GiaThue, Integer> {
    List<GiaThue> findByLoaiPhong_IdLoaiPhongOrderByNgayApDungDesc(Integer id);
}
