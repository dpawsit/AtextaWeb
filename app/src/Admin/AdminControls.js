import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { adminLogout } from '../actions/admin_actions';
import { browserHistory } from 'react-router';
import { TextField, RaisedButton } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { Alert } from 'react-bootstrap';

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
      showPassAlert: false,
      showAlert : false,
      alertMessage : '',
      adminUsername: '',
      adminPassword: '',
      adminConfirmPassword: '',
      successAlert: false
    }
    this.handleCurrentPassword = this.handleCurrentPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleAdminPassword = this.handleAdminPassword.bind(this);
    this.handleAdminConfirmPassword = this.handleAdminConfirmPassword.bind(this);
    this.handleAdminUsername = this.handleAdminUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleNewAdmin = this.handleNewAdmin.bind(this);
    this.handlePassAlert = this.handlePassAlert.bind(this);
  }

  handleCurrentPassword(e){
    this.setState({
      currentPassword : e.target.value,
      showPassAlert : false,
      alertMessage : ''
    })
  }

  handleNewPassword(e){
    this.setState({
      newPassword : e.target.value,
      showPassAlert : false,
      alertMessage : ''
    })
  }

  handleConfirmPassword(e){
    this.setState({
      confirmPassword : e.target.value,
      showPassAlert : false,
      alertMessage : ''
    })
  }

  handleAlert(message){
    this.setState({
      showAlert : true,
      alertMessage : message
    })
  }

  handlePassAlert(message){
    this.setState({
      showPassAlert : true,
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

  handleSuccessAlert(){
    this.setState({
      successAlert : true
    })
  }

  handleChangePassword(){

    if (this.state.currentPassword === '' || this.state.currentPassword === ' '){
      this.handlePassAlert('Current Password Is Required')
    } else if (this.state.newPassword === '' || this.state.newPassword === ' '){
      this.handlePassAlert('New Password Is Required')
    } else if (this.state.confirmPassword === ''){
      this.handlePassAlert('Please Confirm Password')
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      this.handlePassAlert('Passwords Do Not Match')
    } else {
      axios.post('/admin/updatePassword', 
        {id: this.props.adminId, 
         currentPassword: this.state.currentPassword, 
         newPassword: this.state.newPassword
        }
      ).then(result => {
        if(result.data.update){
          this.props.adminLogout();
          browserHistory.replace('/adminLogin');
        } else {
          this.handlePassAlert('Current Password Is Incorrect');
        }
      }).catch(error => {
        this.handlePassAlert(JSON.stringify(error));
      })
    }
  }

  handleNewAdmin(){

    if (this.state.adminUsername === '' || this.state.adminUsername === ' ') {
      this.handleAlert('Username Is Required')
    } else if (this.state.adminPassword === '' || this.state.adminPassword === ' ') {
      this.handleAlert('Password Is Required')
    } else if (this.state.adminConfirmPassword === '') {
      this.handleAlert('Please Confirm Password')
    } else if (this.state.adminPassword !== this.state.adminConfirmPassword) {
      this.handleAlert('Passwords Do Not Match')
    } else {
      axios.post('admin/createNewAdmin', 
        {username: this.state.adminUsername,
         password: this.state.adminConfirmPassword,
         adminId : this.props.adminId
        }
      ).then(result => {
        this.handleSuccessAlert();
      }).catch(error => {
        this.handleAlert(error.response.data.error);
      })   
    }
  }

  render(){

    const alertInstance = (
      <Alert bsStyle="danger">
        <strong>{this.state.alertMessage}</strong>
      </Alert>
    );

    const successInstance = (
      <Alert bsStyle="success">
        <strong>New Admin Successfully Created!</strong>
      </Alert>
    )

    const changePasswordForm = (
        <span style={styles.option}>Change Password
          <br/><TextField floatingLabelText="Current Password" type="password" 
            onChange={this.handleCurrentPassword} value={this.state.currentPassword}/><br/> 
          <TextField floatingLabelText="New Password" type="password" 
            onChange={this.handleNewPassword} value={this.state.newPassword}/><br/>
          <TextField floatingLabelText="Confirm New Password" type="password" 
            onChange={this.handleConfirmPassword} value={this.state.confirmPassword}/><br/>
        <RaisedButton onTouchTap={this.handleChangePassword} label="Submit" style={{margin : 12, float:'right'}}/><br/>
        </span>      
    );

    const newAdminForm = (
        <span style={styles.option}>Create New Admin
          <br/><TextField floatingLabelText="Username" type="text" 
            onChange={this.handleAdminUsername} value={this.state.adminUsername}/><br/> 
          <TextField floatingLabelText="Password" type="password" 
            onChange={this.handleAdminPassword} value={this.state.adminPassword}/><br/>
          <TextField floatingLabelText="Confirm Password" type="password" 
            onChange={this.handleAdminConfirmPassword} value={this.state.adminConfirmPassword}/><br/>
        <RaisedButton onTouchTap={this.handleNewAdmin} label="Create" style={{margin : 12, float :'right'}}/><br/>
        </span>
    );

    return (
      <div>
        <h3>Admin Settings</h3>
        <div style={styles.divider}/>
        {this.state.showPassAlert ? alertInstance : ''}
        <MuiThemeProvider>
          {changePasswordForm}
        </MuiThemeProvider>
        <br/><div style={styles.divider}/>
        {this.state.showAlert ? alertInstance : ''}
        {this.state.successAlert ? successInstance : ''}
        <MuiThemeProvider>
          {newAdminForm}
        </MuiThemeProvider>
      </div>
    )
  }
}

function MapStateToProps(state){
  return {
    adminId : state.admin.adminId
  }
}

export default connect(MapStateToProps, {adminLogout})(AdminControls);
