package com.example.pclogo_backend.dao;

import com.example.pclogo_backend.entity.SingleTurtleRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface SingleTurtleRoomDao {

    SingleTurtleRoom findById(Integer rId);

    void save(SingleTurtleRoom singleTurtleRoom);

    Page<SingleTurtleRoom> getRooms(Pageable pageable);

}