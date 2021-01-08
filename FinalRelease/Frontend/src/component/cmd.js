import React from 'react';

import MonacoEditor from 'react-monaco-editor';

const defaultCode =
    `welcome to pc logo`;



class CmdText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: defaultCode,
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
    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: "line",
            automaticLayout: false,
        };
        return (
            <div>
                <div>
                    <input type="file" onChange={(e) => this.showFile(e)} />

                    <button onClick={this.savefile} type="button">
                        save
                    </button>
                    <button onClick={this.runfile} type="button">
                        run
                    </button>
                    <button onClick={this.debugfile} type="button">
                        debug
                    </button>
                </div>
                <MonacoEditor
                    height="850"
                    width="600"
                    language="cpp"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                    theme={"vs-light"}
                />
            </div>
        );
    }
}

export default CmdText