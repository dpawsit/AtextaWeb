import React, { Component } from 'react';
import axios from 'axios'

const styles = {
    divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
    option: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  }

}

class AdminControls extends Component {
  constructor(props){
    super(props)
    this.state ={
      currentPassword : '',
      newPassword : '',
      confirmPassword : '',
      showAlert : false,
      alertMessage : '',
      adminUsername: '',
      adminPassword: '',
      adminConfirmPassword: ''
    }
    this.handleAdminConfirmPassword = this.handleAdminConfirmPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleAdminConfirmPassword = this.handleAdminConfirmPassword.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleAdminPassword = this.handleAdminPassword.bind(this);
    this.handleAdminConfirmPassword = this.handleAdminConfirmPassword.bind(this);
    this.handleAdminUsername = this.handleAdminUsername.bind(this);
  }

  handleCurrentPassword(e){
    this.setState({
      currentPassword : e.target.value,
      showAlert : false,
      alertMessage : ''
    })
  }

  handleNewPassword(e){
    this.setState({
      newPassword : e.target.value,
      showAlert : false,
      alertMessage : ''
    })
  }

    handleConfirmPassword(e){
    this.setState({
      confirmPassword : e.target.value,
      showAlert : false,
      alertMessage : ''
    })
  }

    handleAlert(message){
    this.setState({
      showAlert : true,
      alertMessage : message
    })
  }

    handleAdminPassword(e){
    this.setState({
      adminPassword : e.target.value,
      showAlert : false,
      alertMessage : ''
    })
  }

    handleAdminConfirmPassword(e){
    this.setState({
      adminConfirmPassword : e.target.value,
      showAlert : false,
      alertMessage : ''
    })
  }

    handleAdminUsername(e){
    this.setState({
      adminUsername : e.target.value,
      showAlert : false,
      alertMessage : ''
    })
  }


  render(){

    const changePasswordForm = (

    )

    const newAdminForm = (

    )

    return (
      <div>
        <h3>Admin Controls</h3>
        <span style={styles.option}>Change Password

        </span>
        <div style={styles.divider}/>
        <span style={styles.option}>New Admin

        </span>
      </div>
    )
  }
}

export default AdminControls;


import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { authenticateAdmin } from '../actions/admin_actions';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { Alert } from 'react-bootstrap';

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

  handleLogin(){
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
      <div>
       <TextField hintText ="Username Field" floatingLabelText="Username" type="text" 
        onChange={this.handleUsername} value={this.state.username} errorText={this.state.usernameError}/><br/> 
       <TextField hintText="Password Field" floatingLabelText="Password" type="password" 
        onChange={this.handlePassword} value={this.state.password} errorText={this.state.passwordError}/><br/>
       <RaisedButton onTouchTap={this.handleLogin} label="Login" style={{margin : 12}}/><br/>
       <div>
       {this.state.invalidLogin ? alertInstance : ''}
       </div>
       </div>
    )

    return (
      <div>
      <MuiThemeProvider>
        {loginForm}
      </MuiThemeProvider>
      </div>
    )
  }
}

export default connect(null, {authenticateAdmin})(AdminLogin)