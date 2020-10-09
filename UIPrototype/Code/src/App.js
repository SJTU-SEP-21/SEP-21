import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import $ from 'jquery';
import turtle from './img/turtle.png';
import { Layout, Menu, Breadcrumb ,Col,Row,Button} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,SearchOutlined,DesktopOutlined,MessageOutlined } from '@ant-design/icons';
import font from "./img/font.png"
import  whale from "./img/whale.png"
import back from "./img/back.jpg"
import sider from "./img/sider.png"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function App() {
  $(document).ready(function(){
    var cmdlines = new Array();
    var startindex = 0;
    var cmdindex = 0;

    var execute = document.getElementById("execute");

    var c = document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var xrange = 800.0/2;
    var yrange = 400.0/2;
    var imgdw = 30.0;
    var imgdh = 20.0;

    var angle = 180.0;
    var x = xrange;
    var y = yrange;
    var isUp = 0;

    var img = new Image(imgdw,imgdh);
    img.onload = function () {
      ctx.drawImage(img,x-imgdw/2,y-imgdh/2,imgdw,imgdh);
    }
    img.src = turtle;

    $(document).keyup(function(event){
      if(event.keyCode ==13){

        $("ul").append("<li>"+$("#in").val()+"</li>"); //将输入的输出到界面
        // $("ul").append("<li>"+msg+"</li>"); //获取返回值并输出
        cmdlines[cmdindex] = document.getElementById("in").value;
        cmdindex++;

        $("#in").val(""); //清空输入框
        $("#text").scrollTop($("#text").scrollTop()+32);//滚动条拉到最下面，显示出输入框

      }
    });

    $("#execute").bind("click",function(){
      var i = 0;
      for (i = startindex;i < cmdindex;i++) {
        var cmd = cmdlines[i].split(' ');

        switch(cmd[0]) {
          case "FD":
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();

            ctx.moveTo(x,y);
            x = x + parseFloat(cmd[1])*Math.cos(angle/180*Math.PI);
            y = y - parseFloat(cmd[1])*Math.sin(angle/180*Math.PI);
            if (isUp == 0) {
              ctx.lineTo(x,y);
              ctx.stroke();
            }

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.drawImage(img,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
            break;

          case "BK":
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();

            ctx.moveTo(x,y);
            x = x - parseFloat(cmd[1])*Math.cos(angle/180*Math.PI);
            y = y + parseFloat(cmd[1])*Math.sin(angle/180*Math.PI);
            if (isUp == 0) {
              ctx.lineTo(x,y);
              ctx.stroke();
            }

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.drawImage(img,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
            break;

          case "RT":
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();

            angle = angle - parseFloat(cmd[1]);

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.drawImage(img,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
            break;

          case "LT":
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();

            angle = angle + parseFloat(cmd[1]);

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.drawImage(img,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
            break;

          case "CLEAN":
            x = xrange;
            y = yrange;
            angle = 180.0
            c.height = c.height;
            ctx.drawImage(img,x-imgdw/2,y-imgdh/2,imgdw,imgdh);
            break;

          case "PU":
            isUp = 1;
            break;

          case "PD":
            isUp = 0;
            break;

          case "SETX":
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();

            x = xrange + parseFloat(cmd[1]);

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.drawImage(img,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
            break;

          case "SETY":
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();

            y = yrange - parseFloat(cmd[1]);

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.drawImage(img,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
            break;

          case "SETXY":
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();

            x = xrange + parseFloat(cmd[1]);
            y = yrange - parseFloat(cmd[2]);

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.drawImage(img,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
            break;

          case "SETH":
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();

            angle = 180 - parseFloat(cmd[1]);

            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.drawImage(img,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
            break;

          case "XCOR":
            var xcor = x - xrange;
            $("ul").append("<li>-> " + xcor + "</li>");
            break;

          case "YCOR":
            var ycor = yrange - y;
            $("ul").append("<li>-> " + ycor + "</li>");
            break;

          case "GETXY":
            var xcor = x - xrange;
            var ycor = yrange - y;
            $("ul").append("<li>-> " + xcor + " " + ycor + "</li>");
            break;

          case "HEADING":
            var heading = (180 - angle) % 360;
            $("ul").append("<li>-> " + heading + "°" + "</li>");
            break;

          default:
            $("ul").append("<li>-> syntax fault</li>");
        }

      }
      startindex = cmdindex;
    });

    // $("#in")[0].focus();
  });


  return (
      <Layout  >
        <Header className="header">
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
              <Col offset={1} span={2}>
                <Menu.Item key='1' className='Menu_item' icon={<SearchOutlined />}>
                  项目浏览
                </Menu.Item>
              </Col>
              <Col span={2}>
                <Menu.Item key='2' className='Menu_item' icon={<DesktopOutlined />}>
                  我的项目
                </Menu.Item>
              </Col>
              <Col span={1}>
                <Menu.Item key='3' className='Menu_item' icon={<MessageOutlined />}>
                  <a href='#'>Messages</a>
                </Menu.Item>
              </Col>
              <Col span={3} offset={5}>

              </Col>

            </Row>
          </Menu>
        </Header>
        <Layout>
          <Sider width={300} className="site-layout-background"

        >
            <Menu
                mode="inline"


                style={{ height: '100%', borderRight: 0,
                  backgroundImage: 'url(' + sider + ')',
                  backgroundRepeat: "no-repeat",
                  backgroundSize:"100% 100%"}}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="用户选项">
                <Menu.Item key="1">个人信息</Menu.Item>
                <Menu.Item key="2">修改密码</Menu.Item>
                <Menu.Item key="3">注销</Menu.Item>

              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="项目管理">
                <Menu.Item key="4">创建项目</Menu.Item>
                <Menu.Item key="5">管理项目</Menu.Item>
                <Menu.Item key="6">保存项目</Menu.Item>
                <Menu.Item key="7">发布项目</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="说明">
                <Menu.Item key="8">操作说明</Menu.Item>
                <Menu.Item key="9">编程语言简介</Menu.Item>
                <Menu.Item key="10">背景介绍</Menu.Item>

              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' ,
            background:"aliceblue"}}>
            <Breadcrumb style={{ margin: '16px 0' }}>

            </Breadcrumb>
            <Content
                className="site-layout-background"

                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 850,

                  backgroundImage:'url('+back+')' ,
                  backgroundRepeat:"no-repeat",
                  backgroundSize:"100% 100%"
                }
                  }
            >
              <Row>
              <Col offset={2} span={14}>
               <canvas id="myCanvas" width="800" height="400" className="canvas"></canvas>
              </Col>
              </Row>


                <Row >

              <div className="window">
                 <div className="title">
                  <Row>
                  <Col>
                   <span>PCLogo</span>
                  </Col>
                    <Col offset={18}>
                      <Button id="execute"  type='primary'
                              shape="round"
                              style={{ background: 'red' }}>
                        execute
                      </Button>
                    </Col>
                  </Row>
                 </div>
                 <div id="text">
                   <ul>
                     <li>Welcome...</li>
                   </ul>
                   <input type="text" name="" id='in'>
                   </input>
                 </div>
               </div>

                </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>


  );

}

export default App;
