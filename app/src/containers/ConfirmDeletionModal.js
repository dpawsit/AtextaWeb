import React from 'react'
import axios from 'axios'
import { deleteCommand } from '../actions/atexta_actions'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { FlatButton } from 'material-ui'

class ConfirmDeletionModal extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
    this.actualDeletion = this.actualDeletion.bind(this)
  }

  actualDeletion() {
    this.props.deleteCommand(this.props.commandToDelete)
    axios.delete('/command/deleteCommand/'+this.props.commandToDelete.id)
    .then(result=>{
      // console.log('result is', result)
      this.props.close()
    })
    .catch(err=>{
      // console.log('error in deleting command', err)
    })
  }

  render() {
    // console.log(this.props.commandToDelete)
    let command = this.props.commandToDelete
    return(
      <Modal show={this.props.show} bsSize="large" onHide={this.props.close}>
        <Modal.Header closeButton >
          <Modal.Title> Delete Command</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you really want to delete {command.commandName}? </p>
          <p>Text: {command.text}</p>
          <p>Group: {command.groupName}</p>
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
	return ({ userId: atexta.userId, userCommands: atexta.userCommands })
}

export default connect(mapStateToProps, {deleteCommand})(ConfirmDeletionModal)