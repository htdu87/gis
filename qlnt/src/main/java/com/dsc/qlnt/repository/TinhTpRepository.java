package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.TinhTp;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TinhTpRepository extends CrudRepository<TinhTp, Integer> {
    @Query(value = "call LAY_TINH_TP(?1,\"\")", nativeQuery = true)
    Optional<TinhTp> findById(Integer id);

    @Query(value = "call LAY_TINH_TP(-1,?1)", nativeQuery = true)
    Iterable<TinhTp> findAll(String ten);

    @Query(value = "call LUU_TINH_TP(?1,?2,?3)", nativeQuery = true)
    void luu(int id, String ten, String polygon);
}
