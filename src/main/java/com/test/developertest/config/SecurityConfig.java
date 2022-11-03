package com.test.developertest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

import javax.sql.DataSource;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    protected void configure(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/**", "/index**").hasAnyRole("CLIENT", "ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin().permitAll()
                .and()
                .logout().logoutUrl("/logout").permitAll();
    }

//    @Bean
//    public JdbcUserDetailsManager users(DataSource dataSource) {
//        UserDetails admin = User.builder()
//                .username("Andrew")
//                .password("user")
//                .roles("ADMIN", "USER")
//                .build();
//        JdbcUserDetailsManager user = new JdbcUserDetailsManager(dataSource);
//        if (user.userExists(user.getUsersByUsernameQuery())) {
//            user.deleteUser(user.getUsersByUsernameQuery());
//        }
//        user.createUser(admin);
//        return user;
//    }

    @Bean
    public UserDetailsService user() {
        UserDetails admin = User.builder()
                .username("Andrew")
                .password("{bcrypt}$2a$12$uFpY4nViyiqaKzZCsVHChu30pFgk3HNYsZtUZUba5cgPkvkScKuwO")
                .roles("ADMIN", "CLIENT")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }
}
