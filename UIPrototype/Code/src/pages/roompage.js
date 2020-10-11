import React from 'react';

import {Button, Col, Layout, Menu, Row,} from 'antd';

import RoomList from "../component/roomlist";
import turtle from "../img/turtle.png";
import font from "../img/font.png";
import {BulbTwoTone, HighlightTwoTone} from "@ant-design/icons";







const { Header,  Content } = Layout





class Roompage  extends React.Component{

    render() {

        return (

            <Layout>

                <Header style={{ margin: ' 0px', padding: ' 0px' }}>

                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" >
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
                                <Menu.Item key='1' className='Menu_item' icon={<HighlightTwoTone />} style={{ fontSize:'20px' }}>
                                    自由绘图
                                </Menu.Item>
                            </Col>
                            <Col  span={4}>
                                <Menu.Item key='2' className='Menu_item' icon={<BulbTwoTone />} style={ { fontSize:'20px' } }>
                                    教学关卡
                                </Menu.Item>
                            </Col>
                            <Col offset={6} span={1}>
                                <Menu.Item key='3' className='Menu_item'  >
                                    <Button type="primary" shape="round" size="large" style={{background:"orange",fontSize:'20px'}}> SIGN OUT</Button>
                                </Menu.Item>
                            </Col>

                        </Row>
                    </Menu>

                </Header>

                <Content>

                    <RoomList/>



                </Content>

                <br />

                <br />



            </Layout>

        )

    }





}

export default Roompage;