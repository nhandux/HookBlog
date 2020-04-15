import React from 'react';

function NotFound() {
  	return (
            <div className="app">
                <div className="container">
                    <div className="justify-content-center row">
                        <div className="col-md-8 padding-top-40">
                            <div className="clearfix">
                                <h1 className="float-left display-3 mr-4">404</h1>
                                <h4 className="pt-3">Oops! You're lost.</h4>
                                <p className="text-muted float-left">The page you are looking for was not found.</p>
                            </div>
                            <div className="input-prepend input-group">
                                <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-search"></i></span></div>
                                <input size="16" placeholder="What are you looking for?" type="text" className="form-control"/>
                                <div className="input-group-append">
                                    <button className="btn btn-info">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  	);
}

export default NotFound;
