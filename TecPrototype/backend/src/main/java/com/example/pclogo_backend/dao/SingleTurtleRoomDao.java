package com.example.pclogo_backend.dao;

import com.example.pclogo_backend.entity.SingleTurtleRoom;

import java.util.Optional;

public interface SingleTurtleRoomDao {

    SingleTurtleRoom findById(Integer rId);

    void save(SingleTurtleRoom singleTurtleRoom);

}