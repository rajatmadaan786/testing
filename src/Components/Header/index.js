import React from 'react';
import { withRouter } from "react-router";

class Header extends React.Component{
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }
    logout(){
        window.localStorage.clear();
        this.props.history.push('/login');
    }
    render(){
        let username = JSON.parse(window.localStorage.getItem('user'));
        return(
            (username && username['username']==='student')?
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">Brand</a>
                        <span className='ml-auto'>Hello {username['username']}</span>
                        <button className="btn btn-secondary ml-3" onClick={this.logout}><i className='fa fa-sign-out'></i>Logout</button>
                    </div>
                </nav>
            :
            (username && username['username']==='principal')?
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">Brand</a>
                        <span className='ml-auto'>Hello {username['username']}</span>
                        <button className="btn btn-secondary ml-3" onClick={this.logout}><i className='fa fa-sign-out'></i>Logout</button>
                    </div>
                </nav>
            :
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">Brand</a>

                    <form className="form-inline my-2 my-lg-0 ml-auto">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        <button className="btn btn-outline-success ml-2" onClick={()=>this.props.history.push('/login')}>Login</button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default withRouter(Header);