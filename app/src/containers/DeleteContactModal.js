import React from 'react'
import axios from 'axios'
import { deleteContact } from '../actions/atexta_actions'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { FlatButton } from 'material-ui'

class DeleteContactModal extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
    this.actualDeletion=this.actualDeletion.bind(this);
  }

  actualDeletion() {
    this.props.deleteContact(this.props.contactToDelete)
    this.props.close()
    axios.delete('/groups/recipient/'+this.props.contactToDelete.id)
    .then(result=>{
    })
    .catch(err=>{
    })
  }

  render() {
    let contact = this.props.contactToDelete
    return(
      <Modal show={this.props.show} bsSize="large" onHide={this.props.close}>
        <Modal.Header closeButton >
          <Modal.Title> Delete Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you really want to delete {contact.name}? </p>
          <p>Contact Info: {contact.contactInfo}</p>
          This is permanent and cannot be undone.  This contact will be removed from all groups they are in
          <br/>
					<FlatButton className="standardButton" backgroundColor="darkgray" type="button" label="Nevermind" onClick = {this.props.close} labelStyle={{ color: 'white'}}/>
          &nbsp;&nbsp;&nbsp;&nbsp;
					<FlatButton className="standardButton" backgroundColor="darkgray" type="button" label="Yes continue" onClick = {this.actualDeletion} labelStyle={{ color: 'white'}}/>
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps({ atexta }) {
	return ({ userId: atexta.userId })
}

export default connect(mapStateToProps, {deleteContact})(DeleteContactModal)