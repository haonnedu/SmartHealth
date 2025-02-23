package com.smartHealth.identity_service.service;

import com.smartHealth.identity_service.dto.reqeuest.UserCreationRequest;
import com.smartHealth.identity_service.dto.reqeuest.UserUpdateRequest;
import com.smartHealth.identity_service.entity.User;
import com.smartHealth.identity_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User createRequest(UserCreationRequest request) {
        User user = new User();
        if(userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setDob(request.getDob());

        return userRepository.save(user);
    }
    public User updateUser(UUID userId, UserUpdateRequest request) {
        User user = getUserById(userId);

        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setDob(request.getDob());

        return userRepository.save(user);
    }
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String deleteUser(UUID userId) {
        userRepository.deleteById(userId);
        return "User has been deleted";
    }
}
