package com.example.pclogo_backend.dao;

import com.example.pclogo_backend.entity.User;

import java.util.Optional;

public interface UserDao {

    User checkUser(String name, String password);

    User checkDuplicate(String name);

    User findByName(String name);

    User findById(Integer uId);

    void save(User user);

}
