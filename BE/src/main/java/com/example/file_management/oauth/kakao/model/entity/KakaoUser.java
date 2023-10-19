package com.example.file_management.oauth.kakao.model.entity;

import com.example.file_management.oauth.model.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("Kakao")
public class KakaoUser extends User {
}

