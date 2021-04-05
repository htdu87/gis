package com.dsc.qlnt;

import com.dsc.qlnt.model.NguoiDung;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

public class Utility {

    public static String encode(String str){
        String idForEncode="bcrypt";

        Map<String, PasswordEncoder> encoders=new HashMap<>();
        encoders.put(idForEncode,new BCryptPasswordEncoder());
        //encoders.put("noop", NoOpPasswordEncoder.getInstance());
        //encoders.put("pbkdf2", new Pbkdf2PasswordEncoder());
        //encoders.put("scrypt", new SCryptPasswordEncoder());
        //encoders.put("sha256", new StandardPasswordEncoder());

        PasswordEncoder passwordEncoder=new DelegatingPasswordEncoder(idForEncode,encoders);
        return passwordEncoder.encode(str);
    }

    public static boolean checkPwd(String raw, String encode) {
        String idForEncode="bcrypt";

        Map<String, PasswordEncoder> encoders=new HashMap<>();
        encoders.put(idForEncode,new BCryptPasswordEncoder());
        PasswordEncoder passwordEncoder=new DelegatingPasswordEncoder(idForEncode,encoders);
        return passwordEncoder.matches(raw,encode);
    }

    public static NguoiDung layNguoiDungHienTai(){
        Object principal= SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ((UserDetailsImpl)principal).getNguoiDung();
    }

}
