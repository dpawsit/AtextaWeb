import React from 'react'
import { FloatingActionButton, RaisedButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux'

class GroupList extends React.Component {
	constructor(props) {
		super(props)

		this.renderGroups = this.renderGroups.bind(this)
	}

	renderGroups(message) {
		return(
			<tr key={message.trigger}>
	      <td contentEditable>{message.group.name}</td>
	      <td>some list of people 						
	      		<FloatingActionButton mini={true}>
				      <ContentAdd />
				    </FloatingActionButton>
				</td>
	      <td>{message.group.medium}</td>
	      <td>{message.trigger}</td>
	 	 	</tr>	
	 	 	)

	}
	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>People</th>
						<th>Medium</th>
						<th>Triggers Associated?</th>
					</tr>
				</thead>
				<tbody>
					{this.props.messages.map(this.renderGroups)}
				<RaisedButton type="button" label="add a new one" secondary={true} />
				</tbody>
			</table>
		)
	}
}

function mapStateToProps({ messages }) {
	return { messages };
}

export default connect(mapStateToProps)(GroupList)