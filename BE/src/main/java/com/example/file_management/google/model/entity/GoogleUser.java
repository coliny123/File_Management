package com.example.file_management.google.model.entity;

import com.example.file_management.model.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("Google")
public class GoogleUser extends User {
    private String name;
}


