package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.XaPhuong;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface XaPhuongRepository extends CrudRepository<XaPhuong, Integer> {
    @Query(value = "call LAY_XA_PHUONG(?1,-1)", nativeQuery = true)
    Optional<XaPhuong> findById(Integer id);

    @Query(value = "call LAY_XA_PHUONG(-1,-1)", nativeQuery = true)
    Iterable<XaPhuong> findAll();

    @Query(value = "call LAY_XA_PHUONG(-1,?1)", nativeQuery = true)
    Iterable<XaPhuong> LayDsTheoQuanHuyen(Integer idQuanHuyen);

    @Query(value = "select KIEM_TRA_VI_TRI_TRONG_XA(?1,?2,?3)", nativeQuery = true)
    boolean kiemTraViTri(double kd, double vd, int id);
}
