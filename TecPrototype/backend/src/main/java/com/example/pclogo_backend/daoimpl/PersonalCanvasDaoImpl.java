package com.example.pclogo_backend.daoimpl;

import com.example.pclogo_backend.dao.PersonalCanvasDao;
import com.example.pclogo_backend.entity.PersonalCanvas;
import com.example.pclogo_backend.entity.SingleTurtleRoom;
import com.example.pclogo_backend.repository.PersonalCanvasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Override
    public Page<PersonalCanvas> getCanvas(Pageable pageable) {
        Page<PersonalCanvas> canvas = personalCanvasRepository.getCanvas(pageable);
        return canvas;
    }

    @Transactional
    @Override
    public void save(PersonalCanvas personalCanvas) {
        personalCanvasRepository.save(personalCanvas);
    }

}
