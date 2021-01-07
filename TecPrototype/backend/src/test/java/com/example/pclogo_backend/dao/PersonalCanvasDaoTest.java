package com.example.pclogo_backend.dao;

import com.example.pclogo_backend.entity.PersonalCanvas;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class PersonalCanvasDaoTest {
    @Autowired
    private PersonalCanvasDao personalCanvasDao;
    @Test
    void findById() {
        PersonalCanvas personalCanvas = personalCanvasDao.findById(1);
        assertNotEquals(null, personalCanvas);
    }

    @Test
    void save() {
        PersonalCanvas newCanvas = new PersonalCanvas();
        newCanvas.setCanvas_name("canvasx");
        newCanvas.setU_id(1);
        newCanvas.setCmdfile("");
        newCanvas.setNewline("");
        newCanvas.setNeedUpdate(0);
        personalCanvasDao.save(newCanvas);
        assertNotEquals(null, personalCanvasDao.findById(newCanvas.getC_id()));
    }
}
