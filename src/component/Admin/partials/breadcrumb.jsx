import React from 'react';
import { Link } from "react-router-dom";
import {config} from '../../../_constants/config';

export function Breadcrumb (state) {
    return (
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to={config.PATH_ADMIN}>Admin</Link>
            </li>
            <li className="breadcrumb-item active">{state.rName}</li>

            { state.rSecon && 
                <li className="breadcrumb-item active">
                    {state.rSecon}
                </li>
            }
            
            <li className="breadcrumb-menu d-md-down-none">
                <div className="btn-group" role="group" aria-label="Button group">
                    <a className="btn" href="#!">
                        <i className="icon-speech"></i>
                    </a>
                    <Link to={config.PATH_ADMIN} className="btn">
                        <i className="icon-graph"></i>  Dashboard
                    </Link>
                    <Link to={config.PATH_ADMIN + 'setting/general'} className="btn">
                        <i className="icon-settings"></i>  Settings
                    </Link>
                </div>
            </li>
        </ol>
    )
}