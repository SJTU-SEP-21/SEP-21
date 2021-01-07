package com.example.pclogo_backend.dao;

import com.example.pclogo_backend.entity.User;
import com.example.pclogo_backend.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserDaoTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDao userDao;
    @Test
    public void findByName() {
        String name = "Alice";
        User user = userDao.findByName(name);
        assertEquals(1, user.getU_id());
        //System.out.println(user.getPassword());
    }

    @Test
    public void findById(){
        User user = userDao.findById(1);
        String name = "Alice";
        assertEquals(name, user.getName());
    }

    @Test
    public void save() {
        User user = new User();
        user.setName("Bob");
        user.setPassword("1234");
        user.setPhone("13511111111");
        user.setE_mail("Bob@sjtu.edu.cn");
        userDao.save(user);
        User new_user = userDao.findById(user.getU_id());
        assertNotEquals(null,new_user);
    }
}
