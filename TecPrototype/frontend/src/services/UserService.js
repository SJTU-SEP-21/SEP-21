import { postRequest } from '../utils/ajax'
import { message } from 'antd'
import { history } from '../utils/history'
import { apiUrl } from '../constant'

export const login = (data) => {
    const url = `${apiUrl}/login`
    // debugger
    const callback = (data) => {
        // debugger
        if (data.status >= 0 && data.status != 500) {
            let user = data.data;
            localStorage.setItem('user', JSON.stringify(user));

            history.push('/');
            window.location = '/';
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