package com.example.pclogo_backend.controller;

import com.example.pclogo_backend.entity.DoubleTurtleRoom;
import com.example.pclogo_backend.dao.DoubleTurtleRoomDao;
import com.example.pclogo_backend.constant.Constant;
import com.example.pclogo_backend.utils.msgutils.Msg;
import com.example.pclogo_backend.utils.msgutils.MsgCode;
import com.example.pclogo_backend.utils.msgutils.MsgUtil;
import com.example.pclogo_backend.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class DoubleTurtleRoomController {

    @Autowired
    private DoubleTurtleRoomDao doubleTurtleRoomDao;

    @RequestMapping("/createRoom_DTR")
    public Msg createRoom(@RequestBody Map<String, String> params) {
        String name = params.get(Constant.NAME);
        String password = params.get(Constant.PASSWORD);
        int u1_id = Integer.parseInt(params.get("u_id"));

        DoubleTurtleRoom newRoom = new DoubleTurtleRoom();
        newRoom.setRoom_name(name);
        newRoom.setPassword(password);
        newRoom.setU1_id(u1_id);
        newRoom.setU2_id(-1);
        newRoom.setCmdfile_1("");
        newRoom.setCmdfile_2("");
        newRoom.setNewline_1("");
        newRoom.setNewline_2("");
        newRoom.setUpdate_1(0);
        newRoom.setUpdate_2(0);

        doubleTurtleRoomDao.save(newRoom);

        JSONObject data = JSONObject.fromObject(newRoom);
        data.remove(Constant.PASSWORD);

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.CREATE_ROOM_SUCCESS_MSG, data);
    }

    @RequestMapping("/enterRoom_DTR")
    public Msg enterRoom(@RequestBody Map<String, String> params) {
        int r_id = Integer.parseInt(params.get("r_id"));
        String password = params.get(Constant.PASSWORD);
        int u_id = Integer.parseInt(params.get("u_id"));

        DoubleTurtleRoom room = doubleTurtleRoomDao.findById(r_id);

        if (room == null) {
            return MsgUtil.makeMsg(MsgCode.ROOM_ID_ERROR);
        }

        if (!password.equals(room.getPassword())) {
            return MsgUtil.makeMsg(MsgCode.ROOM_PASSWORD_ERROR);
        }

        if (u_id == room.getU1_id() || u_id == room.getU2_id()) {
            return MsgUtil.makeMsg(MsgCode.ENTER_ROOM_SUCCESS);
        }

        if (room.getU2_id() != -1) {
            return MsgUtil.makeMsg(MsgCode.ROOM_FULL);
        }

        room.setU2_id(u_id);
        doubleTurtleRoomDao.save(room);
        return MsgUtil.makeMsg(MsgCode.ENTER_ROOM_SUCCESS);
    }

    @RequestMapping("/getCmdFile_DTR")
    public DoubleTurtleRoom getCmdFile(@RequestBody Map<String, String> params) {
        int r_id = Integer.parseInt(params.get("r_id"));
        int u_id = Integer.parseInt(params.get("u_id"));

        DoubleTurtleRoom room = doubleTurtleRoomDao.findById(r_id);

        if (u_id == room.getU1_id() || u_id == room.getU2_id()) {
            return room;
        }

        room.setCmdfile_1("error u_id");
        return room;
    }

    @RequestMapping("/getNewLines_DTR")
    public String getNewLines(@RequestBody Map<String, String> params) {
        int r_id = Integer.parseInt(params.get("r_id"));
        int u_id = Integer.parseInt(params.get("u_id"));

        DoubleTurtleRoom room = doubleTurtleRoomDao.findById(r_id);

        if (u_id == room.getU1_id()) {
            if (room.getUpdate_1() == 1) {
                String newLine = room.getNewline_1();
                room.setNewline_1("");
                room.setUpdate_1(0);
                return newLine;
            }
            else return "nothing";
        }
        if (u_id == room.getU2_id()) {
            if (room.getUpdate_2() == 1) {
                String newLine = room.getNewline_2();
                room.setNewline_2("");
                room.setUpdate_2(0);
                return newLine;
            }
            else return "nothing";
        }

        return "error u_id";
    }

    @RequestMapping("/writeCmdLines_DTR")
    public void writeNewLines(@RequestBody Map<String, String> params) {
        int r_id = Integer.parseInt(params.get("r_id"));
        int u_id = Integer.parseInt(params.get("u_id"));
        String cmdFile = params.get("cmdFile");

        DoubleTurtleRoom room = doubleTurtleRoomDao.findById(r_id);

        if (u_id == room.getU1_id()) {
            room.setCmdfile_1(cmdFile);
            doubleTurtleRoomDao.save(room);
        }
        if (u_id == room.getU2_id()) {
            room.setCmdfile_2(cmdFile);
            doubleTurtleRoomDao.save(room);
        }
    }

    // 0 latest, 1 earliest
    @RequestMapping("/getRooms_DTR")
    public List<DoubleTurtleRoom> getRooms(@RequestBody Map<String, String> params) {
        Integer PageNum = Integer.parseInt(params.get("pagenum"));
        Integer PageContentNum = Integer.parseInt(params.get("pagesize"));
//        String keyword = params.get("keyword");
//        if (keyword == null)
//            keyword = "";
        String sort = params.get("sortby");
        Integer sortby = sort != null ? Integer.parseInt(sort) : 0;
//        String higher = params.get("paymentHigher");
//        String lower = params.get("paymentLower");
//        Double paymentHigher = higher != null ? Double.parseDouble(higher) : 10000;
//        Double paymentLower = lower != null ? Double.parseDouble(lower) : 0;

        if (PageNum <= 0 || PageContentNum <= 0) {
            PageNum = 1;
            PageContentNum = 20;
        }

        if (sortby == 1) {
            Pageable pageable = PageRequest.of(PageNum - 1, PageContentNum, Sort.by(Sort.Direction.ASC, "r_id"));
            return doubleTurtleRoomDao.getRooms(pageable).getContent();
        } else {
            Pageable pageable = PageRequest.of(PageNum - 1, PageContentNum, Sort.by(Sort.Direction.DESC, "r_id"));
            return doubleTurtleRoomDao.getRooms(pageable).getContent();
        }
    }

}