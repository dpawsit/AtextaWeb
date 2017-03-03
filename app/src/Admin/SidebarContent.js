import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import SidebarTitle from './SidebarTitle';
import { adminLogin, saveQueryResults, selectSingleQuery, changeView} from '../actions/admin_actions';
import { Toggle } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import EditIcon from 'material-ui/svg-icons/content/create'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import AddIcon from 'material-ui/'

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
};

class SidebarContent extends Component {
  constructor(props){
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleViewToggle = this.handleViewToggle.bind(this);
  }

componentWillMount(){
  this.props.adminLogin();
}

handleQuerySelection(inputQueryId, inputQueryString, inputChartOption){
  if (this.props.queryResults.hasOwnProperty(inputQueryId)){
    this.props.selectSingleQuery(inputQueryId, inputChartOption)
    this.props.queryView()
  } else {
    axios.get('/admin/runAdminQuery', {params : {queryString : inputQueryString}})
    .then(res => {
      let queryRes = {}
      queryRes[inputQueryId] = res.data
      this.props.saveQueryResults(queryRes)
      this.props.selectSingleQuery(inputQueryId, inputChartOption)
      this.props.queryView()
    })
    .catch(error => {
      console.log('Error running query: ', error);
    })
  }
}

handleViewToggle(){

  if (this.props.viewType === 'T'){
    this.props.changeView('C')
  } else {
    this.props.changeView('T')
  }
}

render(){
  const style = this.props.style ? {...styles.sidebar, ...this.props.style} : styles.sidebar;

  const links = [];
  if (!!this.props.adminQueries) {

  for (let i = 0; i < this.props.adminQueries.length; i++) {
    links.push(
      <a key={this.props.adminQueries[i].id} 
      onClick={()=>{this.handleQuerySelection(this.props.adminQueries[i].id, 
                                              this.props.adminQueries[i].queryString,
                                              this.props.adminQueries[i].chartOption)}} 
      style={styles.sidebarLink}>{this.props.adminQueries[i].queryName}</a>);
    }
  } 

  const toggle = (
    <div>
    <MuiThemeProvider>
    <Toggle
      label={(this.props.viewType === 'T' ? 'Table' : 'Chart')}
      style={{marginBottom: 16}}
      onToggle={this.handleViewToggle}
    />
    </MuiThemeProvider>
    </div>
  )

  return (
    <SidebarTitle title="Analytics" style={style}>
      <div style={styles.content}>
        <span style={{'fontSize': '17px'}}><strong>Queries</strong>
        <MuiThemeProvider><RefreshIcon style={{float:'right'}}onClick={()=>{console.log('test')}}/></MuiThemeProvider>
        </span>
        <div style={styles.divider} />
        <div>{toggle}</div>
        {links}
        <br/>
        <span style={{'fontSize': '17px'}}><strong>Admin Controls</strong></span>
        <div style={styles.divider}>
          <a href="#" onClick={this.props.createView} style={styles.sidebarLink}>Create New Query</a>
          <a href="#" onClick={this.props.queryEditView} style={styles.sidebarLink}>View Queries</a>
          <a href="#" onClick={this.props.adminControlView} style={styles.sidebarLink}>Secret Triggers</a>
          <a href="#" onClick={this.props.secretTriggerView} style={styles.sidebarLink}>Admin Settings</a>
        </div>
      </div>
    </SidebarTitle>
  );
}

};

SidebarContent.propTypes = {
  style: React.PropTypes.object,
};

function MapStateToProps(state){
  return {
    adminQueries : state.admin.adminQueries,
    queryResults : state.admin.queryResults,
    viewType : state.admin.viewType
  }
}

export default connect(MapStateToProps, {adminLogin, saveQueryResults, selectSingleQuery, changeView})(SidebarContent);