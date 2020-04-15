import React, {useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams} from "react-router";
import { Input, Form, Switch, Button, Select, Message, Tag, MessageBox } from 'element-react';
import JoditEditor from "jodit-react";
import Lightbox from 'react-lightbox-component';
import 'element-theme-default';

import Files from 'react-files'
import { Breadcrumb } from '../partials/breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import {categoriesAction} from '../../../_actions/categorie.action';
import {postAction} from '../../../_actions/post.action';
import { config } from '../../../_constants/config';
import '../../../public/lib/components/lighbox.css';
import Loading from '../partials/loading';

function VideoForm() {

    const user = useSelector(state => state.authentication.user);
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(true);

    const dataForm = {
        name: '',
        link: '',
        comment: '',
        content: '',
        title: '',
        keyworks: '',
        description: '',
        status: 0,
        hot: 0,
        pin: 0,
        image: '',
        caption: '',
       category_id: 0,
       user_id: user.id
    }; 
    
    const [layzi, setLayzi] = useState(false);
    const { id } = useParams();
    const  [dynamicTags, setDynamicTags] = useState([])
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [frmDatas, setFrmDatas] = useState(dataForm);
    const [imgBase64, setImgBase64] = useState('');

    const  options = useSelector(state => state.categories.parent);
    const saving = useSelector(state => state.post.saving)
    const post = useSelector(state => state.post.info)
    
    const dispatch = new useDispatch();
    
    useEffect(() => {
        dispatch(categoriesAction.getCategoryByPost(config.CATEGORIES.TYPE_EXPERIECE));
        
        if(id) 
            dispatch(postAction.getInfo(id));
        else 
            setLayzi(true);
    }, [])

    useEffect(() =>{
        
        if(post) { 
            setFrmDatas(post);
            
            if(post.tags && post.tags !== '')
                setDynamicTags(post.tags.split(','));
            
            if(post.image && post.image !== '') 
                setImgBase64(config.PATH_IMAGE + post.image);

            setLayzi(true);
        }
    }, [post])

    const onFilesChange = files => {
        if (files && files.length > 0) {
            fileToBase64(files)
                .then(res => {
                    setImgBase64(res)
                })
                .catch(errors => {
                    Message({
                        message: errors,
                        type: 'warning'
                    });
                });
            if (files[0] && files[0].preview) {
                setImgBase64(files[0].preview.url)
            }
        }
    };

    const handleChange = (value, name) => {
        setFrmDatas(frmDatas => ({ ...frmDatas, [name]: value }))
    }
     
    const onFilesError = (error, file) => {
        Message({
            message: error.message,
            type: 'warning'
        });
    }

    const fileToBase64 = files => {
        return new Promise(resolve => {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                resolve(event.target.result);
            };
            reader.readAsDataURL(file);
        });
    };

    const handelDeleteImage = (nullable='image') => {
        setImgBase64('');
        setFrmDatas(frmDatas => ({ ...frmDatas, [nullable]: '' }))
    }

    const showChoseFile = () => (
        <Files
            className='files-dropzone'
            onChange={onFilesChange}
            onError={onFilesError}
            accepts={['image/png', '.pdf', 'audio/*']}
            maxFiles={1}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
        >
        <p>
            <i className="fa fa-file-image-o" />
        </p>
            Drop files here or click to upload
        </Files>
    )
    
    const showImage = () => (
        <div className="show-image">
            <i className="icon-close hand-close" onClick={() => handelDeleteImage()}></i>
            <Lightbox 
                images={[
                    {
                        src: imgBase64,
                        title: frmDatas.name !== '' ? frmDatas.name : 'Create Post In Website',
                        description: frmDatas.description !== '' ? frmDatas.description : 'Create Post In Website',
                    }
                ]}/>
        </div>
    )

    const forceUpdate = useState()[1].bind(null, {}) 

    const onKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleInputConfirm();
        }
    }

    const saveTagInput = useRef();

    const onChange = (value) => {
        setInputValue(value);
    }

    const handleClose = (index) => {
        dynamicTags.splice(index, 1);
        setDynamicTags(dynamicTags)
        forceUpdate();
    }
    
    useEffect(() => {
        if (inputVisible) {
            saveTagInput.current.focus();
        }
    }, [inputVisible]);

    const showInput = () => {
        setInputVisible(true);
    }
        
    const handleInputConfirm = () => {
        if (inputValue) {
            dynamicTags.push(inputValue)
            setDynamicTags(dynamicTags);
        }
        setInputVisible(false);
        setInputValue('');
        forceUpdate();
    }

    const checkValidate = () => {
        let err = '';
        return new Promise((resolve, reject) => {
            if(frmDatas.name.trim() === '') 
                err = 'Please enter name!'
            else if(frmDatas.link.trim() === '')
                err = 'Please enter your link!'
            else if(frmDatas.category_id === 0)
                err = 'Please enter your category!'

            if (err!== '') reject(err);
            else resolve();
        });
    };

    const handleSubmit = (e) => {
        checkValidate()
            .then(() => {
                if(imgBase64 !== '') 
                    frmDatas.image = imgBase64;

                frmDatas.tags = dynamicTags.toString();
                frmDatas.pin = frmDatas.pin ? 1 : 0; 
                frmDatas.hot = frmDatas.hot ? 1 : 0;
                frmDatas.status = frmDatas.status ? 1 : 0;
                if(id)
                    dispatch(postAction.update(id, frmDatas, 'experience')); 
                else 
                    dispatch(postAction.insert(frmDatas, 'experience'));
            })
            .catch(errors => {
                Message({
                    message: errors,
                    type: 'warning'
                });
            });
        e.preventDefault()
    }

    const handelDelete = () => {
        MessageBox.confirm('Are you want to delete item, sure?', '', {
            type: 'warning',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm'
        }).then(() => {
            dispatch(postAction.deleteItem(id, {}, 'experience'));
        })
    }

    return (
        <div>
            <Breadcrumb
                rName="Experience Form"
                rSecon="Form"
            />
            { layzi ? <div className="container-fluid">
                <div className="animated fadeIn">
                    <Form model={frmDatas} labelWidth="100" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-12 col-md-8">
                                {show && <div className="card">
                                    <div className="card-header"><i className="icon-chart"></i> Experience Form
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
                                                <Form.Item label="Name">
                                                    <Input  onChange={(e) => handleChange(e, 'name')} value={frmDatas.name} placeholder="Experience name"></Input>
                                                </Form.Item>
                                                <Form.Item label="Link">
                                                    <Input  onChange={(e) => handleChange(e, 'link')} value={frmDatas.link} placeholder="Experience link"></Input>
                                                </Form.Item>
                                                <Form.Item label="Status">
                                                    <Select name="category_id" placeholder="Choose Category" value={frmDatas.category_id} onChange={(e) => handleChange(e, 'category_id')}>
                                                        {
                                                            options.map(el => {
                                                                return <Select.Option key={el.id} label={el.name} value={el.id} />
                                                            })
                                                        }
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label="Comment">
                                                    <Input type="textarea" onChange={(e) => handleChange(e, 'comment')} value={frmDatas.comment} placeholder="Experience comment"></Input>
                                                </Form.Item>
                                                <Form.Item label="content">
                                                    <JoditEditor
                                                        value={frmDatas.content}
                                                        config={{
                                                            readonly: false,
                                                            enableDragAndDropFileToEditor: true,        
                                                            uploader: { 
                                                                url: "https://xdsoft.net/jodit/connector/index.php?action=fileUpload"
                                                            }
                                                        }}
                                                        tabIndex={1} 
                                                        onBlur={(e) => handleChange(e, 'content')}
                                                        onChange={(e) => {}}
                                                />
                                                </Form.Item>
                                                <div className="nh-seo"><label><strong>SEO</strong> - <i>No input is required, data is automatically retrieved if it is empty.</i></label></div>
                                                <Form.Item label="Title">
                                                    <Input onChange={(e) => handleChange(e, 'title')} value={frmDatas.title} placeholder="Title"></Input>
                                                </Form.Item>
                                                <Form.Item label="Keyworks">
                                                    <Input  onChange={(e) => handleChange(e, 'keyworks')} value={frmDatas.keyworks} placeholder="Keyworks"></Input>
                                                </Form.Item>
                                                <Form.Item label="Description">
                                                    <Input type="textarea" onChange={(e) => handleChange(e, 'description')} value={frmDatas.description} placeholder="Description"></Input>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            
                            <div className="col-sm-12 col-md-4">
                                {show && <div className="card">
                                    <div className="card-header"><i className="icon-chart"></i> Action
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
                                        <div className="card-body nh-custom-input">
                                            <Form.Item label="Author">
                                                {user.name && <a href="#!">{user.name}</a>}
                                            </Form.Item>
                                            <Form.Item label="Change Pin">
                                                <Switch
                                                    value={frmDatas.pin ? true : false}
                                                    onText=""
                                                    offText=""
                                                    onChange={(e) => handleChange(e, 'pin')}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Change Hot">
                                                <Switch
                                                    value={frmDatas.hot ? true : false}
                                                    onText=""
                                                    offText=""
                                                    onChange={(e) => handleChange(e, 'hot')}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Change Status">
                                                <Switch
                                                    value={frmDatas.status ? true : false}
                                                    onText=""
                                                    offText=""
                                                    onChange={(e) => handleChange(e, 'status')}
                                                />
                                            </Form.Item>
                                            <div className="top-20">
                                                <Button type="primary" nativeType="submit" icon={ saving ? 'loading' : 'upload' }>Save</Button>
                                                {id && <Button type="danger" nativeType="button" icon="delete" onClick={() => handelDelete()}>Delete</Button>}
                                                <Link to={config.PATH_ADMIN + "backend"} className="left-15">
                                                    <Button type="dark" icon="share">List</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                {show && <div className="card ">
                                    <div className="card-header"><i className="icon-chart"></i> Picture
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
                                        <div className="card-body padding-0">
                                            { imgBase64 !== '' ? showImage() : showChoseFile()}
                                            <div className="top-10">
                                                <Form.Item label="Caption">
                                                    <Input  onChange={(e) => handleChange(e, 'caption')} value={frmDatas.caption} placeholder="Note image"></Input>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>}
                                {show && <div className="card nhan-tag">
                                    <div className="card-header"><i className="icon-chart"></i> Tag
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
                                        <div className="card-body padding-bottom-10">
                                            <div>
                                                {
                                                    dynamicTags.map((tag, index) => {
                                                    return (
                                                        <Tag
                                                        key={Math.random()}
                                                        closable={true}
                                                        closeTransition={false}
                                                        onClose={handleClose.bind(this, index)}>{tag}</Tag>
                                                    )
                                                    })
                                                }
                                                {
                                                    inputVisible ? (
                                                    <Input
                                                        className="input-new-tag"
                                                        value={inputValue}
                                                        ref={saveTagInput}
                                                        size="mini"
                                                        onChange={onChange.bind(this)}
                                                        onKeyUp={onKeyUp.bind(this)}
                                                        onBlur={handleInputConfirm.bind(this)}
                                                    />
                                                    ) : <Button className="button-new-tag" size="small" onClick={showInput.bind(this)}>+ New Tag</Button>
                                                }
                                            </div>                 
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </Form>
                </div>
            </div> : <Loading/>}
        </div>
    )
}

export default VideoForm;