package com.example.pclogo_backend.daoimpl;

import com.example.pclogo_backend.dao.PersonalCanvasDao;
import com.example.pclogo_backend.entity.PersonalCanvas;
import com.example.pclogo_backend.repository.PersonalCanvasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import javax.transaction.Transactional;

@Repository
public class PersonalCanvasDaoImpl implements PersonalCanvasDao {

    @Autowired
    PersonalCanvasRepository personalCanvasRepository;

    @Override
    public PersonalCanvas findById(Integer cId) {
        return personalCanvasRepository.findById(cId).get();
    }

    @Transactional
    @Override
    public void save(PersonalCanvas personalCanvas) {
        personalCanvasRepository.save(personalCanvas);
    }

}