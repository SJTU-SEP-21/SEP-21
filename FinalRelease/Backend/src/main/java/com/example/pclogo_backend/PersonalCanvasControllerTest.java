package com.example.pclogo_backend.controller;

import com.example.pclogo_backend.entity.PersonalCanvas;
import com.example.pclogo_backend.utils.msgutils.Msg;
import com.example.pclogo_backend.utils.msgutils.MsgCode;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.testng.annotations.AfterTest;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class PersonalCanvasControllerTest {

    @Autowired
    private PersonalCanvasController personalCanvasController;
    @AfterTest
    void createRoom() {
        //case 1
        Map<String, String> params = new HashMap<>();
        params.put("name", "canvas1");
        params.put("u_id","1");
        assertEquals(0, personalCanvasController.createCanvas(params).getStatus());
        //case 2
        Map<String, String> params2 = new HashMap<>();
        params2.put("name", "");
        params2.put("u_id","1");
        assertEquals(MsgCode.ROOM_CREATE_FAIL.getStatus(), personalCanvasController.createCanvas(params2).getStatus());
        //case 3
        Map<String, String> params3 = new HashMap<>();
        params3.put("name", "canvas1");
        params3.put("u_id","");
        assertEquals(MsgCode.ROOM_CREATE_FAIL.getStatus(), personalCanvasController.createCanvas(params3).getStatus());
    }

    @Test
    void getCmdFile() {
        // case 1
        Map<String, String> params = new HashMap<>();
        params.put("c_id", "1");
        params.put("u_id", "1");
        PersonalCanvas personalCanvas = personalCanvasController.getCmdFile(params);
        assertNotEquals("error u_id", personalCanvas.getCmdfile());
        //case 2
        Map<String, String> params2 = new HashMap<>();
        params2.put("c_id", "1");
        params2.put("u_id", "1000");
        PersonalCanvas personalCanvas2 = personalCanvasController.getCmdFile(params2);
        assertEquals("error u_id", personalCanvas2.getCmdfile());
    }

    @Test
    void writeCmdFile() {
        // case 1 normal case
        Map<String, String> params = new HashMap<>();
        params.put("c_id", "1");
        params.put("u_id", "1");
        params.put("cmdFile", "code");
        personalCanvasController.WriteCmdFile(params);
        assertEquals("code", personalCanvasController.getCmdFile(params).getCmdfile());
        //case 2 u_id != canvas.u_id
        Map<String, String> params2 = new HashMap<>();
        params2.put("c_id", "1");
        params2.put("u_id", "100");
        params2.put("cmdFile", "fail");
        personalCanvasController.WriteCmdFile(params2);
        assertNotEquals("fail", personalCanvasController.getCmdFile(params2).getCmdfile());
    }

    @Test
    void getNewLines() {
        Map<String, String> params1 = new HashMap<>();
        params1.put("c_id", "1");
        params1.put("u_id","10");
        assertEquals("error u_id", personalCanvasController.getNewLines(params1).getNewline());
    }

    @Test
    void writeNewLines() {
        Map<String, String> params1 = new HashMap<>();
        params1.put("c_id", "1");
        params1.put("u_id", "1");
        params1.put("newLines", "code");
        String cmd = personalCanvasController.getCmdFile(params1).getCmdfile();
        cmd = cmd.concat("code");
        personalCanvasController.writeNewLines(params1);
        assertEquals(cmd, personalCanvasController.getCmdFile(params1).getCmdfile());
    }
}
