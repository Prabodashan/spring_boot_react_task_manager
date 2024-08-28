package com.prabod.backend.service.impl;

import com.prabod.backend.config.JwtService;
import com.prabod.backend.dto.AuthenticationResponse;
import com.prabod.backend.dto.LoginRequest;
import com.prabod.backend.dto.RegisterRequest;
import com.prabod.backend.model.Role;
import com.prabod.backend.model.User;
import com.prabod.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UserServiceImpl userServiceImpl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegister() {
        //Given
        RegisterRequest request = new RegisterRequest();
        request.setName("John Doe");
        request.setEmail("john.doe@example.com");
        request.setPassword("password");

        User user = User.builder()
                .id(1L)
                .name("John Doe")
                .email("john.doe@example.com")
                .password("encodedPassword")
                .role(Role.USER)
                .build();

        //Mock the call
        Mockito.when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

        //When
        AuthenticationResponse response = userServiceImpl.register(request);

        //Then
        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        assertEquals(1L, response.getUserId());
        assertEquals("John Doe", response.getName());

        verify(userRepository).save(any(User.class));
        verify(jwtService).generateToken(any(User.class));
    }

    @Test
    public void testLogin_Success() {
        //Given
        LoginRequest request = new LoginRequest();
        request.setEmail("john.doe@example.com");
        request.setPassword("password");

        User user = User.builder()
                .id(1L)
                .name("John Doe")
                .email("john.doe@example.com")
                .password("encodedPassword")
                .role(Role.USER)
                .build();

        //Mock the call
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

        //When
        AuthenticationResponse response = userServiceImpl.login(request);

        //Then
        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        assertEquals(1L, response.getUserId());
        assertEquals("John Doe", response.getName());

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByEmail(request.getEmail());
        verify(jwtService).generateToken(any(User.class));
    }

    @Test
    public void testLogin_InvalidCredentials() {
        //Given
        LoginRequest request = new LoginRequest();
        request.setEmail("john.doe@example.com");
        request.setPassword("wrongPassword");

        //Mock the call
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid credentials"));

        //When
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            userServiceImpl.login(request);
        });

        //Then
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatusCode());
        assertEquals("invalid credentials", exception.getReason());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    public void testGetUserById_UserExists() {
        //Given
        long userId = 1L;

        User user = User.builder()
                .id(userId)
                .name("John Doe")
                .email("john.doe@example.com")
                .password("encodedPassword")
                .role(Role.USER)
                .build();

        //Mock the call
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        //When
        User foundUser = userServiceImpl.getUserById(userId);

        //Then
        assertNotNull(foundUser);
        assertEquals(userId, foundUser.getId());
        assertEquals("John Doe", foundUser.getName());
        verify(userRepository).findById(userId);
    }

    @Test
    public void testGetUserById_UserDoesNotExist() {
        //Given
        long userId = 1L;

        //Mock the call
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        //When
        User foundUser = userServiceImpl.getUserById(userId);

        //Then
        assertNull(foundUser);
        verify(userRepository).findById(userId);
    }

}