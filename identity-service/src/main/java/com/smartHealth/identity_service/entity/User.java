package com.smartHealth.identity_service.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@Table(name = "users", schema = "smart_health")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_id_seq")
    private Long id;

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dob;
}
