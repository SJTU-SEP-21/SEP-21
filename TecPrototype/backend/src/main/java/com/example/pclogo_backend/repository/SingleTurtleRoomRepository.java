package com.example.pclogo_backend.repository;

import com.example.pclogo_backend.entity.SingleTurtleRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SingleTurtleRoomRepository extends JpaRepository<SingleTurtleRoom, Integer> {

    @Query(value = "select r from SingleTurtleRoom r")
    Page<SingleTurtleRoom> getRooms(Pageable pageable);

}