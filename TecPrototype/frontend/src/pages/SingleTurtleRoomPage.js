import React from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import $ from 'jquery';
import turtle from '../img/turtle.png';
import { withRouter, Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb ,Col,Row,Button} from 'antd';
import {  StarTwoTone, BulbTwoTone,HighlightTwoTone} from '@ant-design/icons';
import font from "../img/font2.jpg"
import  whale from "../img/whale.png"
import back from "../img/back.jpg"
import sider from "../img/sider.png"
import * as STRService from "../services/SingleTurtleRoomService";
import MonacoEditor from 'react-monaco-editor';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class SingleTurtlePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            r_id: 0,
            user: {},
            data: null,
            code: "",
            cmdlines: "",
            cmdlength: 0,
            xrange: 800.0/2,
            yrange: 400.0/2,
            imgdw: 30.0,
            imgdh: 20.0,
            angle: 180.0,
            x: 800.0/2,
            y: 400.0/2,
            isUp: 0
        }
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }

    callback = (data) => {
        this.setState({ data: data })
    }

    onChangeHandle(value,e) {
        this.setState({
            code: value
        });
    }

    editorDidMountHandle(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
    }

    showFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);
            this.setState({code:text});
        };
        reader.readAsText(e.target.files[0])
    };

    onChange =(e) =>{
        this.setState({
            code : e
        })
    }

    componentWillMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({user: user});
        let r_id = this.props.match.params.id
        console.log(r_id)
        this.setState({ r_id: r_id })
    }


    componentDidMount() {

        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({user: user});

        var c = document.getElementById("myCanvas");
        var ctx=c.getContext("2d");

        var x = this.state.x;
        var y = this.state.y;
        var imgdw = this.state.imgdw;
        var imgdh = this.state.imgdh;

        var img = new Image(this.state.imgdw,this.state.imgdh);
        img.onload = function () {
            ctx.drawImage(img,x-imgdw/2,y-imgdh/2,imgdw,imgdh);
        }
        img.src = turtle;

        this.timerID = setInterval(
            () => this.getCmdFile(),
            100
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getCmdFile() {
        let json = {
            r_id: this.state.r_id,
            u_id: this.state.user.u_id,
        }
        STRService.getCmdFile(json, this.callback);
        console.log(this.state.data);

        if (this.state.data != null) {
            var cmdlines = this.state.data.cmdfile.split('\n');
            var cmdlength = cmdlines.length;
            var i = 0;
            if (cmdlines[0] != "error u_id") {
                this.setState({
                    cmdlines: cmdlines,
                    cmdlength: cmdlength
                });
                this.Interpreter();
            }
        }
    }

    OnClick = (e) => {

        var newLines = this.state.code;

        let json = {
            r_id: 1,
            u_id: this.state.user.u_id,
            newLines: newLines
        }

        STRService.writeNewLines(json, this.callback);

        this.setState({code: ""})
    }

    Interpreter() {
        var cmdlines = this.state.cmdlines;
        var cmdlength = this.state.cmdlength;
        var xrange = this.state.xrange;
        var yrange = this.state.yrange;
        var angle = this.state.angle;
        var x = this.state.x;
        var y = this.state.y;
        var isUp = this.state.isUp;
        var imgdw = this.state.imgdw;
        var imgdh = this.state.imgdh;

        var c = document.getElementById("myCanvas");
        var ctx=c.getContext("2d");

        var img = new Image(this.state.imgdw,this.state.imgdh);
        img.onload = function () {
            ctx.save();
            ctx.translate(x,y);
            ctx.rotate((180-angle)*Math.PI/180);
            ctx.drawImage(img,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
        }
        img.src = turtle;

        x = xrange;
        y = yrange;
        angle = 180.0
        c.height = c.height;
        ctx.drawImage(img,x-imgdw/2,y-imgdh/2,imgdw,imgdh);

        var i = 0;
        for (i = 0;i < cmdlength;i++) {
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
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "XCOR: " + xcor + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "YCOR":
                    var ycor = yrange - y;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "YCOR: " + ycor + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "GETXY":
                    var xcor = x - xrange;
                    var ycor = yrange - y;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "XCOR: " + xcor + " YCOR: " + ycor + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "HEADING":
                    var heading = (180 - angle) % 360;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "HEADING: " + heading + "°" + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "":
                    break;

                default:
                    if (cmd[0] == null) break;
                    if (cmd[0].charCodeAt() == 13) break;
                    var code = this.state.code;
                    var codelength = code.length;
                    if (code[codelength - 1].charCodeAt() != 13) code += String.fromCharCode(13);
                    code += "syntax fault!" + String.fromCharCode(13);
                    this.setState({code: code});
                    break;
            }

        }

        this.setState({
            xrange: xrange,
            yrange: yrange,
            angle: angle,
            x: x,
            y: y,
            isUp: isUp,
            imgdw: imgdw,
            imgdh: imgdh
        });
    }

    render() {
        return(
            <Layout  >

                <Header className="header" style={{background:"#cbebfa"}}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" style={{background:"#cbebfa"}}>
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
                                    <Link to={'/roomlist'}>
                                        退出房间
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

                        <Col span={12}>
                            <div  style={{
                                height:'500px',
                                width:'500px'
                            }}>
                                <div className="title">
                                    <Row>
                                        <Col >
                                            <input type="file" onChange={(e) => this.showFile(e)} />
                                        </Col>
                                        <Col offset={20}>
                                            <Button id="execute"  type='primary'
                                                    shape="round"
                                                    style={{ background: 'red' }}
                                                    onClick = {this.OnClick}>
                                                execute
                                            </Button>
                                        </Col>
                                    </Row>


                                </div>
                                <MonacoEditor id="in"
                                              language="cpp"
                                              onKeyDown={this.onKeyDown}
                                              value={this.state.code}

                                              onChange={this.onChange}
                                              editorDidMount={this.editorDidMount}
                                              theme={"vs-light"}>

                                </MonacoEditor>
                                <br/>
                                <div  style={{
                                    width:'500px',
                                    backgroundColor:'transparent'
                                }}>
                                    <div className={"title"}>终端输出</div>
                                    <ul id={"output"}>

                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col offset={2}>
                            <canvas id="myCanvas" width="800" height="400" className="canvas"></canvas>
                        </Col>
                    </Row>





                        <Row>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <Col offset={14}>
                            <div className={"window"}  >
                                <div className={"title"}>命令面板</div>
                                <div id={"text"} >
                                    <ul id={"output"}>
                                        {this.state.cmdlines}
                                    </ul>
                                </div>
                            </div>
                            </Col>
                        </Row>
                    </Content>
                </Layout>

            </Layout>


        )
    }
}
export default withRouter(SingleTurtlePage)
