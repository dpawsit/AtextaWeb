import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import SidebarTitle from './SidebarTitle';
import SidebarContent from './SidebarContent';
import QueryView from './QueryView';
import CreateQuery from './CreateQuery';
import EditQueryView from './EditQueryView';
import { MuiThemeProvider } from 'material-ui/styles';
import Loading from 'react-loading';
import { Col, Row, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { refreshPanel, adminLogout } from '../actions/admin_actions';
import { browserHistory } from 'react-router';
import axios from 'axios';
import AdminControls from './AdminControls';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
  },
};

class AdminPanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      docked : false,
      open : false,
      queryView : true,
      createView : false,
      queryEditView : false,
      queryUpdateInfo : false,
      loading : true,
      adminControlsView : false
    }

    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.createView = this.createView.bind(this);
    this.queryEditView = this.queryEditView.bind(this);
    this.queryView = this.queryView.bind(this);
    this.createViewForEdit = this.createViewForEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.adminControlView = this.adminControlView.bind(this);
  }

  componentWillMount() {
    if (this.props.adminId > 0) {
      this.setState({
        loading : false
      })
      axios.defaults.headers.common['Authorization'] = this.props.token;
      const mql = window.matchMedia(`(min-width: 800px)`);
      mql.addListener(this.mediaQueryChanged);
      this.setState({mql: mql, docked: mql.matches});
    } else {
      browserHistory.replace('/adminLogin');
    }
  }

  componentWillUnmount() {
    if (this.props.adminId > 0) {
      this.state.mql.removeListener(this.mediaQueryChanged);
    }
  }

  onSetOpen(open) {
    this.setState({open: open});
  }

  mediaQueryChanged() {
    this.setState({docked: this.state.mql.matches});
  }

  toggleOpen(ev) {
    this.setState({open: !this.state.open});

    if (ev) {
      ev.preventDefault();
    }
  }
  
  createView(){
    this.setState({
      createView : true,
      queryView : false,
      queryEditView : false,
      queryUpdateInfo : false,
      adminControlsView : false
    })
  }

  queryEditView(){
    this.setState({
      queryEditView : true,
      createView : false,
      queryView : false,
      adminControlsView : false
    })
  }

  queryView(){
    this.setState({
      queryView : true,
      createView : false,
      queryEditView : false,
      adminControlsView : false
    })
  }

  createViewForEdit(queryInfo){
    this.setState({
      createView : true,
      queryView : false,
      queryEditView : false,
      queryUpdateInfo : queryInfo,
      adminControlsView : false
    })
  }

  adminControlView(){
    this.setState({
      createView : false,
      queryView : false,
      queryEditView : false,
      queryUpdateInfo : false,
      adminControlsView : true
    })
  }

  handleLogout(){
    this.props.adminLogout();
    browserHistory.replace('/adminLogin');
  }


  render() {
   const loadingCol = {maxWidth: 500, margin: '0 auto 10px'};

   if (this.state.loading) {
     return (
      <Col style={loadingCol}>
        <Loading type="cylon" color="#001f3f" width={500} heigth={500} delay={0}/> 
			</Col>
     )
   }

   const sidebar = <SidebarContent createView={this.createView} 
                                   queryView={this.queryView} 
                                   queryEditView={this.queryEditView} 
                                   adminControlView={this.adminControlView}/>;
   
   let adminBody = <div></div>
  
  if (this.state.createView) {adminBody = <MuiThemeProvider><CreateQuery update={this.state.queryUpdateInfo}/></MuiThemeProvider>}
  else if (this.state.queryView) {adminBody = <QueryView />}
  else if (this.state.queryEditView) {adminBody = (<MuiThemeProvider><EditQueryView updateQuery={this.createViewForEdit}/></MuiThemeProvider>)}
  else if (this.state.adminControlsView) {adminBody = <AdminControls />}
   const contentHeader = (
        <Grid>
          <Row>
            <span>
              <Col xs={8} md={10}>
              {!this.state.docked &&
              <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>=</a>}
              <span> Atexta Admin Panel</span>
              </Col>
              <Col xs={4} md={2}>
              <a onClick={this.handleLogout} href="#" style={{color:'white'}}>Logout</a>
              </Col>
            </span>
          </Row>
        </Grid>);

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen
    };

    return (
      <Sidebar {...sidebarProps}>
        <SidebarTitle title={contentHeader}>
          <div style={styles.content}>
            {adminBody}
          </div>
        </SidebarTitle>
      </Sidebar>
    );
  }
};

function MapStateToProps(state){
  return {
    adminId : state.admin.adminId,
    token : state.admin.adminToken
  }
}

export default connect(MapStateToProps, {adminLogout, refreshPanel})(AdminPanel);