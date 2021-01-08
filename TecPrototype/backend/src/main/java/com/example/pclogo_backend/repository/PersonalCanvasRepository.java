package com.example.pclogo_backend.repository;

import com.example.pclogo_backend.entity.PersonalCanvas;
import com.example.pclogo_backend.entity.SingleTurtleRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PersonalCanvasRepository extends JpaRepository<PersonalCanvas, Integer> {

    @Query(value = "select c from PersonalCanvas c")
    Page<PersonalCanvas> getCanvas(Pageable pageable);

}
