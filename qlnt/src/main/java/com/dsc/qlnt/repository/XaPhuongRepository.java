package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.XaPhuong;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface XaPhuongRepository extends CrudRepository<XaPhuong, Integer> {
    @Query(value = "call LAY_XA_PHUONG(?1,-1,\"\",-1)", nativeQuery = true)
    Optional<XaPhuong> findById(Integer id);

    @Query(value = "call LAY_XA_PHUONG(-1,?1,?2,?3)", nativeQuery = true)
    Iterable<XaPhuong> findAll(Integer idQH, String ten, Integer idTTp);

    @Query(value = "call LAY_XA_PHUONG(-1,?1,\"\",-1)", nativeQuery = true)
    Iterable<XaPhuong> LayDsTheoQuanHuyen(Integer idQuanHuyen);

    @Query(value = "select KIEM_TRA_VI_TRI_TRONG_XA(?1,?2,?3)", nativeQuery = true)
    boolean kiemTraViTri(double vd, double kd, int id);

    @Query(value = "call LUU_XA_PHUONG(?1,?2,?3,?4)", nativeQuery = true)
    void luu(int idXaPhuong, int idQuanHuyen, String ten, String polygon);
}
