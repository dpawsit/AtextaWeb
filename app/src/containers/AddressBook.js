import React from 'react'
import AddContactModal from './AddContactModal'
import { FloatingActionButton, RaisedButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux'

class AddressBook extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			showAddContactModal: false
		}
		// this.renderGroups = this.renderGroups.bind(this)
		this.closeAddContactModal = this.closeAddContactModal.bind(this)
		this.openAddContactModal = this.openAddContactModal.bind(this)
	}

	closeAddContactModal () {
		this.setState({showAddContactModal: false})
	}
	openAddContactModal() {
		this.setState({showAddContactModal: true})
	}

	renderRecipients(recipient) {
		let medium = recipient.mediumType === 'T' ? 'Text' : 
			recipient.mediumType === 'S' ? 'Slack' :
			recipient.mediumType === 'E' ? 'Email' :
			'none'

		return(
			<tr key={recipient.id}>
	      <td>{recipient.name}</td>
	      <td>{medium}</td>
	      <td>
	      {recipient.contactInfo}
				</td>
	 	 	</tr>	
	 	 	)
	}

	render() {
		return (
			<div>
				<table className="table">
					<thead>
						<tr id="columnLabel">
							<th>Name</th>
							<th>Medium</th>
							<th>Contact Info</th>
						</tr>
					</thead>
					<tbody>
						{this.props.userRecipients.map(this.renderRecipients)}
					</tbody>
				</table>
				<RaisedButton type="button" label="add a new one" secondary={true} 
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
