package com.example.pclogo_backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "single_turtle_room")
@JsonIgnoreProperties(value = { "handler", "hibernateLazyInitializer", "fieldHandler" })
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "r_id")
public class SingleTurtleRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int r_id;
    private int u1_id;
    private int u2_id;
    private String room_name;
    private String password;
    private String cmdfile;
    private String newline_1;
    private String newline_2;
    private int update_1;
    private int update_2;

    // 1 means need to update, 0 means there's nothing to update
}