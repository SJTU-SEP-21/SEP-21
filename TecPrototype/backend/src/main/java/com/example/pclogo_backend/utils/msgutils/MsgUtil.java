package com.example.pclogo_backend.utils.msgutils;

import net.sf.json.JSONObject;

public class MsgUtil {

    public static final int SUCCESS = 0;
    public static final int ERROR = -1;
    public static final int LOGIN_BANNED = -2;
    public static final int DUPLICATE_USER_ERROR = -3;
    public static final int LOGIN_USER_ERROR = -100;
    public static final int NOT_LOGGED_IN_ERROR = -101;
    public static final int ROOM_ID_ERROR = -200;
    public static final int ROOM_PASSWORD_ERROR = -201;
    public static final int ROOM_FULL = -202;
    public static final int ROOM_CREATE_FAIL = -203;


    public static final String SUCCESS_MSG = "成功！";
    public static final String REGISTER_SUCCESS_MSG = "注册成功！";
    public static final String LOGIN_SUCCESS_MSG = "登录成功！";
    public static final String LOGOUT_SUCCESS_MSG = "登出成功！";
    public static final String LOGOUT_ERR_MSG = "登出异常！";
    public static final String ERROR_MSG = "错误！";
    public static final String LOGIN_USER_ERROR_MSG = "用户名或密码错误，请重新输入！";
    public static final String NOT_LOGGED_IN_ERROR_MSG = "登录失效，请重新登录！";
    public static final String LOGIN_BANNED_MSG = "您的账号已经被禁用！";
    public static final String NOT_ENTERING_ANYTHING = "请输入用户名和密码哟";
    public static final String DUPLICATE_USER = "该用户名已被注册!";
    public static final String CONFIRM_PASSWORD_ERROR_MSG = "两次输入的密码不相同！";
    public static final String LET_ME_OUT="放我出去！";
    public static final String RELEASE="you are not prepared！";
    public static final String CREATE_ROOM_SUCCESS_MSG = "创建房间成功！";
    public static final String CREATE_CANVAS_SUCCESS_MSG = "创建画布成功！";
    public static final String CREATE_CANVAS_FAIL_MSG = "创建画布失败！";
    public static final String ENTER_ROOM_SUCCESS_MSG = "进入房间成功！";
    public static final String ROOM_ID_ERR_MSG = "房间号不存在!";
    public static final String ROOM_PASSWORD_ERR_MSG = "密码错误！";
    public static final String ROOM_FULL_MSG = "房间人数已满！";



    public static Msg makeMsg(MsgCode code, JSONObject data){
        return new Msg(code, data);
    }

    public static Msg makeMsg(MsgCode code, String msg, JSONObject data){
        return new Msg(code, msg, data);
    }

    public static Msg makeMsg(MsgCode code){
        return new Msg(code);
    }

    public static Msg makeMsg(MsgCode code, String msg){
        return new Msg(code, msg);
    }

    public static Msg makeMsg(int status, String msg, JSONObject data){
        return new Msg(status, msg, data);
    }

    public static Msg makeMsg(int status, String msg){
        return new Msg(status, msg);
    }
}
