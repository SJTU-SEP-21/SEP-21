package com.example.pclogo_backend.daoimpl;

import com.example.pclogo_backend.dao.SingleTurtleRoomDao;
import com.example.pclogo_backend.entity.SingleTurtleRoom;
import com.example.pclogo_backend.repository.SingleTurtleRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import javax.transaction.Transactional;

@Repository
public class SingleTurtleRoomDaoImpl implements SingleTurtleRoomDao {

    @Autowired
    SingleTurtleRoomRepository singleTurtleRoomRepository;

    @Override
    public SingleTurtleRoom findById(Integer rId) {
        //return singleTurtleRoomRepository.findById(rId).get();
        if(singleTurtleRoomRepository.findById(rId).isPresent())
            return singleTurtleRoomRepository.findById(rId).get();
        else
            return null;
    }

    @Override
    public Page<SingleTurtleRoom> getRooms(Pageable pageable) {
        Page<SingleTurtleRoom> rooms = singleTurtleRoomRepository.getRooms(pageable);
        return rooms;
    }

    @Transactional
    @Override
    public void save(SingleTurtleRoom singleTurtleRoom) {
        singleTurtleRoomRepository.save(singleTurtleRoom);
    }

}
