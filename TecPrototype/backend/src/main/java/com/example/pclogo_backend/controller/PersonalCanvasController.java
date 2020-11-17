package com.example.pclogo_backend.controller;

import com.example.pclogo_backend.service.PersonalCanvasService;
import com.example.pclogo_backend.entity.PersonalCanvas;
import com.example.pclogo_backend.constant.Constant;
import com.example.pclogo_backend.utils.msgutils.Msg;
import com.example.pclogo_backend.utils.msgutils.MsgCode;
import com.example.pclogo_backend.utils.msgutils.MsgUtil;
import com.example.pclogo_backend.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class PersonalCanvasController {

    @Autowired
    private PersonalCanvasService personalCanvasService;

    @RequestMapping("/createCanvas_PC")
    public Msg createRoom(@RequestBody Map<String, String> params) {
        String name = params.get(Constant.NAME);
        int u_id = Integer.parseInt(params.get("u_id"));

        PersonalCanvas newCanvas = new PersonalCanvas();
        newCanvas.setCanvas_name(name);
        newCanvas.setU_id(u_id);
        newCanvas.setCmdfile("");
        newCanvas.setNewline("");
        newCanvas.setNeedUpdate(0);

        personalCanvasService.save(newCanvas);

        JSONObject data = JSONObject.fromObject(newCanvas);

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.CREATE_CANVAS_SUCCESS_MSG, data);
    }

    @RequestMapping("/getCmdFile_PC")
    public String getCmdFile(@RequestBody Map<String, String> params) {
        int c_id = Integer.parseInt(params.get("c_id"));
        int u_id = Integer.parseInt(params.get("u_id"));

        PersonalCanvas canvas = personalCanvasService.findById(c_id);

        if (u_id == canvas.getU_id()) {
            return canvas.getCmdfile();
        }

        return "error u_id";
    }

    @RequestMapping("/getNewLines_PC")
    public String getNewLines(@RequestBody Map<String, String> params) {
        int c_id = Integer.parseInt(params.get("c_id"));
        int u_id = Integer.parseInt(params.get("u_id"));

        PersonalCanvas canvas = personalCanvasService.findById(c_id);

        if (u_id == canvas.getU_id()) {
            if (canvas.getNeedUpdate() == 1) {
                String newLine = canvas.getNewline();
                canvas.setNewline("");
                canvas.setNeedUpdate(0);
                personalCanvasService.save(canvas);
                System.out.println(newLine);
                return newLine;
            }
            else return "nothing";
        }

        return "error u_id";
    }

    @RequestMapping("/writeNewlines_PC")
    public void writeNewLines(@RequestBody Map<String, String> params) {
        System.out.println("test");
        int c_id = Integer.parseInt(params.get("c_id"));
        int u_id = Integer.parseInt(params.get("u_id"));
        String newLines = params.get("newLines");

        System.out.println(c_id);
        System.out.println(u_id);
        System.out.println(newLines);

        PersonalCanvas canvas = personalCanvasService.findById(c_id);

        if (u_id == canvas.getU_id()) {
            String newLine = canvas.getNewline();
            String cmdFile = canvas.getCmdfile();

            newLine = newLine.concat(newLines);
            cmdFile = cmdFile.concat(newLines);

            canvas.setNewline(newLine);
            canvas.setCmdfile(cmdFile);
            canvas.setNeedUpdate(1);

            personalCanvasService.save(canvas);
        }
    }

}