package com.example.pclogo_backend.utils.msgutils;

public enum MsgCode {
    SUCCESS(MsgUtil.SUCCESS, MsgUtil.SUCCESS_MSG),
    ERROR(MsgUtil.ERROR,MsgUtil.ERROR_MSG),
    NOT_ENTERING_ANYTHING(MsgUtil.ERROR, MsgUtil.NOT_ENTERING_ANYTHING),
    LOGIN_BANNED(MsgUtil.LOGIN_BANNED,MsgUtil.LOGIN_BANNED_MSG),
    DUPLICATE_USER_ERROR(MsgUtil.DUPLICATE_USER_ERROR,MsgUtil.DUPLICATE_USER),
    CONFIRM_PASSWORD_ERROR(MsgUtil.ERROR,MsgUtil.CONFIRM_PASSWORD_ERROR_MSG),
    LOGIN_USER_ERROR(MsgUtil.LOGIN_USER_ERROR,MsgUtil.LOGIN_USER_ERROR_MSG),
    NOT_LOGGED_IN_ERROR(MsgUtil.NOT_LOGGED_IN_ERROR,MsgUtil.NOT_LOGGED_IN_ERROR_MSG),
    LET_ME_OUT(MsgUtil.ERROR,MsgUtil.LET_ME_OUT),
    RELEASE(MsgUtil.ERROR,MsgUtil.RELEASE),
    ENTER_ROOM_SUCCESS(MsgUtil.SUCCESS,MsgUtil.ENTER_ROOM_SUCCESS_MSG),
    ROOM_ID_ERROR(MsgUtil.ROOM_ID_ERROR,MsgUtil.ROOM_ID_ERR_MSG),
    ROOM_PASSWORD_ERROR(MsgUtil.ROOM_PASSWORD_ERROR,MsgUtil.ROOM_PASSWORD_ERR_MSG),
    ROOM_FULL(MsgUtil.ROOM_FULL,MsgUtil.ROOM_FULL_MSG),
    ROOM_CREATE_FAIL(MsgUtil.ROOM_CREATE_FAIL, MsgUtil.CREATE_CANVAS_FAIL_MSG);

    private int status;
    private String msg;

    public int getStatus() {
        return status;
    }

    public String getMsg() {
        return msg;
    }

    private MsgCode(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }
}
