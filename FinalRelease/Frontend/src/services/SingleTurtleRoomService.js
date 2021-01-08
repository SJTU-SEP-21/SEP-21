import { postRequest } from '../utils/ajax'
import { message } from 'antd'
import { apiUrl } from '../constant'
import {history} from "../utils/history";

export const getRooms = (json, callback) => {
    const url = `${apiUrl}/getRooms_STR`
    postRequest(url, json, callback)
}

export const getCmdFile = (json, callback) => {
    const url = `${apiUrl}/getCmdFile_STR`
    postRequest(url, json, callback)
}

export const writeNewLines = (json, callback) => {
    const url = `${apiUrl}/writeNewLines_STR`
    postRequest(url, json, callback)
}

export const enterRoom = (data) => {
    const url = `${apiUrl}/enterRoom_STR`;
    const r_id = data.r_id;
    const callback = (data) => {
        // debugger
        if (data.status >= 0 && data.status != 500) {
            history.push('/singleturtle/' + r_id);
            window.location = '/singleturtle/' + r_id;
            message.success(data.msg);
        } else {
            if (data.msg) {
                message.error(data.msg);
            } else {
                message.error('网络连接出现问题了');
            }
        }
    }
    postRequest(url, data, callback)
}

export const createRoom = (data) => {
    const url = `${apiUrl}/createRoom_STR`;
    const callback = (data) => {
        // debugger
        if (data.status >= 0 && data.status != 500) {
            const r_id = data.r_id;
            history.push('/singleturtle/' + r_id);
            window.location = '/singleturtle/' + r_id;
            message.success(data.msg);
        } else {
            if (data.msg) {
                message.error(data.msg);
            } else {
                message.error('网络连接出现问题了');
            }
        }
    }
    postRequest(url, data, callback)
}