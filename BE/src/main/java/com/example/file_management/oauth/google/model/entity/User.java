package com.example.file_management.oauth.google.model.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Data
@Table(name = "User")
public class User {

    @Id
    private String sub; // 구글에서 제공하는 unique id

    private String name;
    private String email;

}