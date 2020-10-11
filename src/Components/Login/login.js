import React from 'react';
import './login.css';
class Login extends React.Component{
    constructor(){
      super();
      this.state = {
        username:'',
        email: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e){
      this.setState({[e.target.name]: e.target.value});
    }
    
    handleSubmit(e){
      e.preventDefault();
      if(!this.state.username || !this.state.email){
        alert('Please fill all the input fields to continue!');
      }else{
        if(this.state.username==='principal' || this.state.username==='student'){
          let user = {username: this.state.username, email: this.state.email};
          window.localStorage.setItem('user', JSON.stringify(user));
          this.props.history.push('/');
        }else{
          alert('wrong credentials')
        }
      }
    }

    render(){
      return(
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-4 mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center">Sign In</h5>
                    <form className="form-signin">
                      <div className="form-label-group">
                        <input type="text" className="form-control" name='username' onChange={this.handleChange} placeholder="Username" required autoFocus/>
                      </div>
                      <div className="form-label-group">
                        <input type="email" className="form-control" name='email' onChange={this.handleChange} placeholder="Email address" required/>
                      </div>
                      <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.handleSubmit}>Sign in</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    }
}

export default Login;