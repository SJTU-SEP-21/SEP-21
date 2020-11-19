import { postRequest } from '../utils/ajax'
import { message } from 'antd'
import { apiUrl } from '../constant'

export const writeCmdFile = (json, callback) => {
    const url = `${apiUrl}/writeCmdFile_PC`
    postRequest(url, json, callback)
}

export const getCmdFile = (json, callback) => {
    const url = `${apiUrl}/getCmdFile_PC`
    postRequest(url, json, callback)
}

export const writeNewlines = (json, callback) => {
    const url = `${apiUrl}/writeNewlines_PC`
    postRequest(url, json, callback)
}

export const getNewlines = (json, callback) => {
    const url = `${apiUrl}/getNewLines_PC`
    postRequest(url, json, callback)
}