package com.example.pclogo_backend.dao;

import com.example.pclogo_backend.entity.PersonalCanvas;

import java.util.Optional;

public interface PersonalCanvasDao {

    PersonalCanvas findById(Integer cId);

    void save(PersonalCanvas personalCanvas);

}