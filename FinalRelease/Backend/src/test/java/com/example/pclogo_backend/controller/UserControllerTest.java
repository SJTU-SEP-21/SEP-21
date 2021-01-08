package com.example.pclogo_backend.controller;

import com.example.pclogo_backend.constant.Constant;
import com.example.pclogo_backend.entity.User;
import com.example.pclogo_backend.utils.msgutils.Msg;
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
        //case 1 success
        Map<String,String> params = new HashMap<>();
        params.put("username","Alice");
        params.put("password","1234");
        assertEquals(MsgCode.SUCCESS.getStatus(),userController.login(params).getStatus());
        //case 2 fail
        Map<String,String> params2 = new HashMap<>();
        params2.put("username","Alice");
        params2.put("password","4321");
        assertEquals(MsgCode.LOGIN_USER_ERROR.getStatus(),userController.login(params2).getStatus());
    }

    @Test
    void logout() {
    }

    @Test
    void addUser() {
        //case 1 empty name
        Map<String,String> param1 = new HashMap<>();
        param1.put("name","");
        param1.put("password","1234");
        param1.put("phone","15811111111");
        param1.put("email","Bob@sjtu.edu.cn");
        Msg msg1 = userController.addUser(param1);
        assertEquals(MsgCode.NOT_ENTERING_ANYTHING.getStatus(), msg1.getStatus());

        //case 2 empty password
        Map<String,String> param2 = new HashMap<>();
        param2.put("name","Bob");
        param2.put("password","");
        param2.put("phone","15811111111");
        param2.put("email","Bob@sjtu.edu.cn");
        Msg msg2 = userController.addUser(param2);
        assertEquals(MsgCode.NOT_ENTERING_ANYTHING.getStatus(), msg2.getStatus());

        //case 3 success
        Map<String,String> param = new HashMap<>();
        param.put("name","Bob");
        param.put("password","1234");
        param.put("phone","15811111111");
        param.put("email","Bob@sjtu.edu.cn");
        assertEquals(MsgCode.SUCCESS.getStatus(), userController.addUser(param).getStatus());

    }
    @Test
    void checkSession(){
        assertEquals(MsgCode.NOT_LOGGED_IN_ERROR.getStatus(), userController.checkSession().getStatus());
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
