import React from 'react'
import AddContactModal from './AddContactModal'
import { FlatButton, RaisedButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'


class AddressBook extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			showAddContactModal: false,
			showType: "all"
		}
		this.closeAddContactModal = this.closeAddContactModal.bind(this)
		this.openAddContactModal = this.openAddContactModal.bind(this)
		this.showAllContacts = this.showAllContacts.bind(this)
		this.showTextContacts = this.showTextContacts.bind(this)
		this.showEmailContacts = this.showEmailContacts.bind(this)
		this.showSlackContacts = this.showSlackContacts.bind(this)
		this.renderRecipients = this.renderRecipients.bind(this)
	}

	closeAddContactModal () {
		this.setState({showAddContactModal: false})
	}
	openAddContactModal() {
		this.setState({showAddContactModal: true})
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
		let medium = recipient.mediumType === 'T' ? 'Text' : 
			recipient.mediumType === 'S' ? 'Slack' :
			recipient.mediumType === 'E' ? 'Email' :
			'none'

		return(
			<Row key={recipient.id} className="hoverable column">
	      <Col md={3}>{recipient.name}</Col>
	      <Col md={3}>{medium}</Col>
	      <Col md={4}>{recipient.contactInfo}</Col>
	 	 	</Row>	
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
				<FlatButton type="button" label="All" onClick={this.showAllContacts} />
				<FlatButton type="button" label="Texts" onClick={this.showTextContacts} />
				<FlatButton type="button" label="Emails" onClick={this.showEmailContacts} />
				<FlatButton type="button" label="Slack" onClick={this.showSlackContacts} />

				<Grid className= "scrollGrid">
					<Row className = "tableHeader column">
						<Col md={3}>Name</Col>
						<Col md={3}>Medium</Col>
						<Col md={4}>Contact Info</Col>
					</Row>
					{recipientsToRender.map(this.renderRecipients)}
				</Grid>
				<RaisedButton type="button" label="add a new contact" backgroundColor="#270943" labelStyle={{ color: 'white' }} className="footerButton"
				onClick={this.openAddContactModal}/>
				{this.state.showAddContactModal ? 
				<AddContactModal close={this.closeAddContactModal} show={this.state.showAddContactModal}/> : <div></div>}
			</div>
		)
	}
}
function mapStateToProps({ atexta }) {
	return { userRecipients: atexta.userRecipients };
}

export default connect(mapStateToProps)(AddressBook)
