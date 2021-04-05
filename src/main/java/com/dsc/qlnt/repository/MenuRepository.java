package com.dsc.qlnt.repository;

import com.dsc.qlnt.model.Menu;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MenuRepository extends CrudRepository<Menu,Integer> {
    List<Menu> findByUrlNotNull();
}
