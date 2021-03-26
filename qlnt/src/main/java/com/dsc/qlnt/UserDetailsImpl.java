package com.dsc.qlnt;

import com.dsc.qlnt.model.Menu;
import com.dsc.qlnt.model.NguoiDung;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class UserDetailsImpl implements UserDetails {
    private NguoiDung nd;

    UserDetailsImpl(NguoiDung nd) {
        this.nd = nd;
    }

    public NguoiDung getNguoiDung() {
        return nd;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        for (Menu menu : nd.getVaiTro().getMenus()) {
            if (menu.getUrl()!=null)
                authorities.add(new SimpleGrantedAuthority(menu.getUrl()));
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return nd.getMatKhau();
    }

    @Override
    public String getUsername() {
        return nd.getTenDangNhap();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !nd.isKhoa();
    }
}
