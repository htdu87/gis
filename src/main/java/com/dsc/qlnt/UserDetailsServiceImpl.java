package com.dsc.qlnt;

import com.dsc.qlnt.model.NguoiDung;
import com.dsc.qlnt.service.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private NguoiDungService nguoiDungSer;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        NguoiDung nd=nguoiDungSer.layTheoTenDangNhap(s);

        if (nd==null)
            throw new UsernameNotFoundException("Không tìm thấy người dùng có tên đăng nhập "+s);
        else {
            return new UserDetailsImpl(nd);
        }
    }
}
