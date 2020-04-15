import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'element-react';
import { Link } from "react-router-dom";
import 'element-theme-default';
import {userActions} from '../../../_actions/user';
import {config} from '../../../_constants/config';

function Header(){

    const dispatch = new useDispatch();

    const handelLogout = () => {
        dispatch(userActions.logout)
    }

  	return (
        <header className="app-header navbar">
            <button className="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link to={config.PATH_ADMIN} className="navbar-brand">
                <img className="navbar-brand-full" src="/dist/img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo" />
                <img className="navbar-brand-minimized" src="/dist/img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo" />
            </Link>
            <button className="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
                <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item d-md-down-none">
                    <a className="nav-link nav-250" href="#!">
                        <Dropdown menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item>You had a message new!</Dropdown.Item>
                                <Dropdown.Item>You had a message new!</Dropdown.Item>
                                <Dropdown.Item>You had a message new!</Dropdown.Item>
                                <Dropdown.Item>You had a message new!</Dropdown.Item>
                                <Dropdown.Item>You had a message new!</Dropdown.Item>
                            </Dropdown.Menu>
                            )}>
                            <span className="el-dropdown-link">
                                <i className="icon-bell"></i>
                                <span className="badge badge-pill badge-danger">5</span>
                            </span>
                        </Dropdown>
                    </a>
                </li>
                <li className="nav-item d-md-down-none">
                    <a className="nav-link" href="#!">
                        <i className="icon-location-pin"></i>
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#!">
                        <img className="img-avatar" src="/dist/img/avatars/6.jpg" alt="com" />
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <span className="nav-link">
                        <span onClick={handelLogout}>logout <i className="icon-arrow-right"></i> </span>
                    </span>
                </li>
            </ul>
        </header>
  	);
}

export default Header;