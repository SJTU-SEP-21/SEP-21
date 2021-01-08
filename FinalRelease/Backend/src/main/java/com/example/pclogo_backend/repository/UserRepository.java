package com.example.pclogo_backend.repository;

import com.example.pclogo_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "from User where name = :name and password = :password")
    User checkUser(@Param("name") String name, @Param("password") String password);

    @Query(value = "from User where name = :name")
    User checkDuplicate(@Param("name") String name);

    @Query(value = "from User where name = :name")
    User findByName(@Param("name") String name);

}
