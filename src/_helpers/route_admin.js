import React from 'react';
import {config} from '../_constants/config';

import Dashboard from '../component/Admin/dashboard';
import Categories from '../component/Admin/categories';
import Backend from '../component/Admin/backend';
import BackendForm from '../component/Admin/backend/form';
import FrontendForm from '../component/Admin/frontend/form';
import Database from '../component/Admin/database';
import Frontend from '../component/Admin/frontend';
import Video from '../component/Admin/video';
import VideoForm from '../component/Admin/video/form';
import Gallery from '../component/Admin/gallery';
import English from '../component/Admin/english';
import Experience from '../component/Admin/experience';
import ExperienceForm from '../component/Admin/experience/form';
import About from '../component/Admin/about';
import Role from '../component/Admin/manager/role';
import Member from '../component/Admin/manager/member';
import General from '../component/Admin/setting/general';
import Network from '../component/Admin/setting/network';
import Other from '../component/Admin/setting/other';
import Contact from '../component/Admin/contact';

const routes = [
    { 
        path: config.PATH_ADMIN, 
        component: () => <Dashboard />, 
        exact: true 
    },{
        path: config.PATH_ADMIN + "categories",
        component: () => <Categories />
    },{
        path: config.PATH_ADMIN + "backend",
        component: () => <Backend />
    },{
        path: config.PATH_ADMIN + "backend-form",
        component: () => <BackendForm />
    },{
        path: config.PATH_ADMIN + "backend-edit/:id",
        component: () => <BackendForm />
    },{
        path: config.PATH_ADMIN + "database",
        component: () => <Database />
    },{
        path: config.PATH_ADMIN + "frontend",
        component: () => <Frontend />
    },
    {
        path: config.PATH_ADMIN + "frontend-form",
        component: () => <FrontendForm />
    },{
        path: config.PATH_ADMIN + "frontend-edit/:id",
        component: () => <FrontendForm />
    },{
        path: config.PATH_ADMIN + "video-tut",
        component: () => <Video />
    },
    {
        path: config.PATH_ADMIN + "video-form",
        component: () => <VideoForm />
    },{
        path: config.PATH_ADMIN + "video-edit/:id",
        component: () => <VideoForm />
    },{
        path: config.PATH_ADMIN + "gallery",
        component: () => <Gallery />
    },{
        path: config.PATH_ADMIN + "english",
        component: () => <English />
    },{
        path: config.PATH_ADMIN + "experience",
        component: () => <Experience />
    },{
        path: config.PATH_ADMIN + "experience-form",
        component: () => <ExperienceForm />
    },{
        path: config.PATH_ADMIN + "experience-edit/:id",
        component: () => <ExperienceForm />
    },{
        path: config.PATH_ADMIN + "about",
        component: () => <About />
    },{
        path: config.PATH_ADMIN + "manage/role",
        component: () => <Role />
    },{
        path: config.PATH_ADMIN + "manage/member",
        component: () => <Member />
    },{
        path: config.PATH_ADMIN + "setting/general",
        component: () => <General />
    },{
        path: config.PATH_ADMIN + "setting/network",
        component: () => <Network />
    },{
        path: config.PATH_ADMIN + "setting/other-data",
        component: () => <Other />
    },{
        path: config.PATH_ADMIN + "contact",
        component: () => <Contact />
    }
];

export default routes;
