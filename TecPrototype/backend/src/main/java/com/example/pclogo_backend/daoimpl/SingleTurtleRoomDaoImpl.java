package com.example.pclogo_backend.daoimpl;

import com.example.pclogo_backend.dao.SingleTurtleRoomDao;
import com.example.pclogo_backend.entity.SingleTurtleRoom;
import com.example.pclogo_backend.repository.SingleTurtleRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import javax.transaction.Transactional;

@Repository
public class SingleTurtleRoomDaoImpl implements SingleTurtleRoomDao {

    @Autowired
    SingleTurtleRoomRepository singleTurtleRoomRepository;

    @Override
    public SingleTurtleRoom findById(Integer rId) {
        return singleTurtleRoomRepository.findById(rId).get();
    }

    @Transactional
    @Override
    public void save(SingleTurtleRoom singleTurtleRoom) {
        singleTurtleRoomRepository.save(singleTurtleRoom);
    }

}