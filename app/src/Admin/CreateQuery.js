import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { TextField, Drawer, RaisedButton, List, ListItem, Divider, Subheader } from 'material-ui';

import {Grid, Col, Row} from 'react-bootstrap';
import tables from './db_tables';
import QueryTable from './QueryTable';
import {saveNewQuery} from '../actions/admin_actions'

class CreateQuery extends Component {
  constructor(props){
    super(props)
    this.state = {
      tableView : false,
      queryName : '',
      queryString : '',
      queryResult : [],
      nameError : '',
      stringError : '',
      testPassed : false
    }
    this.handleTableView = this.handleTableView.bind(this);
    this.handleQueryTest = this.handleQueryTest.bind(this);
    this.handleQuerySave = this.handleQuerySave.bind(this);
    this.handleQueryName = this.handleQueryName.bind(this);
    this.handleQueryString = this.handleQueryString.bind(this);
  }

  handleTableView(){
    this.setState({
      tableView : !this.state.tableView
    })
  }

  handleQueryTest(){
    axios.get('/admin/runAdminQuery', {params : {queryString : this.state.queryString}})
    .then(result => {
      this.setState({
        queryResult : result.data,
        testPassed : true
      })
    })
    .catch(error => {
      console.log('Error running test query');
    })
  }

  handleQueryName(e){
    this.setState({
      nameError : '',
      queryName : e.target.value
    })
  }

  handleQueryString(e){
    this.setState({
      stringError : '',
      queryString : e.target.value
    })
  }

  handleQuerySave(){
    if (this.state.queryName === ''){
      this.setState({
        nameError : "This field is required"
      })
    } else if (this.state.queryString === ''){
      this.setState({
        stringError : "This field is required"
      })
    } else {
      let queryInfo = {name : this.state.queryName, queryString: this.state.queryString}
      axios.post('/admin/createNewAdminQuery', queryInfo)
      .then(result => {
        this.props.saveNewQuery(result.data)
      })
      .catch(error => {
        console.log('error saving new admin query: ', error)
      })
    }
  }

  render(){
    return (
      <Grid>
        <h3>Create New Query</h3><br/>
        <Row>
          <Col xs={6} md={9}>
            <div>
            <TextField hintText="Enter Unique Name" floatingLabelText="Query Name" multiLine={true}
                      rows={1} onChange={this.handleQueryName} errorText={this.state.nameError}/><br/>
            <TextField hintText="Enter Unique Query" floatingLabelText="Query String" multiLine={true}
                      rows={2} fullWidth={true} onChange={this.handleQueryString} errorText={this.state.stringError}/><br/>
            <RaisedButton label="Show Tables" onTouchTap={this.handleTableView} style={{padding : '2px'}}/>
            <RaisedButton label="Test Query" onTouchTap={this.handleQueryTest} style={{padding : '2px'}}/>
            {this.state.testPassed ? <RaisedButton label="Save Query" onTouchTap={this.handleQuerySave} style={{padding : '2px'}}/> : <div></div>}
            </div>
          </Col >
        <Col xs={6} md={3}>
            <div >
              <Drawer width={250} openSecondary={true} open={this.state.tableView}>
                <List>
                  <Subheader>Database Tables</Subheader>
                  <div>
                  {tables.map(table => {
                    return (
                      <div key={'div'+table.table}>
                        <ListItem primaryText={table.table} initiallyOpen={false} 
                                        primaryTogglesNestedList={true} key={table.table}
                                        nestedItems={table.columns.map(column => {
                                          return <ListItem key={table.table+''+column}
                                                            primaryText={column} />
                                        })} />
                        <Divider/>
                      </div>
                    )
                  })}
                  </div>
                </List>
              </Drawer>
            </div>
        </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div>
                <QueryTable data={this.state.queryResult}/>        
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect(null, {saveNewQuery})(CreateQuery);

