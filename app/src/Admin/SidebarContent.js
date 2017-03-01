import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import SidebarTitle from './SidebarTitle';
import { adminLogin, saveQueryResults, selectSingleQuery} from '../actions/admin_actions';
import SingleView from './SingleView';

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
  }

componentWillMount(){
  this.props.adminLogin();
}

handleQuerySelection(inputQueryId, inputQueryString){
  if (this.props.queryResults.hasOwnProperty(inputQueryId)){
    this.props.selectSingleQuery(inputQueryId)
    this.props.singleView()
  } else {
    axios.get('/admin/runAdminQuery', {params : {queryString : inputQueryString}})
    .then(res => {
      let queryRes = {}
      queryRes[inputQueryId] = res.data
      this.props.saveQueryResults(queryRes)
      this.props.selectSingleQuery(inputQueryId)
      this.props.singleView()
    })
    .catch(error => {
      console.log('Error running query: ', error);
    })
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
                                              this.props.adminQueries[i].queryString)}} 
      style={styles.sidebarLink}>{this.props.adminQueries[i].queryName}</a>);
    }
  } 

  return (
    <SidebarTitle title="Analytics" style={style}>
      <div style={styles.content}>
        <span>Views</span>
        <div style={styles.divider} />
        {links}
        <br/>
        <span>Settings</span>
        <div style={styles.divider}>
          <a href="#" onClick={this.props.createView} style={styles.sidebarLink}>Create New Query</a>
          <a href="#" onClick={this.props.queryEditView} style={styles.sidebarLink}>View Queries</a>
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
    queryResults : state.admin.queryResults
  }
}

export default connect(MapStateToProps, {adminLogin, saveQueryResults, selectSingleQuery})(SidebarContent);