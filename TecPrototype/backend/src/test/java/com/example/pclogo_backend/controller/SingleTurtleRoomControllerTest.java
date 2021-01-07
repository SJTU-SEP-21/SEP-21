package com.example.pclogo_backend.controller;

import com.example.pclogo_backend.utils.msgutils.Msg;
import com.example.pclogo_backend.utils.msgutils.MsgCode;
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

    @Test
    void enterRoom() {
        //case 1
        Map<String, String> params = new HashMap<>();
        params.put("r_id", "10000");
        params.put("password","1234");
        params.put("u_id","2");
        assertEquals(MsgCode.ROOM_ID_ERROR.getStatus(),singleTurtleRoomController.enterRoom(params).getStatus());
        //case 2 wrong password
        Map<String, String> params1 = new HashMap<>();
        params1.put("r_id", "1");
        params1.put("password","2121");
        params1.put("u_id","2");
        assertEquals(MsgCode.ROOM_PASSWORD_ERROR.getStatus(),singleTurtleRoomController.enterRoom(params1).getStatus());
        //case 2
        Map<String, String> params2 = new HashMap<>();
        params2.put("r_id", "1");
        params2.put("password","1234");
        params2.put("u_id","2");
        Msg msg = singleTurtleRoomController.enterRoom(params2);
        assertEquals(0,msg.getStatus());
        //case 3
        params2.put("u_id", "3");
        assertEquals(MsgCode.ROOM_FULL.getStatus(),singleTurtleRoomController.enterRoom(params2).getStatus());
    }

    @Test
    void getCmdFile() {
        //case 1
        Map<String, String> params1 = new HashMap<>();
        params1.put("r_id", "1");
        params1.put("u_id","1");
        assertNotEquals("error u_id", singleTurtleRoomController.getCmdFile(params1));
        //case 2
        Map<String, String> params2 = new HashMap<>();
        params2.put("r_id", "1");
        params2.put("u_id","1");
        assertNotEquals("error u_id", singleTurtleRoomController.getCmdFile(params2));
    }

    @Test
    void getNewLines() {
    }

    @Test
    void writeNewLines() {
    }

    @Test
    void getRooms() {
        Map<String, String> params1 = new HashMap<>();
        params1.put("pagenum", "1");
        params1.put("pagesize","10");
        assertNotEquals(null, singleTurtleRoomController.getRooms(params1));
    }
}
