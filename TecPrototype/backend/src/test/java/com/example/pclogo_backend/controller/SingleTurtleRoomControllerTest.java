package com.example.pclogo_backend.controller;

import com.example.pclogo_backend.utils.msgutils.Msg;
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
class SingleTurtleRoomControllerTest {
    @Autowired
    private SingleTurtleRoomController singleTurtleRoomController;
    @Test
    void createRoom() {
        Map<String, String> params = new HashMap<>();
        params.put("name", "room1");
        params.put("password","1234");
        params.put("u_id","1");
        Msg msg = singleTurtleRoomController.createRoom(params);
        assertEquals(0,msg.getStatus());
    }
}
