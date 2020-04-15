import React from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'element-react';
import 'element-theme-default';

import {config} from '../../../_constants/config';
import {history} from '../../../_helpers/history';

const handelHistory = (path) => {
    history.push(config.PATH_ADMIN + path)
}

const Side = () => {
  	return (
        <div className="sidebar">
            <nav className="sidebar-nav">
                <Menu defaultActive="1" className="el-menu-vertical-demo" theme="dark" onSelect={handelHistory.bind(this)}>
                    <Menu.Item index=""><i className="icon icon-speedometer"></i> Dashboard</Menu.Item>
                    <Menu.Item index="categories"><i className="icon icon-puzzle"></i> Category</Menu.Item>
                    <Menu.Item index="backend"><i className="icon icon-screen-smartphone"></i> Backend</Menu.Item>
                    <Menu.Item index="frontend"><i className="icon icon-screen-desktop"></i> Frontend</Menu.Item>
                    <Menu.Item index="video-tut"><i className="icon icon-film"></i> Video Tut</Menu.Item>
                    <Menu.Item index="gallery"><i className="icon icon-picture"></i> Gallery</Menu.Item>
                    <Menu.Item index="english"><i className="icon icon-docs"></i> English</Menu.Item>
                    <Menu.Item index="experience"><i className="icon icon-briefcase"></i> Experience</Menu.Item>
                    <Menu.Item index="about"><i className="icon icon-support"></i>  About</Menu.Item>
                     <Menu.Item index="database"><i className="icon icon-layers"></i> Database</Menu.Item>
                    <Menu.SubMenu index="manage" title={<span><i className="el-icon-message"></i>Manager</span>}>
                        <Menu.Item index="manage/role"><i className="icon icon-puzzle"></i> Role</Menu.Item>
                        <Menu.Item index="manage/role"><i className="icon icon-puzzle"></i> Member</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu index="setting" title={<span><i className="icon icon-settings"></i>Setting</span>}>
                        <Menu.Item index="setting/general"><i className="icon icon-puzzle"></i> General</Menu.Item>
                        <Menu.Item index="setting/network"><i className="icon icon-puzzle"></i> Network</Menu.Item>
                        <Menu.Item index="setting/other-data"><i className="icon icon-puzzle"></i> Other Data</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item index="contact"><i className="icon icon-question"></i> Contact</Menu.Item>
                </Menu>
            </nav>
            <button className="sidebar-minimizer brand-minimizer" type="button"></button>
        </div>
  	);
}

export default Side;