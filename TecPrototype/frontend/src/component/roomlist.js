import React, { useContext, useState, useEffect, useRef } from 'react';

import { Table, Input,  Popconfirm, Form } from 'antd';

import Tooltip from "antd/es/tooltip";
import {withRouter} from "react-router-dom";



const EditableContext = React.createContext();



const EditableRow = ({ index, ...props }) => {

    const [form] = Form.useForm();

    return (

        <Form form={form} component={false}>

            <EditableContext.Provider value={form}>

                <tr {...props} />

            </EditableContext.Provider>

        </Form>

    );

};



const EditableCell = ({

                          title,

                          editable,

                          children,

                          dataIndex,

                          record,

                          handleSave,

                          ...restProps

                      }) => {

    const [editing, setEditing] = useState(false);

    const inputRef = useRef();

    const form = useContext(EditableContext);

    useEffect(() => {

        if (editing) {

            inputRef.current.focus();

        }

    }, [editing]);



    const toggleEdit = () => {

        setEditing(!editing);

        form.setFieldsValue({

            [dataIndex]: record[dataIndex],

        });

    };



    const save = async e => {

        try {

            const values = await form.validateFields();

            toggleEdit();

            handleSave({ ...record, ...values });

        } catch (errInfo) {

            console.log('Save failed:', errInfo);

        }

    };



    let childNode = children;



    if (editable) {

        childNode = editing ? (

            <Form.Item

                style={{

                    margin: 0,

                }}

                name={dataIndex}

                rules={[

                    {

                        required: true,

                        message: `${title} is required.`,

                    },

                ]}

            >

                <Input ref={inputRef} onPressEnter={save} onBlur={save} />

            </Form.Item>

        ) : (

            <div

                className="editable-cell-value-wrap"

                style={{

                    paddingRight: 24,

                }}

                onClick={toggleEdit}

            >

                {children}

            </div>

        );

    }



    return <td {...restProps}>{childNode}</td>;

};



class RoomList extends React.Component {

    constructor(props) {

        super(props);

        this.columns = [

            {

                title: '房间编号',

                dataIndex: 'r_id',

                width: '10%',

                editable: true,

                sorter: {

                    compare: (a, b) => a.r_id - b.r_id,

                    multiple: 2,

                },

            },

            {

                title: '房主id',

                dataIndex: 'u_id',

                width: '10%',

                editable: true,

                sorter: {

                    compare: (a, b) => a.u_id - b.u_id,

                    multiple: 1,

                },

            },

            {

                title: '房间名称',

                dataIndex: 'title',

                width: '10%',

                editable: true,

            },

            {

                title: '房间创建时间',

                dataIndex: 'bidding_ddl',

                width: '10%',

                editable: true,

            },



            {

                title: '房间描述',

                dataIndex: 'description',

                width: '30%',

                ellipsis: {

                    showTitle: false,

                },

                render: description => (

                    <Tooltip placement="topLeft" title={description}>

                        {description}

                    </Tooltip>

                ),

            },

            {

                title: '操作',

                dataIndex: 'operation',

                render: (text, record) =>

                    this.state.dataSource.length >= 1 ? (

                        <Popconfirm title="确定要加入房间吗?" >

                            <a>加入房间</a>

                        </Popconfirm>

                    ) : null,

            },

        ];

        this.state = {

            dataSource: [

                {

                    key: '0',

                    r_id: '1',

                    u_id: '555556',

                    title: '绘制公司logo',

                    bidding_ddl:'2018-09-10 00:00:00',

                    description: '为新上市的公司绘制一个美观的logo'
                },

                {

                    key: '1',

                    r_id: '2',

                    u_id: '555555',

                    title: '自由绘图',

                    bidding_ddl:'2018-09-10 00:00:00',


                    description: '闲来无聊，绘图娱乐',

                },
                {

                    key: '2',

                    r_id: '3',

                    u_id: '555557',

                    title: '自由绘图',

                    bidding_ddl:'2018-09-10 00:00:00',


                    description: '闲来无聊，绘图娱乐',

                },
                {

                    key: '3',

                    r_id: '4',

                    u_id: '555553',

                    title: '自由绘图',

                    bidding_ddl:'2018-09-10 00:00:00',


                    description: '闲来无聊，绘图娱乐',

                },

                {

                    key: '4',

                    r_id: '5',

                    u_id: '555551',

                    title: '自由绘图',

                    bidding_ddl:'2018-09-10 00:00:00',


                    description: '闲来无聊，绘图娱乐',

                },

                {

                    key: '5',

                    r_id: '6',

                    u_id: '555560',

                    title: '自由绘图',

                    bidding_ddl:'2018-09-10 00:00:00',


                    description: '闲来无聊，绘图娱乐',

                },


            ],

            count: 6,

            usersinfo: [],

            pagesize:20,

            pagenum:1,

        };

    }





    changePage=(current,pageSize)=>{

        this.setState({

            pagenum:current,pagesize:pageSize

        });



    }









    handleDelete = key => {

        const dataSource = [...this.state.dataSource];

        this.setState({

            dataSource: dataSource.filter(item => item.key !== key),

        });

    };







    render() {

        const { dataSource } = this.state;

        const components = {

            body: {

                row: EditableRow,

                cell: EditableCell,

            },

        };

        const columns = this.columns.map(col => {

            if (!col.editable) {

                return col;

            }



            return {

                ...col,

                onCell: record => ({

                    record,

                    editable: col.editable,

                    dataIndex: col.dataIndex,

                    title: col.title,

                }),

            };

        });

        return (

            <div>



                <Table

                    components={components}

                    rowClassName={() => 'editable-row'}

                    bordered

                    dataSource={dataSource}

                    columns={columns}

                    pagination={{

                        onChange: this.changePage,

                        current:this.state.pagenum,

                        pageSize:this.state.pagesize,

                        total:200

                    }}

                />

            </div>

        );

    }

}



export  default withRouter(RoomList);