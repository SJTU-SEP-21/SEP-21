import React from 'react'
import {Layout, Col, Card, Row, Button, Divider, message, Menu} from 'antd'
import { withRouter, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import "../css/form.css";
import draw1 from '../img/draw1.png'
import vip from '../img/vip.png'
import {
    BulbTwoTone,
    EditOutlined,
    EllipsisOutlined, HighlightTwoTone,
    SettingOutlined, StarTwoTone
} from '@ant-design/icons'
import whale from '../img/whale.png'
import back from "../img/back.png"
import sider from "../img/sider.png";
import Text from "antd/es/typography/Text";
import { Typography } from 'antd';
import turtle from "../img/turtle.png";
import font from "../img/font2.jpg";

const { Title } = Typography;

const { Header, Footer, Content } = Layout

class InitPage extends React.Component{
    render(){
        return(
         <div className={'content-initpage'}>
            <Layout style={{ background:"transparent"}}>
                <Header className="header"  style={{background:"transparent"}}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal"  style={{background:"transparent"}}>
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

                            <Col offset={16} span={1}>
                                <Menu.Item key='3' className='Menu_item'  >
                                    <Button type="primary" shape="round" size="large" href="/login" style={{background:"orange",fontSize:'20px'}}> 退出登录</Button>
                                </Menu.Item>
                            </Col>

                        </Row>
                    </Menu>
                </Header>

         <Content
                   style={{
                       margin: '24px 16px',
                       padding: 24,
                       minHeight: 500,
                   }} >
         <Row>
             <Col offset={5}>
                 <iframe width="550" height="315"
                     src="https://www.youtube.com/embed/8Av69QZM0mg">
                 </iframe>
             </Col>
             <Col>
                 <Row>
                     <Col push={6}>
                         <Title>PCLOGO 小海龟</Title>
                     </Col>
                 </Row>
                 <Row>
                     <Col push={2}>
                         <Title level={4}> PC Logo小海龟又称Logo小海龟，是一种计算机程序设计语言，内置</Title>
                         <Title level={4}> 一套海龟绘图系统，主要功能是辅助少儿学习编程语言。Logo通过向</Title>
                         <Title level={4}>海龟发送命令，能够直观地学习程序的运行过程</Title>
                     </Col>
                 </Row>

                 <br/>
                 <Row>
                     <Col push={5}>
                         <Link to={'/singledraw'}>
                                 <Button size={'large'} style={{background:"#5a8d0e"}}>
                                 <b>单人绘图</b>
                             </Button>
                         </Link>
                     </Col>

                     <Col push={10}>
                         <Link to={'/roomlist'}>
                             <Button  size={'large'} style={{background:"#5a8d0e"}}>
                                 <b>双人绘图</b>
                             </Button>
                         </Link>
                     </Col>

                 </Row>
             </Col>
          </Row>
         </Content>
         </Layout>
         </div>
        )
    }
}
export  default withRouter(InitPage)
