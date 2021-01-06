import React from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import $ from 'jquery';
import turtle from '../img/turtle.png';
import { withRouter, Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb ,Col,Row,Button} from 'antd';
import CanvasPage from "../pages/CanvasPage";
import {  StarTwoTone, BulbTwoTone,HighlightTwoTone} from '@ant-design/icons';
import font from "../img/font.png"
import  whale from "../img/whale.png"
import back from "../img/back.jpg"
import sider from "../img/sider.png"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Home extends React.Component{
    render() {
        return(
            <Layout  >
              <Header className="header"  style={{background:"#cbebfa"}}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal"  style={{background:"#cbebfa"}}>
                    <Row>
                        <Col offset={1} span={3}>

                            <img
                                alt='turtle'
                                className='logo'
                                src={turtle}
                                style={{ height: 45 }}
                            />
                            {/*<img*/}
                            {/*    alt='Font'*/}
                            {/*    className='logo'*/}
                            {/*    src={font}*/}
                            {/*    style={{ height: 45 }}*/}
                            {/*/>*/}

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
                                <Link to={'/roomlist'}>
                                双人绘图
                                </Link>
                            </Menu.Item>
                        </Col>
                        <Col offset={10} span={1}>
                            <Menu.Item key='3' className='Menu_item'  >
                                <Button type="primary" shape="round" size="large" href="/login" style={{background:"orange",fontSize:'20px'}}> 退出登录</Button>
                            </Menu.Item>
                        </Col>

                    </Row>
                </Menu>
              </Header>


                <Layout style={{ padding: '0 24px 24px' ,
                  background:"#ccffff"}}>
                  <Breadcrumb style={{ margin: '16px 0' }}>

                  </Breadcrumb>
                  <Content
                      className="site-layout-background"

                      style={{
                          padding: 24,
                          margin: 0,
                          minHeight: 850,
                          background: "#ccffff",
                          // backgroundImage:'url('+back+')' ,
                          //   backgroundRepeat:"no-repeat",
                          //   backgroundSize:"100% 100%"
                      }}
                  >
                      <CanvasPage/>
                  </Content>
                </Layout>

            </Layout>


        )
    }
}
export default withRouter(Home)
