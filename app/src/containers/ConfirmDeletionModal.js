import React from 'react'
import axios from 'axios'
// import { deleteContact } from '../actions/atexta_actions'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { FlatButton } from 'material-ui'

class ConfirmDeletionModal extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
  }

  render() {
    return(
      <Modal show={this.props.show} bsSize="large" onHide={this.props.close}>
        <Modal.Header closeButton >
          <Modal.Title> Delete Command</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ARE YOU SURE
        </Modal.Body>
      </Modal>
    )
  }
}

export default ConfirmDeletionModal