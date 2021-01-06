import React from 'react'
import { Layout, Col, Card, Row, Button, Divider, message } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import "../css/form.css";
import draw1 from '../img/draw1.png'
import vip from '../img/vip.png'
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined
} from '@ant-design/icons'
import whale from '../img/whale.png'
import back from "../img/back.png"
import sider from "../img/sider.png";
const { Header, Footer, Content } = Layout

class InitPage extends React.Component{
    render(){
        return(
         <div className={'content-initpage'}>
            <Layout style={{ background:"transparent"}}>

         <Content
                   style={{
                       margin: '24px 16px',
                       padding: 24,
                       minHeight: 500,
                   }} >
          <Row>
              {/*<Col span={8} offset={2}>*/}
              {/*    <Card*/}
              {/*        bodyStyle={{*/}
              {/*            height:'400px'*/}
              {/*        }}*/}
              {/*        hoverable={true}*/}
              {/*        actions={[*/}
              {/*            <SettingOutlined key='setting' />,*/}
              {/*            <EditOutlined key='edit' />,*/}
              {/*            <EllipsisOutlined key='ellipsis' />*/}
              {/*        ]}*/}
              {/*        cover={*/}
              {/*            <div>*/}
              {/*                <div*/}
              {/*                    style={{*/}
              {/*                        background: '#0055bb',*/}
              {/*                        whiteSpace: 'pre-wrap'*/}
              {/*                    }}*/}
              {/*                >*/}
              {/*                    <span>{'            '}</span>*/}
              {/*                    <br />*/}
              {/*                    <span style={{ fontSize: '15px', color: 'white' }}>*/}
              {/*          {'    ' + '欢迎回来'}*/}
              {/*        </span>*/}
              {/*                    <br />*/}

              {/*                    <br />*/}

              {/*                    <b*/}
              {/*                        style={{*/}
              {/*                            color: 'white',*/}
              {/*                            fontSize: '12px',*/}
              {/*                            float: 'right',*/}
              {/*                            margin: '2px'*/}
              {/*                        }}*/}
              {/*                    >*/}
              {/*                        {'PCLogo     '}*/}
              {/*                    </b>*/}
              {/*                    <br />*/}
              {/*                    <p>{'            '}</p>*/}
              {/*                </div>*/}
              {/*                <Row justify='center'>*/}
              {/*                    <img*/}
              {/*                        src={vip}*/}
              {/*                        style={{*/}
              {/*                            width: 'auto',*/}
              {/*                            height: 'auto',*/}
              {/*                            maxWidth: '90%',*/}
              {/*                            maxHeight: '100%'*/}
              {/*                        }}*/}
              {/*                    />*/}
              {/*                </Row>*/}

              {/*                <Divider />*/}
              {/*                <div*/}
              {/*                    style={{*/}
              {/*                        whiteSpace: 'pre-wrap',*/}
              {/*                        margin: '5px'*/}
              {/*                    }}*/}
              {/*                >*/}
              {/*                    <b style={{ fontSize: '18px' }}>{'  ' + '个人信息'}</b>*/}
              {/*                    <a href='#' style={{ float: 'right' }}>*/}
              {/*                        View all →*/}
              {/*                    </a>*/}
              {/*                    <br />*/}
              {/*                    <br />*/}

              {/*                </div>*/}
              {/*            </div>*/}
              {/*        }*/}
              {/*    >*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}
              {/*        <br/>*/}

              {/*        <b*/}
              {/*            style={{*/}
              {/*                fontFamily: '华文行楷',*/}
              {/*                whiteSpace: 'pre-wrap'*/}
              {/*            }}*/}
              {/*        >*/}
              {/*            {'     大部分好的程序员编程不是为了钱或名望，而只是因为纯粹的乐趣。'}*/}
              {/*            <br />*/}
              {/*            <span style={{ float: 'right' }}>——Linus Torvalds</span>*/}
              {/*        </b>*/}
              {/*    </Card>*/}
              {/*</Col>*/}
              <Col offset={9} span={6}>
                  {/*<br/>*/}
                  {/*<br/>*/}
                  {/*<br/>*/}
                  {/*<br/>*/}
                  {/*<br/>*/}
                  {/*<br/>*/}
                  {/*<br/>*/}
                  {/*<br/>*/}


                  <Link to={'/singledraw'}>
                  <Card
                      width='80%'

                      bodyStyle={{
                          // backgroundImage:'url(' + whale + ')',
                          // backgroundRepeat: "no-repeat",
                          // backgroundSize:"100% 100%",
                          height:'200px',

                          backgroundColor:'#CCFFFF',

                      }}

                      hoverable={true}
                  >
                      <Row justify='center'>

                      </Row>
                      <br />

                      <br />

                      <Row justify='center'>
                          <Link to={'/singledraw'}>
                              <Button type='primary' shape={'round'} ghost={true} size={'large'}>
                                  <b>单人绘图</b>
                              </Button>
                          </Link>

                      </Row>
                  </Card>
                  </Link>
                  <br/>
                  <Link to={'/roomlist'}>
                  <Card
                      width='80%'

                      bodyStyle={{
                          // backgroundImage:'url(' + draw1 + ')',
                          // backgroundRepeat: "no-repeat",
                          // backgroundSize:"100% 100%",
                          height:'200px',
                          //backgroundColor:'#CCFFFF',
                          backgroundColor:'#CCFFFF'


                      }}

                      hoverable={true}
                  >
                      <Row justify='center'>

                      </Row>
                      <br />

                      <br />

                      <Row justify='center'>
                          <Link to={'/roomlist'}>
                           <Button type='primary' shape={'round'} ghost={true} size={'large'} style={{outline:'none'}}>
                              <b>双人绘图</b>
                          </Button>
                          </Link>
                      </Row>
                  </Card>
                  </Link>
              </Col>

          </Row>
         </Content>
         </Layout>
         </div>
        )
    }
}
export  default withRouter(InitPage)
