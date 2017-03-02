import React from 'react'
import axios from 'axios'
import { deleteGroup } from '../actions/atexta_actions'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { FlatButton } from 'material-ui'

class ConfirmDeleteGroupModal extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
    this.actualDeletion = this.actualDeletion.bind(this)
  }

  actualDeletion() {
    this.props.deleteGroup(this.props.groupToDelete)
    axios.delete('/groups/deleteGroup/'+this.props.groupToDelete.groupId)
    .then(result=>{
      console.log('result is', result)
      this.props.close()
    })
    .catch(err=>{
      console.log('error in deleting group', err)
    })
  }

  render() {
    console.log(this.props.groupToDelete)
    let group = this.props.groupToDelete
    return(
      <Modal show={this.props.show} bsSize="large" onHide={this.props.close}>
        <Modal.Header closeButton >
          <Modal.Title> Delete group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you really want to delete {group.name}? </p>
          This is permanent and cannot be undone&nbsp;&nbsp;&nbsp;
					<FlatButton className="standardButton" backgroundColor="darkgray" type="button" label="Nevermind" onClick = {this.props.close} labelStyle={{ color: 'white'}}/>
          &nbsp;&nbsp;&nbsp;&nbsp;
					<FlatButton className="standardButton" backgroundColor="darkgray" type="button" label="Yes continue" onClick = {this.actualDeletion} labelStyle={{ color: 'white'}}/>
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps({ atexta }) {
	return ({ userId: atexta.userId, userGroups: atexta.userGroups })
}

export default connect(mapStateToProps, {deleteGroup})(ConfirmDeleteGroupModal)