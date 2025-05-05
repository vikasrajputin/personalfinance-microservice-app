package com.auth.service;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
  private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

  @Value("${app.jwtSecret}")
  private String jwtSecret;

  @Value("${app.jwtExpirationMs}")
  private int jwtExpirationMs;

  @Value("${app.jwtRefreshTokenExpiry}")
  private int jwtRefreshTokenExpiry;

  public String generateJwtToken(Authentication authentication) {
    return Jwts.builder()
        .setSubject((authentication.getName()))
        .claim("authorities", authentication.getAuthorities())
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
        .signWith(SignatureAlgorithm.HS256,key())
        .compact();
  }

  public String generateRefreshToken(Authentication authentication) {
    return Jwts.builder()
            .setSubject((authentication.getName()))
            .claim("authorities", authentication.getAuthorities())
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtRefreshTokenExpiry))
            .signWith(SignatureAlgorithm.HS256,key())
            .compact();
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parser().setSigningKey(key()).parseClaimsJws(token).getBody().getSubject();
  }

  public List<Map<String, String>> getAuthoritiesFromJwtToken(String token) {
    return (List<Map<String, String>>)Jwts.parser().setSigningKey(key()).parseClaimsJws(token).getBody().get("authorities");
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
  }

  public Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken).getBody();
      return true;
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }
}