import React from 'react';

import {Button, Col, Layout, Menu, Row, Modal, Space, Input} from 'antd';

import RoomList from "../component/roomlist";
import turtle from "../img/turtle.png";
import font from "../img/font2.jpg";
import {StarTwoTone,BulbTwoTone, HighlightTwoTone} from "@ant-design/icons";
import {Link} from "react-router-dom";
import "../css/form.css"


const { Header,  Content } = Layout


class Roompage  extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            roominfo: {},
            loading: false,
            visible: false,
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleOk = () => {
        // this.setState({ loading: true });
        // setTimeout(() => {
        //     this.setState({ loading: false, visible: false });
        // }, 3000);
        // var password = document.getElementById("password").value;
        // var r_id = this.state.roominfo.r_id;
        // var u_id = JSON.parse(localStorage.getItem('user')).u_id;
        //
        // let json = {
        //     r_id: r_id,
        //     u_id: u_id,
        //     password: password
        // }
        //
        // STRService.enterRoom(json);
    };
    render() {
        const { visible, loading } = this.state;
        return (

            <Layout>

                <Header className={"header"} style={{background:"#cbebfa"}}>
                {/*<Header className="header" style={styles.customHeader}>*/}

                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" style={{background:"#cbebfa"}}>
                        {/*before <Menu theme="dark" mode="horizontal" >*/}
                        <Row>
                            <Col offset={1} span={3}>

                                <img
                                    alt='turtle'
                                    className='logo'
                                    src={turtle}
                                    style={{ height: 45 }}
                                />
                                <img
                                    alt='Font'
                                    className='logo'
                                    src={font}
                                    style={{ height: 45 }}
                                />

                            </Col>
                            <Col  offset={2} span={2}>
                                <Menu.Item key='1' className='Menu_item' icon={<HighlightTwoTone />} style={{ fontSize:'20px' ,fontWeight:'900'
                                }}>
                                    <Link to={'/singledraw'}>
                                        单人绘图
                                    </Link>
                                </Menu.Item>
                            </Col>
                            <Col  span={4}>
                                <Menu.Item key='2' className='Menu_item' icon={<BulbTwoTone />} style={ { fontSize:'20px' ,fontWeight:'900'} }>
                                    <Link to={'/init'}>
                                        返回主界面
                                    </Link>
                                </Menu.Item>
                            </Col>
                                <Col   span={2}>
                                    <Menu.Item key='3' className='Menu_item'  style={ { fontSize:'20px' ,fontWeight:'900'} }>

                                    </Menu.Item>
                                </Col>
                            <Col offset={4} span={1}>
                                <Menu.Item key='4' className='Menu_item'  >
                                    <Button type="primary" shape="round" size="large" href="/login" style={{background:"orange",fontSize:'20px', margin: '10px'}}>退出登录</Button>
                                </Menu.Item>
                            </Col>

                        </Row>
                    </Menu>
                </Header>
                <Layout>
                    <Header style={{background:"transparent"}}>
                        <Col offset={22}>
                    <>
                        <Button type="primary" onClick={this.showModal}>
                            创建房间
                        </Button>
                        <Modal
                            title="创建房间"
                            visible={visible}



                            footer={[
                                <Button key="back" onClick={this.handleCancel}>
                                    返回
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                                    创建
                                </Button>,
                            ]}
                        >
                            <Space direction="vertical">

                                <Input id={"roomid"} placeholder="input roomid" />
                                <Input.Password id={"password"} placeholder="input password" />

                            </Space>
                        </Modal>
                    </>
                        </Col>
                    </Header>
                <Content>

                    <RoomList/>

                </Content>
                </Layout>
                <br />

                <br />



            </Layout>

        )

    }





}

export default Roompage;
