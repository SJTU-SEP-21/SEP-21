package com.example.pclogo_backend.controller;

import com.example.pclogo_backend.entity.User;
import com.example.pclogo_backend.dao.UserDao;
import com.example.pclogo_backend.constant.Constant;
import com.example.pclogo_backend.utils.msgutils.Msg;
import com.example.pclogo_backend.utils.msgutils.MsgCode;
import com.example.pclogo_backend.utils.msgutils.MsgUtil;
import com.example.pclogo_backend.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    @RequestMapping("/login")
    public Msg login(@RequestBody Map<String, String> params){
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        System.out.println(userDao);
        User user = userDao.checkUser(username, password);
        if(user != null){

            JSONObject obj = new JSONObject();
            obj.put(Constant.U_ID, user.getU_id());
            obj.put(Constant.USERNAME, user.getName());
            SessionUtil.setSession(obj);

            JSONObject data = JSONObject.fromObject(user);
            data.remove(Constant.PASSWORD);

            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, data);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.LOGIN_USER_ERROR);
        }
    }

    @RequestMapping("/logout")
    public Msg logout() {
        Boolean status = SessionUtil.removeSession();

        if (status) {
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGOUT_SUCCESS_MSG);
        }
        return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.LOGOUT_ERR_MSG);
    }

    @RequestMapping("/register")
    public Msg addUser(@RequestBody Map<String, String> params) {
        String name = params.get(Constant.NAME);
        String password = params.get(Constant.PASSWORD);
        String phone = params.get(Constant.PHONE);
        String email = params.get(Constant.EMAIL);


        if(name == "" || password == ""){
            return MsgUtil.makeMsg(MsgCode.NOT_ENTERING_ANYTHING);
        }
        User newUser = new User();
        newUser.setName(name);
        newUser.setPassword(password);
        newUser.setPhone(phone);
        newUser.setE_mail(email);

        User duplicate = userDao.checkDuplicate(name);

        if (duplicate == null) {
            userDao.save(newUser);

            JSONObject obj = new JSONObject();
            obj.put(Constant.NAME, newUser.getName());
            SessionUtil.setSession(obj);

            JSONObject data = JSONObject.fromObject(newUser);
            data.remove(Constant.PASSWORD);

            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.REGISTER_SUCCESS_MSG, data);
        } else {
            return MsgUtil.makeMsg(MsgCode.DUPLICATE_USER_ERROR);
        }

    }

    @RequestMapping("/checkSession")
    public Msg checkSession() {
        JSONObject auth = SessionUtil.getAuth();

        if (auth == null) {
            return MsgUtil.makeMsg(MsgCode.NOT_LOGGED_IN_ERROR);
        } else {
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, auth);
        }
    }

    @RequestMapping("/getUserInfo")
    public User getUserInfo(@RequestBody Map<String, String> params) {
        String name = params.get(Constant.NAME);
        JSONObject auth = SessionUtil.getAuth();
        if (auth != null){
            if(!name.equals(auth.getString(Constant.NAME))) {
                return null;
            }
        }
        User user = userDao.findByName(name);
        user.setPassword(null);
        return user;
    }
}
