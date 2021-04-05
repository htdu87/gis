package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.ChuKhuTro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChuKhuTroRepository extends CrudRepository<ChuKhuTro, Integer> {
    @Query("select ckt from ChuKhuTro ckt where ckt.hoTen like %?1% and ckt.sdt like %?2%")
    List<ChuKhuTro> search(String hoTen, String sdt);
}
