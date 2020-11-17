package com.example.pclogo_backend.daoimpl;

import com.example.pclogo_backend.dao.UserDao;
import com.example.pclogo_backend.entity.User;
import com.example.pclogo_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import javax.transaction.Transactional;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserRepository userRepository;

    @Override
    public User checkUser(String name, String password) {
        return userRepository.checkUser(name, password);
    }

    @Override
    public User checkDuplicate(String name) {
        return userRepository.checkDuplicate(name);
    }

    @Override
    public User findByName(String name) {
        return userRepository.findByName(name);
    }

    @Override
    public User findById(Integer uId) {
        return userRepository.findById(uId).get();
    }

    @Transactional
    @Override
    public void save(User user) {
        userRepository.save(user);
    }

}
