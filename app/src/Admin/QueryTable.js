import React, { Component } from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class QueryTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      showCheckboxes: false
    };
  }

  render() {
    let headers = [];
    let rows = [];

    for (var header in this.props.data[0]){
      headers.push(<TableHeaderColumn key={header} >{header}</TableHeaderColumn>)
    }

    this.props.data.forEach((row, index) => {
      let columns = [];
      for (var key in row) {
        columns.push(<TableRowColumn key={index+''+key} >{row[key]}</TableRowColumn>)
      }
      let newRow = (
        <TableRow key={index}>
        {columns}
        </TableRow>
      )
      rows.push(newRow);
    })

    return (
      <div>
        <Table
          height={'500px'}
          fixedFooter={false}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          >

          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}>

            <TableRow>
            {headers}
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
            {rows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default QueryTable;
