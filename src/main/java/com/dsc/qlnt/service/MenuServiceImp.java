package com.dsc.qlnt.service;

import com.dsc.qlnt.model.Menu;
import com.dsc.qlnt.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuServiceImp implements MenuService {
    @Autowired
    private MenuRepository menuRepos;

    @Override
    public List<Menu> layDsMenuCon() {
        return menuRepos.findByUrlNotNull();
    }
}
