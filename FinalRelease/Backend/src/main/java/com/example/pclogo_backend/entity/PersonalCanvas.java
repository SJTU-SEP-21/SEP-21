package com.example.pclogo_backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "personal_canvas")
@JsonIgnoreProperties(value = { "handler", "hibernateLazyInitializer", "fieldHandler" })
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "c_id")
public class PersonalCanvas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int c_id;
    private int u_id;
    private String canvas_name;
    private String cmdfile;
    private String newline;
    private int needUpdate;

    // 1 means need to update, 0 means there's nothing to update
}