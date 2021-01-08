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
import * as DTRService from "../services/DoubleTurtleRoomService";
import MonacoEditor from 'react-monaco-editor';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class DoubleTurtlePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            r_id: 0,
            user: {},
            data: null,
            code: "",
            hascode: 0,
            cmdlines_1: "",
            cmdlength_1: 0,
            cmdlines_2: "",
            cmdlength_2: 0,
            xrange: 800.0/2,
            yrange: 400.0/2,
            x1_init: 800.0/4,
            y1_init: 400.0/2,
            x2_init: 800.0-800.0/4,
            y2_init: 400.0/2,
            imgdw: 30.0,
            imgdh: 20.0,
            angle1: 180.0,
            angle2: 180.0,
            x1: 800.0/4,
            x2: 800.0-800.0/4,
            y1: 400.0/2,
            y2: 400.0/2,
            isUp1: 0,
            isUp2: 0
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

        var img1 = new Image(this.state.imgdw,this.state.imgdh);
        img1.onload = function () {
            ctx.drawImage(img1,x-imgdw/2,y-imgdh/2,imgdw,imgdh);
        }
        img1.src = turtle;

        var img2 = new Image(this.state.imgdw,this.state.imgdh);
        img2.onload = function () {
            ctx.drawImage(img2,x-imgdw/2,y-imgdh/2,imgdw,imgdh);
        }
        img2.src = turtle;

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
            r_id: 1,
            u_id: this.state.user.u_id,
        }
        DTRService.getCmdFile(json, this.callback);
        console.log(this.state.data);

        if (this.state.data != null) {
            if (this.state.data.cmdfile1 != "") {
                var cmdlines_1 = this.state.data.cmdfile_1.split('\n');
                var cmdlength_1 = cmdlines_1.length;
            }
            if (this.state.data.cmdfile1 != "") {
                var cmdlines_2 = this.state.data.cmdfile_2.split('\n');
                var cmdlength_2 = cmdlines_2.length;
            }
            if (cmdlines_1[0] != "error u_id") {
                this.setState({
                    cmdlines_1: cmdlines_1,
                    cmdlength_1: cmdlength_1,
                    cmdlines_2: cmdlines_2,
                    cmdlength_2: cmdlength_2
                });
                if (this.state.hascode == 0) {
                    if (this.state.data.u1_id == this.state.user.u_id) {
                        this.setState({
                            code: this.state.data.cmdfile_1,
                            hascode: 1
                        })
                    }
                    if (this.state.data.u2_id == this.state.user.u_id) {
                        this.setState({
                            code: this.state.data.cmdfile_2,
                            hascode: 1
                        })
                    }
                }
                // this.reset();
                this.Interpreter();
            }
        }
    }

    OnClick = (e) => {

        var cmdFile = this.state.code;

        let json = {
            r_id: 1,
            u_id: this.state.user.u_id,
            cmdFile: cmdFile
        }

        DTRService.writeCmdLines(json, this.callback);
    }

    // reset() {
    //
    //     var c = document.getElementById("myCanvas");
    //     var ctx=c.getContext("2d");
    //
    //     c.height = c.height;
    //     ctx.drawImage(img,x-imgdw/2,y-imgdh/2,imgdw,imgdh);
    //     ctx.drawImage(img,x-imgdw/2,y-imgdh/2,imgdw,imgdh);
    //
    // }

    Interpreter() {
        var cmdlines_1 = this.state.cmdlines_1;
        var cmdlength_1 = this.state.cmdlength_1;
        var xrange = this.state.xrange;
        var yrange = this.state.yrange;
        var angle_1 = this.state.angle_1;
        var x_1 = this.state.x_1;
        var y_1 = this.state.y_1;
        var isUp_1 = this.state.isUp_1;
        var imgdw = this.state.imgdw;
        var imgdh = this.state.imgdh;

        var cmdlines_2 = this.state.cmdlines_2;
        var cmdlength_2 = this.state.cmdlength_2;
        var angle_2 = this.state.angle_2;
        var x_2 = this.state.x_2;
        var y_2 = this.state.y_2;
        var isUp_2 = this.state.isUp_2;

        var c = document.getElementById("myCanvas");
        var ctx=c.getContext("2d");

        var img_1 = new Image(this.state.imgdw,this.state.imgdh);
        img_1.onload = function () {
            ctx.save();
            ctx.translate(x_1,y_1);
            ctx.rotate((180-angle_1)*Math.PI/180);
            ctx.drawImage(img_1,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
        }
        img_1.src = turtle;

        var img_2 = new Image(this.state.imgdw,this.state.imgdh);
        img_1.onload = function () {
            ctx.save();
            ctx.translate(x_2,y_2);
            ctx.rotate((180-angle_2)*Math.PI/180);
            ctx.drawImage(img_2,-imgdw/2,-imgdh/2,imgdw,imgdh);
            ctx.restore();
        }
        img_2.src = turtle;

        x_1 = xrange;
        y_1 = yrange;
        angle_1 = 180.0
        x_2 = xrange;
        y_2 = yrange;
        angle_2 = 180.0
        c.height = c.height;
        ctx.drawImage(img_1,x_1-imgdw/2,y_1-imgdh/2,imgdw,imgdh);
        ctx.drawImage(img_2,x_2-imgdw/2,y_2-imgdh/2,imgdw,imgdh);

        var i = 0;
        for (i = 0;i < cmdlength_1;i++) {
            var cmd = cmdlines_1[i].split(' ');
            switch(cmd[0]) {
                case "FD":
                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    ctx.moveTo(x_1,y_1);
                    x_1 = x_1 + parseFloat(cmd[1])*Math.cos(angle_1/180*Math.PI);
                    y_1 = y_1 - parseFloat(cmd[1])*Math.sin(angle_1/180*Math.PI);
                    if (isUp_1 == 0) {
                        ctx.lineTo(x_1,y_1);
                        ctx.stroke();
                    }

                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.drawImage(img_1,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "BK":
                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    ctx.moveTo(x_1,y_1);
                    x_1 = x_1 - parseFloat(cmd[1])*Math.cos(angle_1/180*Math.PI);
                    y_1 = y_1 + parseFloat(cmd[1])*Math.sin(angle_1/180*Math.PI);
                    if (isUp_1 == 0) {
                        ctx.lineTo(x_1,y_1);
                        ctx.stroke();
                    }

                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.drawImage(img_1,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "RT":
                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    angle_1 = angle_1 - parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.drawImage(img_1,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "LT":
                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    angle_1 = angle_1 + parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.drawImage(img_1,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "CLEAN":
                    x_1 = xrange;
                    y_1 = yrange;
                    angle_1 = 180.0
                    c.height = c.height;
                    ctx.drawImage(img_1,x_1-imgdw/2,y_1-imgdh/2,imgdw,imgdh);
                    break;

                case "PU":
                    isUp_1 = 1;
                    break;

                case "PD":
                    isUp_1 = 0;
                    break;

                case "SETX":
                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    x_1 = xrange + parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.drawImage(img_1,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "SETY":
                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    y_1 = yrange - parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.drawImage(img_1,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "SETXY":
                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    x_1 = xrange + parseFloat(cmd[1]);
                    y_1 = yrange - parseFloat(cmd[2]);

                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.drawImage(img_1,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "SETH":
                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    angle_1 = 180 - parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_1,y_1);
                    ctx.rotate((180-angle_1)*Math.PI/180);
                    ctx.drawImage(img_1,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "XCOR":
                    var xcor = x_1 - xrange;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "XCOR: " + xcor + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "YCOR":
                    var ycor = yrange - y_1;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "YCOR: " + ycor + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "GETXY":
                    var xcor = x_1 - xrange;
                    var ycor = yrange - y_1;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "XCOR: " + xcor + " YCOR: " + ycor + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "HEADING":
                    var heading = (180 - angle_1) % 360;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "HEADING: " + heading + "°" + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "":
                    break;

                default:
                    // if (cmd[0] == null) break;
                    // if (cmd[0].charCodeAt() == 13) break;
                    // var code = this.state.code;
                    // var codelength = code.length;
                    // if (code[codelength - 1].charCodeAt() != 13) code += String.fromCharCode(13);
                    // code += "syntax fault!" + String.fromCharCode(13);
                    // this.setState({code: code});
                    // break;
            }
        }

        i = 0;
        for (i = 0;i < cmdlength_2;i++) {
            var cmd = cmdlines_2[i].split(' ');
            switch(cmd[0]) {
                case "FD":
                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    ctx.moveTo(x_2,y_2);
                    x_2 = x_2 + parseFloat(cmd[1])*Math.cos(angle_2/180*Math.PI);
                    y_2 = y_2 - parseFloat(cmd[1])*Math.sin(angle_2/180*Math.PI);
                    if (isUp_2 == 0) {
                        ctx.lineTo(x_2,y_2);
                        ctx.stroke();
                    }

                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.drawImage(img_2,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "BK":
                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    ctx.moveTo(x_2,y_2);
                    x_2 = x_2 - parseFloat(cmd[1])*Math.cos(angle_2/180*Math.PI);
                    y_2 = y_2 + parseFloat(cmd[1])*Math.sin(angle_2/180*Math.PI);
                    if (isUp_2 == 0) {
                        ctx.lineTo(x_2,y_2);
                        ctx.stroke();
                    }

                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.drawImage(img_2,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "RT":
                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    angle_2 = angle_2 - parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.drawImage(img_2,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "LT":
                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    angle_2 = angle_2 + parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.drawImage(img_2,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "CLEAN":
                    x_2 = xrange;
                    y_2 = yrange;
                    angle_2 = 180.0
                    c.height = c.height;
                    ctx.drawImage(img_2,x_2-imgdw/2,y_2-imgdh/2,imgdw,imgdh);
                    break;

                case "PU":
                    isUp_2 = 1;
                    break;

                case "PD":
                    isUp_2 = 0;
                    break;

                case "SETX":
                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    x_2 = xrange + parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.drawImage(img_2,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "SETY":
                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    y_2 = yrange - parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.drawImage(img_2,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "SETXY":
                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    x_2 = xrange + parseFloat(cmd[1]);
                    y_2 = yrange - parseFloat(cmd[2]);

                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.drawImage(img_2,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "SETH":
                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.clearRect(-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();

                    angle_2 = 180 - parseFloat(cmd[1]);

                    ctx.save();
                    ctx.translate(x_2,y_2);
                    ctx.rotate((180-angle_2)*Math.PI/180);
                    ctx.drawImage(img_2,-imgdw/2,-imgdh/2,imgdw,imgdh);
                    ctx.restore();
                    break;

                case "XCOR":
                    var xcor = x_2 - xrange;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "XCOR: " + xcor + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "YCOR":
                    var ycor = yrange - y_2;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "YCOR: " + ycor + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "GETXY":
                    var xcor = x_2 - xrange;
                    var ycor = yrange - y_2;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "XCOR: " + xcor + " YCOR: " + ycor + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "HEADING":
                    var heading = (180 - angle_2) % 360;
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "HEADING: " + heading + "°" + '</li>';
                    document.getElementById("output").append(newli);
                    break;

                case "":
                    break;

                default:
                    // if (cmd[0] == null) break;
                    // if (cmd[0].charCodeAt() == 13) break;
                    // var code = this.state.code;
                    // var codelength = code.length;
                    // if (code[codelength - 1].charCodeAt() != 13) code += String.fromCharCode(13);
                    // code += "syntax fault!" + String.fromCharCode(13);
                    // this.setState({code: code});
                    // break;

            }
        }

        this.setState({
            xrange: xrange,
            yrange: yrange,
            angle_1: angle_1,
            x_1: x_1,
            y_1: y_1,
            isUp_1: isUp_1,
            angle_2: angle_2,
            x_2: x_2,
            y_2: y_2,
            isUp_2: isUp_2,
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
export default withRouter(DoubleTurtlePage)
