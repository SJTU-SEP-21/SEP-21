package com.example.pclogo_backend.dao;

import com.example.pclogo_backend.entity.DoubleTurtleRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface DoubleTurtleRoomDao {

    DoubleTurtleRoom findById(Integer rId);

    void save(DoubleTurtleRoom doubleTurtleRoom);

    Page<DoubleTurtleRoom> getRooms(Pageable pageable);

}