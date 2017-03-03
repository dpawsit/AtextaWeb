import React from 'react'
import { Grid, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import TrashIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/content/create'

class AddressBookItem extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      editMode: false
    }
    this.allowEdits = this.allowEdits.bind(this)
    this.preventEdits = this.preventEdits.bind(this)
  }

  allowEdits() {
    this.setState({editMode: true})
  }

  preventEdits() {
    this.setState({editMode: false})
  }
  
  render() {
    let contact = this.props.contact
    let medium = contact.mediumType === 'T' ? 'Text' : 
			contact.mediumType === 'S' ? 'Slack' :
			contact.mediumType === 'E' ? 'Email' :
			'none'
    return(
      <Row className="hoverable column" onMouseEnter={this.allowEdits} onMouseLeave={this.preventEdits}>
        <Col md={4}>{contact.name}</Col>
        <Col md={3}>{medium}</Col>
        <Col md={4}>{contact.contactInfo}</Col>
        <Col md={1}>
          {this.state.editMode ? <div><EditIcon onClick={()=>{this.props.editContact(contact)}} /> <TrashIcon onClick={()=>{this.props.deleteContact(contact)}} /> </div>: null}
        </Col>
      </Row>	
    )
  }
}

export default AddressBookItem