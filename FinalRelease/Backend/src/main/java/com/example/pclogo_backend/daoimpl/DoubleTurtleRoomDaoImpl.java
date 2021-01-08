package com.example.pclogo_backend.daoimpl;

import com.example.pclogo_backend.dao.DoubleTurtleRoomDao;
import com.example.pclogo_backend.entity.DoubleTurtleRoom;
import com.example.pclogo_backend.repository.DoubleTurtleRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import javax.transaction.Transactional;

@Repository
public class DoubleTurtleRoomDaoImpl implements DoubleTurtleRoomDao {

    @Autowired
    DoubleTurtleRoomRepository doubleTurtleRoomRepository;

    @Override
    public DoubleTurtleRoom findById(Integer rId) {
        return doubleTurtleRoomRepository.findById(rId).get();
    }

    @Override
    public Page<DoubleTurtleRoom> getRooms(Pageable pageable) {
        Page<DoubleTurtleRoom> rooms = doubleTurtleRoomRepository.getRooms(pageable);
        return rooms;
    }

    @Transactional
    @Override
    public void save(DoubleTurtleRoom doubleTurtleRoom) {
        doubleTurtleRoomRepository.save(doubleTurtleRoom);
    }

}