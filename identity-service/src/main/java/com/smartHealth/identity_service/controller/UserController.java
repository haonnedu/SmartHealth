package com.smartHealth.identity_service.controller;

import com.smartHealth.identity_service.dto.reqeuest.UserCreationRequest;
import com.smartHealth.identity_service.dto.reqeuest.UserUpdateRequest;
import com.smartHealth.identity_service.dto.response.ApiResponse;
import com.smartHealth.identity_service.entity.User;
import com.smartHealth.identity_service.service.KeycloakService;
import com.smartHealth.identity_service.service.UserService;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    private final KeycloakService keycloakService;

    public UserController(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }

    @PostMapping
    ApiResponse<User> createUser(@RequestBody UserCreationRequest request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.createRequest(request));

       return apiResponse;
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

    @PostMapping("/create")
    public String createUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");
        String role = request.get("role"); // Example: "doctor", "patient"

        return keycloakService.createUser(username, email, password, role);
    }

    @PostMapping("/assign")
    public String assignRole(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String roleName = request.get("roleName");
        return keycloakService.assignRoleToUser(userId, roleName);
    }

    @PostMapping("/remove")
    public String removeRole(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String roleName = request.get("roleName");
        return keycloakService.removeRoleFromUser(userId, roleName);
    }

    @GetMapping("/user/{userId}")
    public List<RoleRepresentation> getUserRoles(@PathVariable String userId) {
        return keycloakService.getUserRoles(userId);
    }

    @GetMapping("/all")
    public List<RoleRepresentation> getAllRoles() {
        return keycloakService.getAllRoles();
    }
}
