package com.example.pclogo_backend.controller;

import com.example.pclogo_backend.constant.Constant;
import com.example.pclogo_backend.entity.User;
import com.example.pclogo_backend.utils.msgutils.MsgCode;
import com.example.pclogo_backend.utils.msgutils.MsgUtil;
import org.junit.After;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
@RunWith(SpringRunner.class)
@SpringBootTest
class UserControllerTest {
    @Autowired
    private UserController userController;
    @Test
    void login() {
        Map<String,String> params = new HashMap<>();
        params.put("name","Alice");
        params.put("password","1234");
        assertNotEquals(MsgUtil.makeMsg(MsgCode.LOGIN_USER_ERROR),userController.login(params));
    }

    @Test
    void logout() {
    }

    @Test
    void addUser() {
        Map<String,String> param = new HashMap<>();
        param.put("name","Bob");
        param.put("password","1234");
        param.put("phone","15811111111");
        param.put("email","Bob@sjtu.edu.cn");
        assertNotEquals(MsgUtil.makeMsg(MsgCode.DUPLICATE_USER_ERROR), userController.addUser(param));
    }

    @Test
    void getUserInfo() {
        Map<String,String> param = new HashMap<>();
        String name = "Alice";
        param.put(Constant.NAME, name);
        User user = userController.getUserInfo(param);
        assertEquals(1,user.getU_id());
    }
}
