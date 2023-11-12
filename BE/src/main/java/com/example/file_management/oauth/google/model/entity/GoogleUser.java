package com.example.file_management.oauth.google.model.entity;

import com.example.file_management.oauth.model.entity.User;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("Google")
public class GoogleUser extends User {

}



