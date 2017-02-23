import React from 'react'
import axios from 'axios'
import { RaisedButton } from 'material-ui'
import { connect } from 'react-redux'
import AddMessageModal from './AddMessageModal'


class MessageList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showAddMessageModal: false,
			commandToEdit: undefined
		}	
		
		this.renderCommands = this.renderCommands.bind(this)
		this.editMessage = this.editMessage.bind(this)
		this.openAddMessageModal = this.openAddMessageModal.bind(this)
		this.closeAddMessageModal = this.closeAddMessageModal.bind(this)
	}

	closeAddMessageModal() {
		this.setState({commandToEdit: undefined, showAddMessageModal: false})
	}

	openAddMessageModal() {
		this.setState({commandToEdit: undefined, showAddMessageModal: true})
	}

	editMessage(command) {
		this.setState({commandToEdit: command, showAddMessageModal: true})	
	}

	renderCommands(command, i) {
		return(
			<tr key={i} onClick={()=>{this.editMessage(command)}}>
				<td>{command.commandName}</td>
				<td>{command.text}</td>
				<td>
						{command.groupName}
				</td>
			</tr>	
		)
	}

	render() {
		return(
			<div>
				<table className="table">
					<thead>
						<tr id="columnLabel">
							<th>Trigger</th>
							<th>Text</th>
							<th>Group</th>
						</tr>
					</thead>
					<tbody>
						{this.props.userCommands.map(this.renderCommands)}
					</tbody>
				</table>
				<RaisedButton type="button" label="add a new one" secondary={true} 
				onClick={this.openAddMessageModal} />
				{this.state.showAddMessageModal ? <AddMessageModal close={this.closeAddMessageModal}
					show={this.state.showAddMessageModal} initialData={this.state.commandToEdit}/> : <div></div>}
			</div>
		)
	}
}

function mapStateToProps({ atexta }) {
	return { userCommands: atexta.userCommands };
}

export default connect(mapStateToProps)(MessageList)