package com.example.file_management.google.model.entity;
//import javax.persistence.Entity;
//import javax.persistence.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
@Entity
@Data
public class User {

    @Id
    private String sub; // 구글에서 제공하는 unique id

    private String name;
    private String email;

}