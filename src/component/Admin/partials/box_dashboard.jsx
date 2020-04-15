import React from 'react';
import { Dropdown } from 'element-react';
import 'element-theme-default';

export function BoxDashBoard(state) {

    return (
            <div className="col-sm-6 col-lg-3">
                <div className={"card text-white " + state.rClass}>
                    <div className="card-body pb-0">
                        <div className="float-right el-dropdown">
                            <span className="el-dropdown-link custom-drop el-dropdown-selfdefine"  role="button" >
                                <Dropdown menu={(
                                    <Dropdown.Menu>
                                        <Dropdown.Item>List</Dropdown.Item>
                                        <Dropdown.Item>Create</Dropdown.Item>
                                    </Dropdown.Menu>
                                    )}>
                                    <span className="el-dropdown-link">
                                        <i className="icon-options-vertical text-white"></i>
                                    </span>
                                </Dropdown>
                            </span>
                        </div>
                        <div className="text-value"> {state.rNumber} </div>
                        <div> {state.rName}</div>
                    </div>
                    <div className="chart-wrapper mt-3 mx-3"><i className={state.rIcon}></i></div>
                </div>
            </div>
    );
}