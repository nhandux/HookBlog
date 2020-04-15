import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'element-react';
import 'element-theme-default';

import '../../public/admin/coreui/library_coreui.css';
import { userActions } from '../../_actions/user';
import {history} from '../../_helpers/history';
import {config} from '../../_constants/config';

function Login() {
	const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const loggingIn = useSelector(state => state.authentication.loggingIn);

    useEffect(() => {
        if(localStorage.getItem('user') !== null)
            history.push(config.PATH_ADMIN);
    })
    
    const dispatch = useDispatch();

    const {email, password} = inputs;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
     
    }

    const checkValidate = () => {
        let err = '';
        return new Promise((resolve, reject) => {
            if(email.trim() === '') 
                err = 'Please enter your email!'
            else if(password.trim() === '')
                err = 'Please enter your password!'
            else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(email)))
                err =  'Incorrect email format'

            if (err) reject(err);
            else resolve();
        });
    };

    const handleSubmit = (e) => {
        checkValidate()
            .then(() => {
                dispatch(userActions.login(inputs));
            })
            .catch(errors => {
                Message({
                    message: errors,
                    type: 'warning'
                });
            });
        e.preventDefault()
    }

  	return (
        <div className="app flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            <div className="card-group">
                                <div className="card p-4">
                                    <div className="card-body">
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                <i className="icon-user"></i>
                                                </span>
                                            </div>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                placeholder="Email" 
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="input-group mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                <i className="icon-lock"></i>
                                                </span>
                                            </div>
                                            <input 
                                                className="form-control" 
                                                type="password" 
                                                placeholder="Password" 
                                                name="password"
                                                value={password} 
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <button className="btn btn-primary px-4" type="submit">
                                                    {loggingIn && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>} &nbsp; 
                                                    Login
                                                </button>
                                            </div>
                                            <div className="col-6 text-right">
                                            <a href="#!">Forgot passwords?</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card text-white bg-primary py-5 d-md-down-none">
                                    <div className="card-body text-center">
                                        <div>
                                        <h2>Sign up</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <a href="#!" className="btn bg-white color-20a8d8">Register</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  	);
}

export default Login;