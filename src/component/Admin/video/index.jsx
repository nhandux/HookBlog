import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Input, Select, Button, Loading, Switch, Table, Pagination, Tag, Message, MessageBox } from 'element-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'element-theme-default';

import { config } from '../../../_constants/config';
import { Breadcrumb } from '../partials/breadcrumb';
import { categoriesAction } from '../../../_actions/categorie.action';
import { postAction } from '../../../_actions/post.action';

function Video() {

    const   [visible, setVisible] = useState(true);
    const   [show, setShow] = useState(true);
    const   loading = useSelector(state => state.post.loading);
    const   options = useSelector(state => state.categories.parent);
    const   curent = useSelector(state => state.post.curenPage)
    const   status = [{
                value: '',
                label: 'All Status'
            }, {
                value: 0,
                label: 'Active'
            }, {
                value: 1,
                label: 'Unactive'
            }];
    const [inputs, setInputs] = useState({
                id:  config.CATEGORIES.TYPE_VIDEO_TUT,
                keyworks: '',
                category: '',
                status: '',
                page: 1
            });

    const columns = [
        {
        type: 'selection'
        },
        {
            label: "NAME",
            prop: "name",
        },
        {
            label: "COMMENT",
            prop: "comment",
        },
        {
            label: "CATEGORY",
            prop: "name_category",
            width: '200px',
            render: function(data){
                return <Tag>{data.name_category}</Tag>
            }
        },
        {
            label: "STATUS",
            prop: "status",
            width: '100px',
            align: 'center',
            render: function(data){
                return  <div className="padding-top-10">
                            <Switch 
                                width={25}
                                onText=""
                                offText=""
                                value={data.status === 1 ? true : false}
                            />
                        </div>
            }
        },
        {
            label: "ACTION",
            width: '150px',
            align: 'center',
            prop: "id",
            render: function(data){
                return (
                    <span className="icon-not-text padding-top-6 text-center">
                        <Link to={config.PATH_ADMIN + 'video-edit/' + data.id} className="right-100">
                            <Button plain={true} type="info" size="small" icon="edit"></Button>
                        </Link>
                        <Button type="danger" size="small" icon="delete" onClick={() => onDeleteItem(data.id)}></Button>
                    </span>
                )
            }
        }
    ];

    const time = moment().format('YYYY-MM-DD  HH:mm');
    const data = useSelector(state => state.post.list);
    const totalPage = useSelector(state => state.post.totalPage);
    const [selection, setSelection] = useState([]);
    const dispatch = new useDispatch();

    useEffect(() => {
        dispatch(categoriesAction.getCategory(config.CATEGORIES.TYPE_VIDEO_TUT));
    }, [])
    
    useEffect(() => {
        dispatch(postAction.getList(inputs));
    }, [inputs])

       
    const onDeleteItem = id => {
        MessageBox.confirm('Are you want to delete recode, sure?', '', {
            type: 'warning',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm'
        }).then(() => {
            if(data.length === 1 && inputs.page !== 1) {
                inputs.page = inputs.page - 1
            }
            dispatch(postAction.deleteItem(id, inputs));
        })
    }

    const handleSort = (data) => {
        console.log('自定义');
        console.log(data.column);
        console.log(data.prop);
        console.log(data.order);
    }

    const handleChange = (value, name) => {
        setInputs(inputs => ({ ...inputs, [name]: value }))
    }

    const handleReload = () => {
        dispatch(postAction.getList(inputs))
    }

    const onPageChange = (page, record='page') => {
        setInputs(inputs => ({ ...inputs, [record]: page }))
    }

    const onSelectChange = selection => {
        let arr = [];
        selection.map((item) => (
            arr.push(item.id)
        ))
        setSelection(arr);
    } 

    const handleDeleteSelect = () => {
        if(selection.length > 0) {
            MessageBox.confirm('Are you want to delete item checked, sure?', '', {
                type: 'warning',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Confirm'
            }).then(() => {
                if(data.length <= selection.length && inputs.page !== 1) {
                    inputs.page = inputs.page - 1
                }
                dispatch(postAction.deleteChecked(selection, inputs));
            })
        } else {
            Message({
                message: 'Please chose item want to delete',
                type: 'warning'
            });
        }
    }

  	return (
        <div>
            <Breadcrumb
                rName="Frontend"
                rSecon="List"
            />
            <div className="container-fluid">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            {show && <div className="card">
                                <div className="card-header"><i className="icon-chart"></i> Search
                                    <div className="card-header-actions">
                                    <a className="card-header-action btn-minimize" href="#!" onClick={() => setVisible(!visible)}>
                                        <i className={!visible ? "icon-arrow-down" : "icon-arrow-up"}></i>
                                    </a>
                                    <a className="card-header-action btn-close" href="#!" onClick={() => setShow(!visible)}>
                                        <i className="icon-close"></i>
                                    </a>
                                    </div>
                                </div>
                                <div className={!visible ? "collapse" : "collapse show"} id="collapseExample">
                                    <div className="card-body">
                                        <div className="el-loading-demo">
                                            <div className="row">
                                                <div className="col-md-4 col-sm-4">
                                                    <Input placeholder="Keyworks" name="keyworks" onChange={(e) => handleChange(e, 'keyworks')}/>
                                                </div>
                                                <div className="col-md-4">
                                                    <Select name="category" placeholder="Category" onChange={(e) => handleChange(e, 'category')}>
                                                        {
                                                        options.map(el => {
                                                            return <Select.Option key={el.id} label={el.name} value={el.id} />
                                                        })
                                                        }
                                                    </Select>
                                                </div>
                                                <div className="col-md-4">
                                                    <Select name="status" placeholder="Status" onChange={(e) => handleChange(e, 'status')}>
                                                        {
                                                        status.map(el => {
                                                            return <Select.Option key={el.value} label={el.label} value={el.value} />
                                                        })
                                                        }
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="col-sm-12 col-md-12 bottom-20">
                            <Link to={config.PATH_ADMIN + 'video-form'} className="right-100">
                                <Button icon="plus" >Additional</Button>
                            </Link>
                            <Button icon="delete" onClick={handleDeleteSelect}>Delete Checkbox</Button>
                            <Button icon="date" onClick={handleReload}>Reload</Button>
                            <span className="time-reset" ><i className="icon-globe"></i> {time}</span>
                        </div>
                        <div className="col-sm-12 col-md-12 nhan-tag">
                            {show && <div className="card">
                                <div className="card-header"><i className="icon-book-open"></i> Backend List
                                    <div className="card-header-actions">
                                    <a className="card-header-action btn-minimize" href="#!" onClick={() => setVisible(!visible)}>
                                        <i className={!visible ? "icon-arrow-down" : "icon-arrow-up"}></i>
                                    </a>
                                    <a className="card-header-action btn-close" href="#!" onClick={() => setShow(!visible)}>
                                        <i className="icon-close"></i>
                                    </a>
                                    </div>
                                </div>
                                <div className={!visible ? "collapse" : "collapse show"} id="collapseExample">
                                    <div className="card-body">
                                        <div className="el-loading-demo">
                                            <Loading loading={loading}>
                                                <Table
                                                    style={{width: '100%'}}
                                                    columns={columns}
                                                    data={data}
                                                    border={true}
                                                    emptyText={config.emptyText}
                                                    onSortChange={handleSort.bind(this)}
                                                    onSelectChange={(selection) => onSelectChange(selection)}
                                                    onSelectAll={(selection) => onSelectChange(selection)}
                                                />
                                                <div className="dis-ib">
                                                    <Pagination layout="prev, pager, next" total={totalPage} currentPage={curent} pageSizes={[10, 20, 30, 40, 50, 100]} onCurrentChange={onPageChange}/>      
                                                </div>
                                            </Loading>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  	);
}

export default Video;
