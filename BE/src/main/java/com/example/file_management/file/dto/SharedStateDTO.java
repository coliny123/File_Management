package com.example.file_management.file.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SharedStateDTO {

    private Long id;
    private boolean shared;
}
