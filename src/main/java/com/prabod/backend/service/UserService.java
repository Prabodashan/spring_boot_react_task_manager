package com.prabod.backend.service;

import com.prabod.backend.dto.AuthenticationResponse;
import com.prabod.backend.dto.LoginRequest;
import com.prabod.backend.dto.RegisterRequest;
import com.prabod.backend.model.User;

public interface UserService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(LoginRequest request);

    User getUserById(long id);
}
