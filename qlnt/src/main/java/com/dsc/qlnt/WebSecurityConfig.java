package com.dsc.qlnt;

import com.dsc.qlnt.model.Menu;
import com.dsc.qlnt.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private MenuService menuSer;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/bower_components/**", "/dist/**", "/css/**", "/js/**", "/plugins/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        List<Menu> dsMenu = menuSer.layDsMenuCon();
        for (Menu menu : dsMenu) {
            http.authorizeRequests().antMatchers("/" + menu.getUrl() + "/**").hasAuthority(menu.getUrl());
        }
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/test/**").permitAll()
                .antMatchers("/map/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/dang-nhap").permitAll()
                .defaultSuccessUrl("/",false)
                .and()
                .logout().permitAll()
                .and()
                //.exceptionHandling().accessDeniedPage("/forbidden").and()
                .httpBasic();
    }
}
