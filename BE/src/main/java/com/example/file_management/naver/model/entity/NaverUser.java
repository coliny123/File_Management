package com.example.file_management.naver.model.entity;

import com.example.file_management.model.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("Naver")
public class NaverUser extends User {
    private String Nickname;
    private String name;
}

