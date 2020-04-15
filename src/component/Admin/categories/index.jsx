import React, {useState, useEffect} from 'react';
import { Tree, Button, MessageBox, Loading} from 'element-react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesAction } from '../../../_actions/categorie.action';
import { Breadcrumb } from '../partials/breadcrumb';
import 'element-theme-default';

function Dashboard() {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(true);
    const dispatch = new useDispatch();
    const data = useSelector(state => state.categories.tree);
    const loading = useSelector(state => state.categories.loading);
    useEffect(() => {
        dispatch(categoriesAction.getTree());
    }, []);

    const options = {
        children: 'childrens',
        label: 'name'
    }

    const append = (store, data) => {
        MessageBox.prompt('Enter name category', '', {
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Confirm',
                inputPattern:/[A-Za-z]{3}/,
                inputErrorMessage: 'Please enter input name'
            }).then(({ value }) => {
                console.log(value)
                dispatch(categoriesAction.insert({name: value, parent: data.id}))
        });
    }
      
    const remove = (store, data) => {
        MessageBox.confirm('Are you want to delete record?', '', {
            type: 'warning',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm',
        }).then(() => {
            dispatch(categoriesAction.deleteItem(data))
        })
    }

    const renderContent = (nodeModel, data, store) => {
        return (
            <span>
                <span>
                <span>{data.name}</span>
                </span>
                <span style={{float: 'right', marginRight: '20px'}}>
                    {data.parent === 0 && <Button size="mini" type="success" onClick={ () => append(store, data) }><i className="icon-plus"></i></Button>}
                    {data.parent !== 0 && <Button size="mini" type="danger" onClick={ () => remove(store, data) }><i className="icon-trash"></i></Button>}
                </span>
            </span>);
    }

    return (
        <div>
            <Breadcrumb
                rName="Category"
                rSecon="List"
            />
            <div className="container-fluid">
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            {show && <div className="card">
                                <div className="card-header"><i className="icon-puzzle"></i> Category List
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
                                                <Tree
                                                    data={data}
                                                    options={options}
                                                    nodeKey="id"
                                                    defaultExpandAll={false}
                                                    expandOnClickNode={false}
                                                    renderContent={(...args)=>renderContent(...args)}
                                                    highlightCurrent={true}
                                                />
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

export default Dashboard;
