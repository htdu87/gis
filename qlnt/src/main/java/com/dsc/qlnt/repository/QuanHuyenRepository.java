package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.QuanHuyen;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface QuanHuyenRepository extends CrudRepository<QuanHuyen, Integer> {
    @Query(value = "call LAY_QUAN_HUYEN(?1,-1)", nativeQuery = true)
    Optional<QuanHuyen> findById(Integer id);

    @Query(value = "call LAY_QUAN_HUYEN(-1,-1)", nativeQuery = true)
    Iterable<QuanHuyen> findAll();

    @Query(value = "call LAY_QUAN_HUYEN(-1,?1)", nativeQuery = true)
    Iterable<QuanHuyen> layTheoTinhTp(Integer idTTp);
}
