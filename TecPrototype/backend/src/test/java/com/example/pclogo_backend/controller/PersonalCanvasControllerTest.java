package com.example.pclogo_backend.controller;

import com.example.pclogo_backend.entity.PersonalCanvas;
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
class PersonalCanvasControllerTest {
    @Autowired
    private PersonalCanvasController personalCanvasController;
    @Test
    void createRoom() {
        Map<String, String> params = new HashMap<>();
        params.put("name", "canvas1");
        params.put("u_id","1");
        Msg msg = personalCanvasController.createRoom(params);
        assertEquals(0, msg.getStatus());
    }
}
