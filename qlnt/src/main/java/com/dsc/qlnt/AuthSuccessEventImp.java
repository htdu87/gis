package com.dsc.qlnt;

import com.dsc.qlnt.model.NguoiDung;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class AuthSuccessEventImp implements ApplicationListener<AuthenticationSuccessEvent> {
    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        Object principal = event.getAuthentication().getPrincipal();
        if (principal instanceof UserDetailsImpl) {
            NguoiDung nd=((UserDetailsImpl)principal).getNguoiDung();
            System.out.println(new Date()+": Hello "+nd.getTenDangNhap()+"!!!");
        }
    }
}
