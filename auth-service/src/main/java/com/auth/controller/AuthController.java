package com.auth.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.auth.model.ErrorResponse;
import com.auth.model.RefreshTokenRequestModel;
import com.auth.service.JwtService;
import com.auth.model.JwtResponse;
import com.auth.model.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private PasswordEncoder encoder;

  @Autowired
  private JwtService jwtService;

  @PostMapping("/login")
  public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
    JwtResponse jwtResponse = null;
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    org.springframework.security.core.userdetails.User userDetails = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());
    SecurityContextHolder.getContext().setAuthentication(authentication);
    jwtResponse = new JwtResponse(jwtService.generateJwtToken(authentication),
            jwtService.generateRefreshToken(authentication),
            userDetails.getUsername(),
            roles);
    return ResponseEntity.ok(jwtResponse);
  }

  @PostMapping("/token/refresh")
  public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequestModel requestModel) {

    JwtResponse jwtResponse = null;

    if (!jwtService.validateJwtToken(requestModel.getRefreshToken())) {
      return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(new ErrorResponse(401, "Invalid or Expired Refresh Token"));
    }
    String username = jwtService.getUserNameFromJwtToken(requestModel.getRefreshToken());
    List<Map<String, String>> authorities = jwtService.getAuthoritiesFromJwtToken(requestModel.getRefreshToken());
    List<GrantedAuthority> grantedAuthorities = authorities.stream().map(map -> new SimpleGrantedAuthority(map.get("authority")))
            .collect(Collectors.toList());
    Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, grantedAuthorities);
    SecurityContextHolder.getContext().setAuthentication(authentication);
    org.springframework.security.core.userdetails.User userDetails = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
    List<String> roles = grantedAuthorities.stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

    jwtResponse = new JwtResponse(jwtService.generateJwtToken(authentication),
            jwtService.generateRefreshToken(authentication),
            userDetails.getUsername(),
            roles);

    return ResponseEntity.ok(jwtResponse);
  }
}