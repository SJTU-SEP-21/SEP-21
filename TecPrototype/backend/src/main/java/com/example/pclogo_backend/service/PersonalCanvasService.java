package com.example.pclogo_backend.service;

import com.example.pclogo_backend.entity.PersonalCanvas;

import java.util.List;


public interface PersonalCanvasService {

    PersonalCanvas findById(Integer cId);

    void save(PersonalCanvas personalCanvas);
}
