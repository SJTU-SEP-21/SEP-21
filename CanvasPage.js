import React from 'react';

import "../css/form.css";
import turtle from "../img/turtle.png";
import {Breadcrumb, Button, Col, Layout, Menu, Row} from "antd";
import $ from "jquery";
import * as PCService from '../services/PersonalCanvasService';
import MonacoEditor from 'react-monaco-editor';

class CanvasPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            data: null,
            code: "",
            hascode: 0,
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
        console.log(data);
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
            //console.log(text);
            this.setState({code:text});
        };
        reader.readAsText(e.target.files[0])
    };

    componentDidMount() {

        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({user: user});
        // console.log('will: TaskList -> componentDidMount -> user', user)
        //
        // this.setState({ user }, this.getWorks(user.u_id))

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

    onChange =(e) =>{
        this.setState({
            code : e
        })
    }

    getCmdFile() {
        let json = {
            c_id: 1,
            u_id: 1,
        }
        PCService.getCmdFile(json, this.callback);

        if (this.state.data != null) {
            console.log(this.state.data.cmdfile);
            var cmdlines = this.state.data.cmdfile.split('\n');
            var cmdlength = cmdlines.length;
            var i = 0;
            if (cmdlines[0] != "error u_id") {
                this.setState({
                    cmdlines: cmdlines,
                    cmdlength: cmdlength
                });
                if (this.state.hascode == 0) {
                    this.setState({
                        code: this.state.data.cmdfile,
                        hascode: 1
                    })
                }
                this.Interpreter();
            }
        }
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
        var out=document.getElementById("output");

        for(var i=0,num=out.childNodes.length;i<num;i++)
        {
            if(out.childNodes[i]!=null)
            out.removeChild(out.childNodes[i]);
        }

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
                    console.log(code[codelength-1]);
                    if (code[codelength - 1].charCodeAt() != 13) code += String.fromCharCode(13);
                    var newli = document.createElement("li");
                    newli.innerHTML = '<li>' + "syntax fault !"  + '</li>';
                    document.getElementById("output").append(newli);

                    break;
            }

        }

        this.setState({
            newlines: [],
            newlinesindex: 0,
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

    OnClick = (e) => {

        var cmdfile = this.state.code;

        let json = {
            c_id: 1,
            u_id: 1,
            cmdFile: cmdfile
        }
        PCService.writeCmdFile(json, this.callback);
    }


    render() {
        return (
            <div>
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
                                <div className={"title"}>输出</div>
                                <ul id={"output"}>

                                </ul>
                            </div>

                        </div>
                    </Col>
                    <Col offset={2}>
                        <canvas id="myCanvas" width="800" height="400" className="canvas"></canvas>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CanvasPage;