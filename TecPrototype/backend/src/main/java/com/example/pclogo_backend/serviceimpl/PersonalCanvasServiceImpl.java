package com.example.pclogo_backend.serviceimpl;

import com.example.pclogo_backend.dao.PersonalCanvasDao;
import com.example.pclogo_backend.entity.PersonalCanvas;
import com.example.pclogo_backend.service.PersonalCanvasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PersonalCanvasServiceImpl implements PersonalCanvasService {

    @Autowired
    private PersonalCanvasDao personalCanvasDao;

    @Override
    public PersonalCanvas findById(Integer cId){
        return personalCanvasDao.findById(cId);
    }

    @Override
    public void save(PersonalCanvas personalCanvas) { personalCanvasDao.save(personalCanvas);}

}
