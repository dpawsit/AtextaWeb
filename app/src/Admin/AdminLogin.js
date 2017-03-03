import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { authenticateAdmin } from '../actions/admin_actions';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { Alert, Well } from 'react-bootstrap';

const wellStyle = {maxWidth: 400, margin: '0 auto 10px'};

class AdminLogin extends Component {
  constructor(props){
    super(props)
    this.state = {
      username : '',
      usernameError : '',
      password : '',
      passwordError : '',
      invalidLogin : false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
  }

  handleUsername(e){
    this.setState({
      usernameError : '',
      username : e.target.value,
      invalidLogin : false
    })
  }

  handlePassword(e){
    this.setState({
      passwordError : '',
      password : e.target.value,
      invalidLogin : false
    })
  }

  handleLogin(e){
    e.preventDefault();
    if (this.state.username === '') {
      this.setState({
        usernameError : "Username is required"
      })
    } else if (this.state.password === '') {
      this.setState({
        passwordError : "Password is required"
      })
    } else {
      let loginInfo = {username : this.state.username, password : this.state.password};
      axios.post('/admin/adminLogin', {loginInfo : loginInfo})
      .then(result => {
        if (result.data.admin) {
          this.props.authenticateAdmin(result.data.id, result.data.token);
          browserHistory.replace('/admin');
        } else {
          this.setState({
            invalidLogin : true
          })
        }
      })
      .catch(error => {
        this.setState({
          invalidLogin : true
        })
      })
    }
  }

  render(){
    
    const alertInstance = (
      <Alert bsStyle="danger">
        <strong>Invlaid Login!</strong>
      </Alert>
      );
    
    const loginForm = (
      <form onSubmit={this.handleLogin}>
       <TextField hintText ="Username Field" floatingLabelText="Username" type="text" 
        onChange={this.handleUsername} value={this.state.username} errorText={this.state.usernameError}/><br/> 
       <TextField hintText="Password Field" floatingLabelText="Password" type="password" 
        onChange={this.handlePassword} value={this.state.password} errorText={this.state.passwordError}/><br/>
       <RaisedButton onTouchTap={this.handleLogin} label="Login" style={{margin : 12}}  type="submit"/><br/>
       <div>
       {this.state.invalidLogin ? alertInstance : ''}
       </div>
       </form>
    )

    return (
      <div className="well" style={wellStyle}>
      <MuiThemeProvider>
        {loginForm}
      </MuiThemeProvider>
      </div>
    )
  }
}

export default connect(null, {authenticateAdmin})(AdminLogin)