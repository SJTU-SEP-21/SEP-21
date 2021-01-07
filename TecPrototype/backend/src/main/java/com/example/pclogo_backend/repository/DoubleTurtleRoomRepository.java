package com.example.pclogo_backend.repository;

import com.example.pclogo_backend.entity.DoubleTurtleRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoubleTurtleRoomRepository extends JpaRepository<DoubleTurtleRoom, Integer> {

    @Query(value = "select r from DoubleTurtleRoom r")
    Page<DoubleTurtleRoom> getRooms(Pageable pageable);

}