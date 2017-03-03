import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { TextField, Drawer, RaisedButton, List, ListItem, Divider, Subheader , Toggle, RadioButton, RadioButtonGroup} from 'material-ui';
import {Grid, Col, Row} from 'react-bootstrap';
import tables from './db_tables';
import QueryTable from './QueryTable';
import {saveNewQuery, updateQuery} from '../actions/admin_actions'
import ChartView from './ChartView';

const styles = {
    divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  }  
}

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
      testPassed : false,
      chartTest : false,
      chartSelection : null,
      updateId : null,
      updateSuccess : false,
      createSuccess : false

    }
    this.handleTableView = this.handleTableView.bind(this);
    this.handleQueryTest = this.handleQueryTest.bind(this);
    this.handleQuerySave = this.handleQuerySave.bind(this);
    this.handleQueryName = this.handleQueryName.bind(this);
    this.handleQueryString = this.handleQueryString.bind(this);
    this.handleQueryError = this.handleQueryError.bind(this);
    this.handleTestToggle = this.handleTestToggle.bind(this);
    this.handleChartSelection = this.handleChartSelection.bind(this);
    this.handleUpdateQuery = this.handleUpdateQuery.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    if(this.props.update){
      this.setState({
        queryName : this.props.update.queryName,
        queryString : this.props.update.queryString,
        queryId : this.props.update.id
      })
    }
  }

  handleTableView(){
    this.setState({
      tableView : !this.state.tableView
    })
  }

  handleQueryTest(){
    if (this.state.queryName === ''){
      this.setState({
        nameError : "This field is required"
      })
    } else if (this.state.queryString === ''){
      this.setState({
        stringError : "This field is required"
      })
    } else if (this.state.queryString.toUpperCase().split(' ').indexOf('DELETE') !== -1) {
      this.setState({
        stringError : "Delete queries are not allowed"
      })
    } else if (this.state.queryString.toUpperCase().split(' ').indexOf('UPDATE') !== -1){
      this.setState({
        stringError : "Update queries are not allowed"
      })
    } else if (this.state.queryString.toUpperCase().split(' ').indexOf('DROP') !== -1) {
      this.setState({
        stringError : "Drop queries are not allowed"
      })    
    }else {
      axios.get('/admin/runAdminQuery', {params : {queryString : this.state.queryString}})
      .then(result => {
        this.setState({
          queryResult : result.data,
          testPassed : true,
          queryError : false,
          queryErrorMessage : ''
        })
      })
      .catch(error => {
        this.handleQueryError(error);
      })
    }
  }

  handleQueryName(e){
    this.setState({
      nameError : '',
      queryName : e.target.value,
      updateSuccess : false,
      createSuccess : false
    })
  }

  handleQueryString(e){
    this.setState({
      stringError : '',
      queryString : e.target.value,
      queryError : false,
      queryErrorMessage: '',
      testPassed : false,
      queryResult : [],
      updateSuccess : false,
      createSuccess : false
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
      let queryInfo = {name : this.state.queryName, 
                       queryString: this.state.queryString, 
                       chartOption: this.state.chartSelection,
                      adminId : this.props.adminId}
      axios.post('/admin/createNewAdminQuery', queryInfo)
      .then(result => {
        this.props.saveNewQuery(result.data)
        this.setState({
          createSuccess : true
        })
      })
      .catch(error => {
        this.handleQueryError(error);
      })
    }
  }

  handleQueryError(error){
    let message = error.response.data.error

    if (message.split(' ').indexOf('queryName') !== -1){
      this.setState({
      nameError : message
      }) 
    } else if (message.split(' ').indexOf('queryString') !== -1) {
      this.setState({
      stringError : message
      }) 
    } else {
      this.setState({
      queryError : true,
      queryErrorMessage : message
      })
    }
  }

  handleTestToggle(){
    this.setState({
      chartTest : !this.state.chartTest
    })
  }

  handleChartSelection(e, v){
    this.setState({
      chartSelection : v
    })
  }

  handleUpdateQuery(){
    if (this.state.queryName === ''){
      this.setState({
        nameError : "This field is required"
      })
    } else if (this.state.queryString === ''){
      this.setState({
        stringError : "This field is required"
      })
    } else {
      let queryInfo = {id : this.props.update.id, name : this.state.queryName, queryString: this.state.queryString, chartOption: this.state.chartSelection}
      axios.put('/admin/updateAdminQuery', queryInfo)
      .then(result => {
        if(result.data.update){
          this.props.updateQuery(queryInfo)
          this.setState({
            updateSuccess : true
          })
        }
      })
      .catch(error => {
        this.handleQueryError(error);
      })
    }
  }

  render(){
    const pageTitle = (this.props.update ? 'Update Query' : 'Create New Query');

    const alertInstanceSuccess = (
      <Alert bsStyle="success">
        <strong>Query Updated Successfully!</strong>
      </Alert>
      );

    const alertInstanceCreate = (
      <Alert bsStyle="success">
        <strong>Query Created Successfully!</strong>
      </Alert>
      );
    
    const alertInstance = (
      <Alert bsStyle="danger">
        <strong>Query Error! </strong>{this.state.queryErrorMessage}
      </Alert>
      );
    
    const resultBody = (
      this.state.chartTest ? 
      <ChartView label={this.state.queryName} data={this.state.queryResult} chartOption={this.state.chartSelection}/> : 
      <QueryTable data={this.state.queryResult}/> 
      )

    return (
      <div>
      <h3>{pageTitle}</h3>
      <div style={styles.divider}/>
      <Grid>
        <Row>
          <Col xs={6} md={9}>
            <div>
            <TextField hintText="Enter Unique Name" floatingLabelText="Query Name" multiLine={true}
                      rows={1} onChange={this.handleQueryName} errorText={this.state.nameError} value={this.state.queryName}/><br/>
            <TextField hintText="Enter Unique Query" floatingLabelText="Query String" multiLine={true}
                      rows={2} fullWidth={true} onChange={this.handleQueryString} errorText={this.state.stringError} value={this.state.queryString}/><br/>
            <RaisedButton label="Show Tables" onTouchTap={this.handleTableView} style={{padding : '2px'}}/>
            <RaisedButton label="Test Query" onTouchTap={this.handleQueryTest} style={{padding : '2px'}}/>
            {this.state.testPassed ? (
              this.props.update ? <RaisedButton label="Update Query" onTouchTap={this.handleUpdateQuery} style={{padding : '2px'}}/> :
              <RaisedButton label="Save Query" onTouchTap={this.handleQuerySave} style={{padding : '2px'}}/> 
              ) : <div></div>}
            </div>
          </Col>
              <Col xs={6} md={3}>
              <RadioButtonGroup name="chartType" defaultSelected={this.props.update.chartOption ? this.props.update.chartOption : "null"} 
                                onChange={this.handleChartSelection}>
                <RadioButton value="Doughnut" label="Doughnut"/>
                <RadioButton value="Pie" label="Pie"/>
                <RadioButton value="Line" label="Line"/>
                <RadioButton value="Bar" label="Bar"/>
                <RadioButton value="HorizontalBar" label="HorizontalBar"/>
                <RadioButton value="Radar" label="Radar"/>
                <RadioButton value="Polar" label="Polar"/>
                <RadioButton value="null" label="No Chart"/>
              </RadioButtonGroup>
          </Col>
          </Row>
          <Row>
          <Col xs={6} md={3}>
            <div>
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
        </Grid>
        <div style={styles.divider}/>
        <div>{this.state.queryError ? alertInstance : <div></div>}</div>
        <div>{this.state.updateSuccess ? alertInstanceSuccess : <div></div>}</div>
         <div>{this.state.createSuccess ? alertInstanceCreate : <div></div>}</div>
         <Grid>
        <Row>
          <Col xs={12} md={12}>
            <div>
              {this.state.testPassed ? 
                <Toggle label={(this.state.chartTest ?'Chart':'Table')} style={{marginBottom: 16, width: '200px'}} onToggle={this.handleTestToggle}/> 
                : <div></div>}
              {resultBody}      
            </div>
          </Col>
        </Row>
      </Grid>
      </div>
    )
  }
}

export default connect(null, {saveNewQuery, updateQuery})(CreateQuery);

