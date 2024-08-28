package com.prabod.backend.controller;

import com.prabod.backend.dto.AuthenticationResponse;
import com.prabod.backend.dto.LoginRequest;
import com.prabod.backend.dto.RegisterRequest;
import com.prabod.backend.response.Response;
import com.prabod.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {

       AuthenticationResponse user =  userService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(new Response.ResponseBuilder()
                .status(true)
                .message("User successfully registered!")
                .data(user)
                .build());
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {

        AuthenticationResponse user =userService.login(request);


        return ResponseEntity.status(HttpStatus.OK).body(new Response.ResponseBuilder()
                .status(true)
                .message("User successfully login!")
                .data(user)
                .build());
    }



}
