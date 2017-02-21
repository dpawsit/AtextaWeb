import React from 'react'
import AddGroupModal from './AddGroupModal'
import { FloatingActionButton, RaisedButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux'

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
		console.log('this group is', group)
		let medium = group.mediumType === 'T' ? 'Text' : 
			group.mediumType === 'S' ? 'Slack' :
			group.mediumType === 'E' ? 'Email' :
			'none'

		function renderPeople(recipient) {
			return(
				<RaisedButton key={recipient.name} label={recipient.name} primary={true} style={{size: 10+'%', margin: 5+'px'}}/>
			)
		}

		return(
			<tr key={group.name}>
	      <td contentEditable>{group.name}</td>
	      <td>{medium}</td>
	      <td>
	      {group.recipients.map(renderPeople)}
				</td>
	 	 	</tr>	
	 	 	)

	}
	render() {
		console.log('groups are', this.props.userGroups)
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
	return { userGroups: atexta.userGroups };
}

export default connect(mapStateToProps)(GroupList)
