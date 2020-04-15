import React from 'react';
import '../../public/admin/coreui/library_coreui.css';
import { Link } from "react-router-dom";

function Login() {
  	return (
        <div className="app flex-row align-items-center">
            <Link
                to="/login/"
                className="sidebar-toggle btn btn-primary"
                data-toggle="push-menu"
                role="Button"
            >Login</Link>   
             <Link
                to="/wp-admin/"
                className="sidebar-toggle btn btn-success"
                data-toggle="push-menu"
                role="Button">Admin</Link>
        </div>
  	);
}

export default Login;