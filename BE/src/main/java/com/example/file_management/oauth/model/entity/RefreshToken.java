package com.example.file_management.oauth.model.entity;

import lombok.*;
import jakarta.persistence.*;

@Builder
@Entity
@Data
@Table(name = "user_token")
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String refreshToken;


}
