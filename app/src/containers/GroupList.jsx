import React from 'react'
import { FloatingActionButton, RaisedButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux'

class GroupList extends React.Component {
	constructor(props) {
		super(props)

		this.renderGroups = this.renderGroups.bind(this)
	}

	renderGroups(group) {
		function renderPeople(person) {
			return(
				<li>{person}</li>
			)
		}
		return(
			<tr key={group.group}>
	      <td contentEditable>{group.group}</td>
	      <td>
	      <ul>
	      	{group.people.map(renderPeople)}
	      </ul>
				</td>
	      <td>does group table have this?</td>
	      <td>does group table have this?</td>
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
					{this.props.groups.map(this.renderGroups)}
				<RaisedButton type="button" label="add a new one" secondary={true} />
				</tbody>
			</table>
		)
	}
}

function mapStateToProps({ messages, people, groups }) {
	return { messages, people, groups };
}

export default connect(mapStateToProps)(GroupList)