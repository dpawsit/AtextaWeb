import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class MessageList extends React.Component {
	constructor(props) {
		super(props)

		this.renderMessages = this.renderMessages.bind(this)
	}

	renderMessages(message) {
		return(
			<tr key={message.trigger}>
				<td><div contentEditable>{message.trigger}</div></td>
				<td>{message.medium}</td>
				<td>{message.text}</td>
				<td>{message.group}</td>
			</tr>
	 	 	)

	}
	render() {
		const style = {
		  marginRight: 20,
		};
		let exampleMessages = [{
			trigger: 'Running Late',
			medium: 'Slack',
			text: 'there was a meteor on the 405, imma be 10 mins late',
			group: 'hrla12'
		}, {
			trigger: 'order food',
			medium: 'Text',
			text: 'I\'ll be home in 10 mins, please order me some pizza',
			group: 'wife'
		}]
		return (
			<div>
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
						{exampleMessages.map(this.renderMessages)}
					</tbody>
				</table>
				<RaisedButton type="button" label="add new Sean did this" secondary={true} />
			</div>
		)
	}
}

export default MessageList