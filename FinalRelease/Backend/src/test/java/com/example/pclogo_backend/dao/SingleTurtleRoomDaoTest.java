package com.example.pclogo_backend.dao;

import com.example.pclogo_backend.entity.SingleTurtleRoom;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class SingleTurtleRoomDaoTest {
    @Autowired
    private SingleTurtleRoomDao singleTurtleRoomDao;
    @Test
    void findById() {
        SingleTurtleRoom singleTurtleRoom = singleTurtleRoomDao.findById(1);
        assertNotEquals(null, singleTurtleRoom);
    }

    @Test
    void save() {
        SingleTurtleRoom singleTurtleRoom = new SingleTurtleRoom();
        singleTurtleRoom.setRoom_name("room0");
        singleTurtleRoom.setU1_id(1);
        singleTurtleRoom.setU2_id(-1);
        singleTurtleRoom.setPassword("1234");
        singleTurtleRoom.setCmdfile("");
        singleTurtleRoom.setNewline_1("");
        singleTurtleRoom.setNewline_2("");
        singleTurtleRoom.setUpdate_1(0);
        singleTurtleRoom.setUpdate_2(0);
        singleTurtleRoomDao.save(singleTurtleRoom);
        assertNotEquals(null, singleTurtleRoomDao.findById(singleTurtleRoom.getR_id()));
    }
}
