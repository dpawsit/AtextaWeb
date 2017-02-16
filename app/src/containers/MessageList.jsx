import React from 'react'
import { RaisedButton } from 'material-ui'
import { connect } from 'react-redux'

class MessageList extends React.Component {
	constructor(props) {
		super(props)

		this.renderMessages = this.renderMessages.bind(this)
	}


	renderMessages(messages) {
		let groups = this.props.groups

		function renderMessage(message) {

			function renderGroups(group) {
				return(
					<option
					value={group.group}>{group.group}</option>
				)
			}
			return(
				<tr key={message.trigger}>
		      <td contentEditable>{message.trigger}</td>
		      <td>{message.group.medium}</td>
		      <td contentEditable>{message.text}</td>
		      <td>
			      	{message.group.name}
		      	<select>
			      	{groups.map(renderGroups)}
		      	</select>
		      </td>
		 	 	</tr>	
		 	 	)
		}
		return messages.map(renderMessage)
	}
	render() {
		const style = {
		  marginRight: 20,
		};

		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Trigger</th>
						<th>Medium</th>
						<th>Text</th>
						<th>Group</th>
					</tr>
				</thead>
				<tbody>
					{this.renderMessages(this.props.messages)}
					<tr>
						<RaisedButton type="button" label="add a new one" secondary={true} />
					</tr>
				</tbody>
			</table>
		)
	}
}

function mapStateToProps({ messages, groups }) {
	return { messages, groups };
}

export default connect(mapStateToProps)(MessageList)