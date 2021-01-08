package com.example.pclogo_backend.dao;

import com.example.pclogo_backend.entity.PersonalCanvas;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.awt.*;
import java.util.Optional;

public interface PersonalCanvasDao {

    PersonalCanvas findById(Integer cId);

    void save(PersonalCanvas personalCanvas);

    Page<PersonalCanvas> getCanvas(Pageable pageable);

}
