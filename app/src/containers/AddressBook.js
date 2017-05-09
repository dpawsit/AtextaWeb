import React from 'react'
import AddContactModal from './AddContactModal'
import DeleteContactModal from './DeleteContactModal'
import AddressBookItem from './AddressBookItem'
import { FlatButton, RaisedButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'


class AddressBook extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			showAddContactModal: false,
			showType: "all",
			contactToEdit: null,
			contactToDelete: null,
			showDeleteContactModal: false
		}
		this.closeAddContactModal = this.closeAddContactModal.bind(this)
		this.openAddContactModal = this.openAddContactModal.bind(this)
		this.showAllContacts = this.showAllContacts.bind(this)
		this.showTextContacts = this.showTextContacts.bind(this)
		this.showEmailContacts = this.showEmailContacts.bind(this)
		this.showSlackContacts = this.showSlackContacts.bind(this)
		this.renderRecipients = this.renderRecipients.bind(this)
		this.editContact = this.editContact.bind(this)
		this.deleteContact = this.deleteContact.bind(this)
		this.closeDeleteContactModal=this.closeDeleteContactModal.bind(this)
	}

	closeAddContactModal () {
		this.setState({showAddContactModal: false, contactToEdit: null})
	}
	openAddContactModal() {
		this.setState({showAddContactModal: true, contactToEdit: null})
	}

	editContact(contact) {
		this.setState({showAddContactModal: true, contactToEdit: contact})
	}

	deleteContact(contact) {
		this.setState({showDeleteContactModal: true, contactToDelete: contact})
	}

	closeDeleteContactModal() {
		this.setState({showDeleteContactModal: false, contactToDelete: null})
	}

	showAllContacts() {
		this.setState({showType: "all"})
	}

	showTextContacts() {
		this.setState({showType: "text"})
	}

	showEmailContacts() {
		this.setState({showType: "email"})
	}

	showSlackContacts() {
		this.setState({showType: "slack"})
	}

	renderRecipients(recipient) {
		return(
				<AddressBookItem key={recipient.id} contact = {recipient} editContact={this.editContact} deleteContact={this.deleteContact} />
	 	 	)
	}

	render() {
		let recipientsToRender = 
		this.state.showType === "text" ? this.props.userRecipients.filter(rec=>rec.mediumType==="T") :
		this.state.showType === "email" ? this.props.userRecipients.filter(rec=>rec.mediumType==="E") :
		this.state.showType === "slack" ? this.props.userRecipients.filter(rec=>rec.mediumType==="S") :
		this.props.userRecipients
		return (
			<div>
				<FlatButton className="standardButton" backgroundColor="darkgray" type="button"  labelStyle={{ color: 'white', marginLeft: 20+'px'}} label="All" onClick={this.showAllContacts} />
				<FlatButton className="standardButton" backgroundColor="darkgray" type="button"  labelStyle={{ color: 'white'}} label="Texts" onClick={this.showTextContacts} />
				<FlatButton className="standardButton" backgroundColor="darkgray" type="button"  labelStyle={{ color: 'white'}} label="Emails" onClick={this.showEmailContacts} />
				{/*<FlatButton className="standardButton" backgroundColor="darkgray" type="button"  labelStyle={{ color: 'white'}} label="Slack" onClick={this.showSlackContacts} />*/}

				<Grid className= "scrollGrid">
					<Row className = "tableHeader column">
						<Col md={4}>Name</Col>
						<Col md={3}>Medium</Col>
						<Col md={4}>Contact Info</Col>
					</Row>
					{recipientsToRender.map(this.renderRecipients)}
				</Grid>
				<RaisedButton type="button" label="add a new contact" backgroundColor="#270943" labelStyle={{ color: 'white' }} className="footerButton"
				onClick={this.openAddContactModal}/>
				{this.state.showAddContactModal ? 
				<AddContactModal close={this.closeAddContactModal} show={this.state.showAddContactModal} initialData={this.state.contactToEdit}/> 
				: this.state.showDeleteContactModal ?
				<DeleteContactModal show={this.state.showDeleteContactModal} close={this.closeDeleteContactModal} contactToDelete={this.state.contactToDelete}/>
				:<div></div>}
			</div>
		)
	}
}
function mapStateToProps({ atexta }) {
	return { userRecipients: atexta.userRecipients };
}

export default connect(mapStateToProps)(AddressBook)
