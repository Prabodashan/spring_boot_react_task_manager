package com.prabod.backend.service.impl;

import com.prabod.backend.config.JwtService;
import com.prabod.backend.dto.AuthenticationResponse;
import com.prabod.backend.dto.LoginRequest;
import com.prabod.backend.dto.RegisterRequest;
import com.prabod.backend.model.Role;
import com.prabod.backend.model.User;
import com.prabod.backend.repository.UserRepository;
import com.prabod.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        var newUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .userId(newUser.getId())
                .name(newUser.getName())
                .build();
    }

    @Override
    public AuthenticationResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception err) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid credentials");
        }

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid credentials"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .name(user.getName())
                .build();
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id).orElse(null);
    }
}
