package com.auth.service;

import com.auth.model.User;
import com.auth.model.UserAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationUserDetailsService /*implements UserDetailsService*/ {

    private static final String ENCODED_PASSWORD = new BCryptPasswordEncoder().encode("password123");

    List<String> usernameList = Arrays.asList("USER1","USER2","USER3","USER4");

    //@Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return getUserByUsername(s);
    }

    private User getUserByUsername(String username){
        List<User> users = Arrays.asList(
                new User("USER1",ENCODED_PASSWORD,Arrays.asList(new UserAuthority("USER_ROLE")),true,true,true,true),
                new User("USER2",ENCODED_PASSWORD,Arrays.asList(new UserAuthority("USER_ROLE")),true,true,true,true)
        );

        List<User> fetchedUser = users.stream().filter(u -> u.getUsername().equals(username)).collect(Collectors.toList());
        return fetchedUser.stream().findFirst().orElseThrow();
    }
}