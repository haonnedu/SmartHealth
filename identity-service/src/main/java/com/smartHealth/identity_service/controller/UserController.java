package com.smartHealth.identity_service.controller;

import com.smartHealth.identity_service.dto.reqeuest.UserCreationRequest;
import com.smartHealth.identity_service.dto.reqeuest.UserUpdateRequest;
import com.smartHealth.identity_service.entity.User;
import com.smartHealth.identity_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    User create(@RequestBody UserCreationRequest request) {
       return userService.createRequest(request);
    }

    @GetMapping
    List<User> getUser() {
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    User getUserById(@PathVariable UUID userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/{userId}")
    User updateUser(@PathVariable UUID userId, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(userId,request);
    }

    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable UUID userId) {
        return userService.deleteUser(userId);
    }
}
