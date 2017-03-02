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
      selectedQueries : []
    }
    this.handleQuerySelection = this.handleQuerySelection.bind(this);
    this.handleQueryDeletion = this.handleQueryDeletion.bind(this);
  }

  handleQuerySelection(selectedRows){
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
    let self = this;
    axios.delete('/admin/deleteAdminQuery', {params : {deleteInfo : deleteList}})
    .then(result => {
      this.props.deleteAdminQuery(deleteList)
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
           <TableRow key={index}>
                <TableRowColumn style={{ width: 50 }}>{query.id}</TableRowColumn>
                <TableRowColumn style={{ width: 175 }}>{query.queryName}</TableRowColumn>
                <TableRowColumn style={{ width: 100 }}>{query.chartOption}</TableRowColumn>
                <TableRowColumn>{query.queryString}</TableRowColumn>
          </TableRow>
      ))
    }

    if (this.state.selectedQueries === 'all' || this.state.selectedQueries.length > 0) {
      button = <RaisedButton label="Delete Queries" onTouchTap={this.handleQueryDeletion} style={{padding : '2px'}}/>
    }

    return (
      <div>
        <h3>View Queries</h3>
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
              <TableHeaderColumn style={{ width: 50 }}>ID</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 175 }}>Name</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>Chart</TableHeaderColumn>
              <TableHeaderColumn>Query</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={true}
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