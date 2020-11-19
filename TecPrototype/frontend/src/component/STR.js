import React from 'react'
import { Card, Tag, Row, Button, Popconfirm, Col,Modal ,Space,Input} from 'antd'
import '../css/STR.css'
import { Link } from 'react-router-dom'
import * as STRService from "../services/SingleTurtleRoomService";

export class STR extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roominfo: {},
            loading: false,
            visible: false,
        }
    }

    handleDelete = (r_id) => {
        this.props.handleDelete(r_id)
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        // this.setState({ loading: true });
        // setTimeout(() => {
        //     this.setState({ loading: false, visible: false });
        // }, 3000);
        var password = document.getElementById("password").value;
        var r_id = this.state.roominfo.r_id;
        var u_id = JSON.parse(localStorage.getItem('user')).u_id;

        let json = {
            r_id: r_id,
            u_id: u_id,
            password: password
        }

        STRService.enterRoom(json);
    };
    componentDidMount() {
        this.setState({ roominfo: this.props.info})
    }

    render() {

        const { visible, loading } = this.state;
        return (
            <Card
                title={
                    <div>
                        <b>{this.state.roominfo.room_name}</b>
                    </div>
                }
                hoverable
                class='Task_Blower'
                extra={
                    <>
                        <Button type="primary" onClick={this.showModal}>
                           进入房间
                        </Button>
                        <Modal
                            title="进入房间"
                            visible={visible}



                            footer={[
                                <Button key="back" onClick={this.handleCancel}>
                                    返回
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                    进入
                                </Button>,
                            ]}
                        >
                            <Space direction="vertical">
                                <Input.Password id={"password"} placeholder="input password" />

                            </Space>
                        </Modal>
                      </>

                }
            >
            </Card>
        )
    }
}