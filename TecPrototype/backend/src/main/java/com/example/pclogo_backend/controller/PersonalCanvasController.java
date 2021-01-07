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
        if(name == "" || params.get("u_id") == ""){
            return MsgUtil.makeMsg(MsgCode.ROOM_CREATE_FAIL, MsgUtil.CREATE_CANVAS_FAIL_MSG);
        }
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
    public PersonalCanvas getCmdFile(@RequestBody Map<String, String> params) {
        int c_id = Integer.parseInt(params.get("c_id"));
        int u_id = Integer.parseInt(params.get("u_id"));

        PersonalCanvas canvas = personalCanvasService.findById(c_id);

        System.out.println(canvas.getCmdfile());

        if (u_id == canvas.getU_id()) {
            return canvas;
        }

        canvas.setCmdfile("error u_id");
        return canvas;
    }

    @RequestMapping("/writeCmdFile_PC")
    public void WriteCmdFile(@RequestBody Map<String, String> params) {
        int c_id = Integer.parseInt(params.get("c_id"));
        int u_id = Integer.parseInt(params.get("u_id"));
        String cmdFile = params.get("cmdFile");

        PersonalCanvas canvas = personalCanvasService.findById(c_id);

        if (u_id == canvas.getU_id()) {
            canvas.setCmdfile(cmdFile);
            personalCanvasService.save(canvas);
        }
    }

    @RequestMapping("/getNewLines_PC")
    public PersonalCanvas getNewLines(@RequestBody Map<String, String> params) {
        int c_id = Integer.parseInt(params.get("c_id"));
        int u_id = Integer.parseInt(params.get("u_id"));

        PersonalCanvas canvas = personalCanvasService.findById(c_id);
        PersonalCanvas canvas_out = personalCanvasService.findById(c_id);

        if (u_id == canvas.getU_id()) {
            if (canvas.getNeedUpdate() == 1) {
                String newLine = canvas.getNewline();
                canvas.setNewline("");
                canvas.setNeedUpdate(0);
                personalCanvasService.save(canvas);
                canvas_out.setNewline(newLine);
                return canvas_out;
            }
            else {
                canvas_out.setNewline("nothing");
                return canvas_out;
            }
        }

        canvas_out.setNewline("error u_id");
        return canvas_out;
    }

    @RequestMapping("/writeNewlines_PC")
    public void writeNewLines(@RequestBody Map<String, String> params) {
        int c_id = Integer.parseInt(params.get("c_id"));
        int u_id = Integer.parseInt(params.get("u_id"));
        String newLines = params.get("newLines");

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
