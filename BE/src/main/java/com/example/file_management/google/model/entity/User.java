//package com.example.file_management.google.model.entity;
//import javax.persistence.Entity;
//import javax.persistence.Id;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import lombok.Data;
//@Entity
//@Data
//public class User {
//
//    @Id
//    private String sub; // 구글에서 제공하는 unique id
//
//    private String name;
//    private String email;
//
//}

package com.example.file_management.google.model.entity;

        import jakarta.persistence.*;
        import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 자동생성된 primary key

    private String name;
    private String Nickname;

    @Column(unique=true)  // email 필드값이 유일
    private String email;

}
