import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import SidebarTitle from './SidebarTitle';
import SidebarContent from './SidebarContent';
import SingleView from './SingleView';
import CreateQuery from './CreateQuery';
import EditQueryView from './EditQueryView';
import { MuiThemeProvider } from 'material-ui/styles';

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
      singleView : true,
      createView : false,
      queryEditView : false
    }

    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.createView = this.createView.bind(this);
    this.queryEditView = this.queryEditView.bind(this);
    this.singleView = this.singleView.bind(this);
  }

  componentWillMount() {
    const mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, docked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
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
      singleView : false,
      queryEditView : false
    })
  }

  queryEditView(){
    this.setState({
      queryEditView : true,
      createView : false,
      singleView : false
    })
  }

  singleView(){
    this.setState({
      singleView : true,
      createView : false,
      queryEditView : false
    })
  }

  render() {
   const sidebar = <SidebarContent createView={this.createView} 
                                   singleView={this.singleView}
                                   queryEditView={this.queryEditView}/>;
   
   let adminBody = <div></div>
  
  if (this.state.createView) {adminBody = <MuiThemeProvider><CreateQuery/></MuiThemeProvider>}
  if (this.state.singleView) {adminBody = <SingleView />}
  if (this.state.queryEditView) {adminBody = (<MuiThemeProvider><EditQueryView /></MuiThemeProvider>)}

   const contentHeader = (
      <span>
        {!this.state.docked &&
         <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>=</a>}
        <span> Atexta Admin Panel</span>
      </span>);

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

export default AdminPanel;