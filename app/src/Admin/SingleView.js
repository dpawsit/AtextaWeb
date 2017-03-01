import React, { Component } from 'react';
import { connect } from 'react-redux';

class SingleView extends Component {
  constructor(props){
    super(props)
    
  }


  render(){
    return (
      <div>
      {
        (this.props.singleQuery ? this.props.singleQuery.map(row => {
          let rowInfo = '';
          for (var key in row){
            if(key !== 'updatedAt'){
              rowInfo += `${key}: ${row[key]}   `
            }
          }
          return <div key={rowInfo}>{rowInfo}</div>
        }) : <div>Loading</div>)
      }
      </div>
    )
  }
}

function MapStateToProps(state){
  return {
    singleQuery : state.admin.singleQuery
  }
}

export default connect(MapStateToProps)(SingleView)