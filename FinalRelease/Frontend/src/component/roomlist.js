import React, { useContext, useState, useEffect, useRef } from 'react';

import {
    Menu,
    Layout,
    Row,
    Col,
    Pagination,
    Input,
    Card,
    Dropdown,
    Slider,
    InputNumber
} from 'antd'

import Tooltip from "antd/es/tooltip";
import {withRouter} from "react-router-dom";
import { DownOutlined } from '@ant-design/icons'
import { STR } from './STR'

import * as RoomSER from '../services/SingleTurtleRoomService'

class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            count: 6,
            usersinfo: [],
            pagesize:20,
            pagenum:1,
            roomlist: [],

        };
    }

    callback = (data) => {
        this.setState({ roomlist: [] })
        this.setState({ roomlist: data })
    }

    getRooms = () => {
        let sortby = this.state.dropdownkey == 1 ? 0 : 1
        let json = {
            pagenum: this.state.pagenum,
            pagesize: this.state.pagesize,
            sortby
        }
        RoomSER.getRooms(json, this.callback)
    }

    changePage = (current, pageSize) => {
        this.setState({
            pagenum: current,
            pagesize: pageSize,
            roomlist: []
        })
        let json = { pagenum: current, pagesize: pageSize }
        RoomSER.getRooms(json, this.callback)
    }

    componentDidMount() {
        this.getRooms()
    }

    renderList = () => {
        let result = []
        for (let i = 0; i < this.state.roomlist.length; i++) {
            result.push(<STR info={this.state.roomlist[i]} />)
        }
        return result
    }


    render() {
        return (
            <Layout>
                <Layout>
                    <br />
                    <Row justify='center'>
                        <Col offset={1} span={14}>
                            <Card>
                                {this.renderList()}
                                <br />
                                <Pagination
                                    showSizeChanger
                                    showQuickJumper
                                    total={500}
                                    current={this.state.pagenum}
                                    pageSize={this.state.pagesize}
                                    onChange={this.changePage}
                                    style={{ float: 'right' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Layout>
                <br />
                <br />
            </Layout>
        )
    }

}



export  default withRouter(RoomList);