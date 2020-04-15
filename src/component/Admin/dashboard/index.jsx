import React, {useState, useEffect} from 'react';
import { Table, Loading, Tag } from 'element-react';
import 'element-theme-default';
import { BoxDashBoard } from '../partials/box_dashboard';
import { Breadcrumb } from '../partials/breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { postAction } from '../../../_actions/post.action';

function Dashboard() {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(true);
    const columns = [
        {
            type: 'index'
        },
        {
            label: "Name",
            prop: "name",
            // width: 180,
            sortable: true
        },
        {
            label: "Comment",
            prop: "comment",
            sortable: 'custom'
        }, 
        {
            label: "CATEGORY",
            prop: "name_category",
            render: function(data){
                return <Tag>{data.name_category}</Tag>
            }
        },
    ];

    const dispatch = new useDispatch();

    useEffect(() => {
        dispatch(postAction.getPostHost())
    }, []);

    const loading = useSelector(state => state.post.loading);
    const data = useSelector(state => state.post.hotList);

    const handleSort = (data) => {
        console.log('自定义');
        console.log(data.column);
        console.log(data.prop);
        console.log(data.order);
    }

  	return (
        <div>
            <Breadcrumb
                rName="Dashboard"
            />
            <div className="container-fluid">
                <div className="animated fadeIn">
                    <div className="row">
                        <BoxDashBoard 
                            rClass="bg-primary" 
                            rNumber="142"
                            rName="Member Register"
                            rIcon="icon-people" 
                        />
                        <BoxDashBoard 
                            rClass="bg-info" 
                            rNumber="42"
                            rName="Category Register"
                            rIcon="icon-basket-loaded" 
                        />
                        <BoxDashBoard 
                            rClass="bg-warning" 
                            rNumber="424"
                            rName="Article Register"
                            rIcon="icon-book-open" 
                        />
                        <BoxDashBoard 
                            rClass="bg-danger" 
                            rNumber="24"
                            rName="Product Register"
                            rIcon="icon-diamond" 
                        />
                        <div className="col-sm-12 col-md-12">
                            {show && <div className="card">
                                <div className="card-header"><i className="icon-book-open"></i>Post Top View
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
                                                    onSortChange={handleSort.bind(this)}
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
