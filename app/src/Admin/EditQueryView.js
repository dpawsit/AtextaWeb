import React, { Component } from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, RaisedButton} from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { connect } from 'react-redux';
import { deleteAdminQuery } from '../actions/admin_actions';
import axios from 'axios';

class EditQueryView extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedQueries : [],
      selected : false
    }
    this.handleQuerySelection = this.handleQuerySelection.bind(this);
    this.handleQueryDeletion = this.handleQueryDeletion.bind(this);
  }

  handleQuerySelection(selectedRows){
    console.log(selectedRows);
    this.setState({
      selectedQueries : (selectedRows === 'none' ? [] : selectedRows)
    })
  }

  handleQueryDeletion(){
    let deleteList = '';

    if (this.state.selectedQueries === 'all') {
      deleteList = 'all';
    } else {
       deleteList = [];
      this.state.selectedQueries.forEach(index => {
        deleteList.push(this.props.adminQueries[index].id)
      })
    }
    console.log(deleteList);
    let self = this;
    axios.delete('/admin/deleteAdminQuery', {params : {deleteInfo : deleteList}})
    .then(result => {
      this.props.deleteAdminQuery(deleteList)
      this.setState({
        selected : false
      })
    })
    .catch(error => {
      console.log('error deleting admin queries: ', error);
    })
  }

  render(){
    let tableBody = <div></div>;
    let button = <div></div>;

    if(!!this.props.adminQueries) {
      tableBody = this.props.adminQueries.map( (query, index) => (
           <TableRow key={index} selected={false}>
                <TableRowColumn>{query.id}</TableRowColumn>
                <TableRowColumn>{query.queryName}</TableRowColumn>
                <TableRowColumn>{query.queryString}</TableRowColumn>
          </TableRow>
      ))
    }

    if (this.state.selectedQueries === 'all' || this.state.selectedQueries.length > 0) {
      button = <RaisedButton label="Delete Queries" onTouchTap={this.handleQueryDeletion} style={{padding : '2px'}}/>
    }

    return (
      <div>
        <h3>Edit Queries</h3>
        <Table
          height={'550px'}
          fixedHeader={true}
          fixedFooter={false}
          selectable={true}
          multiSelectable={true}
          onRowSelection={this.handleQuerySelection}>
          <TableHeader
            displaySelectAll={true}
            adjustForCheckbox={true}
            enableSelectAll={true}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Query</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={false}>
            {tableBody}
          </TableBody>
        </Table><br/>
         {button}
      </div>
    )
  }
}

function MapStateToProps(state){
  return {
    adminQueries : state.admin.adminQueries
  }
}

export default connect(MapStateToProps, {deleteAdminQuery})(EditQueryView);