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
			<tr key={group.name}>
	      <td contentEditable>{group.name}</td>
	      <td>
	      <ul>
	      	{group.people.map(renderPeople)}
	      </ul>
				</td>
	      <td>does group table have this?</td>
	 	 	</tr>	
	 	 	)

	}
	render() {
		return(
			<div>at elast it's owrkign</div>
		)
		return (
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
				<RaisedButton type="button" label="add a new one" secondary={true} />
				</tbody>
			</table>
		)
	}
}

// function mapStateToProps({ atexta }) {
// 	return { userId: atexta.userId, userGroups: atexta.userGroups };
// }

// export default connect(mapStateToProps, {getUserGroups})(GroupList)