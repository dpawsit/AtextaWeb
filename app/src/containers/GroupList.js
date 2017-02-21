import React from 'react'
import AddGroupModal from './AddGroupModal'
import { FloatingActionButton, RaisedButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux'
import { getUserGroups } from '../actions/atexta_actions'

class GroupList extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			showAddGroupModal: false
		}
		this.renderGroups = this.renderGroups.bind(this)
		this.closeAddGroupModal = this.closeAddGroupModal.bind(this)
		this.openAddGroupModal = this.openAddGroupModal.bind(this)
	}

	closeAddGroupModal () {
		this.setState({showAddGroupModal: false})
	}
	openAddGroupModal() {
		this.setState({showAddGroupModal: true})
	}

	renderGroups(group) {
		let medium = group.mediumType === 'T' ? 'Text' : 
			group.mediumType === 'S' ? 'Slack' :
			group.mediumType === 'E' ? 'Email' :
			'none'

		function renderPeople(recipient) {
			return(
				<li key={recipient.name}>{recipient.name}</li>
			)
		}

		return(
			<tr key={group.name}>
	      <td contentEditable>{group.name}</td>
	      <td>{medium}</td>
	      <td>
	      <ul>
	      	{group.recipients.map(renderPeople)}
	      </ul>
				</td>
	 	 	</tr>	
	 	 	)

	}
	render() {
		console.log('this users groups in grouplist are', this.props.userGroups)
		return (
			<div>
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Medium</th>
							<th>People</th>
						</tr>
					</thead>
					<tbody>
						{this.props.userGroups.map(this.renderGroups)}
					<RaisedButton type="button" label="add a new one" secondary={true} 
					onClick={this.openAddGroupModal}/>
					</tbody>
				</table>
				{this.state.showAddGroupModal ? 
				<AddGroupModal close={this.closeAddGroupModal} show={this.state.showAddGroupModal}/> : <div></div>}
			</div>
		)
	}
}

function mapStateToProps({ atexta }) {
	return { userId: atexta.userId, userGroups: atexta.userGroups };
}

export default connect(mapStateToProps, {getUserGroups})(GroupList)