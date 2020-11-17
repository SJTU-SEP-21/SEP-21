import React from 'react';

import "../css/form.css";
import turtle from "../img/turtle.png";
import {Breadcrumb, Button, Col, Layout, Menu, Row} from "antd";
import $ from "jquery";
import CmdText from "../component/cmd";
import MonacoEditor from 'react-monaco-editor';

const defaultCode =
    `welcome to pc logo`;

class CanvasPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            cmdlines: null,
            code: defaultCode,
            startindex: 0,
            cmdindex: 0,
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
    }


    onChange =(e) =>{
         this.setState({
             code : e
         })
    }



    OnClick = (e) => {


        var tmp = this.state.code.split('\n');
        console.log(tmp[1]);


        var cmdlines = tmp;
        var cmdindex = tmp.length;
        var startindex = this.state.startindex;
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
        img.src = turtle;

        var i = 0;
        for (i = startindex;i < cmdindex;i++) {
            console.log(cmdlines[i]);
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

              default:

            }

        }
        startindex = cmdindex;

        this.setState({
            cmdlines: tmp,
            cmdindex: cmdindex,
            code:this.state.code,
            startindex: startindex,
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
        return (
            <div>
                <Row>

                    <Col>
            <div  style={{
                height:'400px',
                width:'600px'
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

            </div>
                    </Col>
                    <Col offset={16}>
                        <canvas id="myCanvas" width="800" height="400" className="canvas"></canvas>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CanvasPage;