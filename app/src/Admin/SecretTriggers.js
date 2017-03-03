import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setSecretTriggers } from '../actions/admin_actions';
import { Alert } from 'react-bootstrap';
import { Table, TableBody, TableFooter, TableHeader, 
  TableHeaderColumn, TableRow, TableRowColumn, RaisedButton, TextField, Toggle} from 'material-ui';

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

class SecretTriggers extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeView : true,
      selectedTriggers : [],
      newTriggerString : '',
      inputErrorString : '',
      successAlert : false
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleTriggerSelection = this.handleTriggerSelection.bind(this);
    this.handleTriggerDeactivate = this.handleTriggerDeactivate.bind(this);
    this.handleTriggerInput = this.handleTriggerInput.bind(this);
    this.handleSecretTriggerSave = this.handleSecretTriggerSave.bind(this);
    this.handleTriggerReactivate = this.handleTriggerReactivate.bind(this);
    this.handleActiveView = this.handleActiveView.bind(this);
  }

  componentWillMount(){
    if (this.props.secretTriggers.length === 0) {
      this.props.setSecretTriggers()
    } 
  }

  handleTriggerSelection(selectedRows){
    this.setState({
      selectedTriggers : (selectedRows === 'none' ? [] : selectedRows),
      successAlert : false,
      inputErrorString : ''
    })
  }

  handleTriggerDeactivate(){
    let deleteList = '';

    if (this.state.selectedTriggers === 'all') {
      deleteList = this.props.secretTriggers[0].map(trigger => {
        return trigger.id;
      });
    } else {
       deleteList = [];
      this.state.selectedTriggers.forEach(index => {
        deleteList.push(this.props.secretTriggers[0][index].id)
      })
    }
    axios.delete('/admin/deActivateSecretTrigger', {params : {secretId : deleteList}})
    .then(result => {
      this.props.setSecretTriggers()
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleTriggerReactivate(){
  let activateList = '';
  if (this.state.selectedTriggers === 'all') {
    activateList = this.props.secretTriggers[1].map(trigger => {
      return trigger.id;
    });
  } else {
      activateList = [];
    this.state.selectedTriggers.forEach(index => {
      activateList.push(this.props.secretTriggers[1][index].id)
    })
  }
  axios.post('/admin/reActivateSecretTrigger', {secretId : activateList})
  .then(result => {
    this.props.setSecretTriggers()
  })
  .catch(error => {
    console.log(error);
  })
}

  handleSecretTriggerSave(e) {
    e.preventDefault();
    
    if (this.state.newTriggerString === ''){
      this.setState({
        inputErrorString : 'This Field Is Required'
      })
    } else {
      axios.post('/admin/createSecretTrigger', {name : this.state.newTriggerString, adminId : this.props.adminId})
      .then(result => {
        this.props.setSecretTriggers();
        this.setState({
          successAlert : true,
          inputErrorString : ''
        })
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  handleTriggerInput(e){
    this.setState({
      newTriggerString : e.target.value,
      inputErrorString : '',
      successAlert : false
    })
  }

  handleActiveView(){
    this.setState({
      activeView : !this.state.activeView
    })
  }


  render(){
    let activeTableBody = '';
    let inactiveTableBody = '';
    let deleteButton = <div></div>;
    let activateButton = <div></div>;
    let activeSelectAll = true; 
    let inactiveSelectAll = true;

    if(!!this.props.secretTriggers[0]) {
      activeTableBody = this.props.secretTriggers[0].map(trigger => {
        if(this.props.adminId !== trigger.createdBy){
          activeSelectAll = false;
        }
        return (
           <TableRow key={trigger.id} selectable={trigger.createdBy === this.props.adminId}>
                <TableRowColumn style={{ width: 50 }}>{trigger.id}</TableRowColumn>
                <TableRowColumn style={{ whiteSpace:'normal', wordWrap:'break-word' }}>{trigger.name}</TableRowColumn>
                <TableRowColumn style={{ width: 100 }}>{trigger.count}</TableRowColumn>
                <TableRowColumn style={{ width: 100 }}>{trigger.username}</TableRowColumn>
          </TableRow>          
        )
      })

      inactiveTableBody = this.props.secretTriggers[1].map(trigger => {
        if(this.props.adminId !== trigger.createdBy){
          inactiveSelectAll = false;
        }
        return (
           <TableRow key={trigger.id} selectable={trigger.createdBy === this.props.adminId}>
                <TableRowColumn style={{ width: 50 }}>{trigger.id}</TableRowColumn>
                <TableRowColumn style={{ whiteSpace:'normal', wordWrap:'break-word' }}>{trigger.name}</TableRowColumn>
                <TableRowColumn style={{ width: 100 }}>{trigger.count}</TableRowColumn>
                <TableRowColumn style={{ width: 100 }}>{trigger.username}</TableRowColumn>
          </TableRow>          
        )
      })
    }

    if (this.state.selectedTriggers ===  'all' || this.state.selectedTriggers.length > 0) {
        deleteButton = <RaisedButton label="Deactivate" onTouchTap={this.handleTriggerDeactivate} style={{padding : '2px'}}/>
        activateButton = <RaisedButton label="Reactivate" onTouchTap={this.handleTriggerReactivate} style={{padding : '2px'}}/>
    }

    const alertInstanceSuccess = (
      <Alert bsStyle="success">
        <strong>Trigger Successfully Created!</strong>
      </Alert>
      );

    return (
      <div>
        <h3>Secret Triggers</h3>
        <div style={styles.divider}/>
        <Toggle label={(this.state.activeView ? 'Active Triggers':'Inactive Triggers')} 
        onToggle={this.handleActiveView}/> 
        <Table
          height={'300px'}
          fixedHeader={true}
          fixedFooter={false}
          selectable={true}
          multiSelectable={true}
          onRowSelection={this.handleTriggerSelection}>
          <TableHeader
            displaySelectAll={true}
            adjustForCheckbox={true}
            enableSelectAll={this.state.activeView ? activeSelectAll : inactiveSelectAll}>
            <TableRow>
              <TableHeaderColumn style={{ width: 50 }}>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>Count</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>Created By</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={false}>
            {this.state.activeView ? activeTableBody : inactiveTableBody}
          </TableBody>
        </Table><br/>
         {this.state.activeView ? deleteButton : activateButton}
        <div style={styles.divider}/>
        <span style={styles.option}>Create New Trigger
        <br/>
        <form onSubmit={this.handleSecretTriggerSave}>
        <TextField floatingLabelText="New Trigger" type="text" 
            onChange={this.handleTriggerInput} errorText={this.state.inputErrorString} value={this.state.newTriggerString}/>
        <RaisedButton onTouchTap={this.handleSecretTriggerSave} label="Submit" style={{margin : 12, float:'right'}} type="submit"/><br/>
        </form>
        {this.state.successAlert ? alertInstanceSuccess : ''}        
        </span>
      </div>
    )
  }
}

function MapStateToProps(state){
  return {
    secretTriggers : state.admin.secretTriggers
  }
}
export default connect(MapStateToProps, {setSecretTriggers})(SecretTriggers)