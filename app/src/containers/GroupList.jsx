import React from 'react'
 
class GroupList extends React.Component {
	constructor(props) {
		super(props)

		this.renderGroups = this.renderGroups.bind(this)
	}

	renderGroups(group) {
		return(
			<tr key={group.trigger}>
	      <td><div contenteditable>{group.trigger}</div></td>
	      <td>{group.medium}</td>
	      <td>{group.text}</td>
	      <td>{group.group}</td>
	      <td><button type="button">Add a group</button></td>
	 	 	</tr>	
	 	 	)

	}
	render() {
		let exampleGroups = [{
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
					{exampleGroups.map(this.renderGroups)}
					<tr>
						<td>empty rows for addition?</td>
					</tr>
				</tbody>
			</table>
		)
	}
}

export default GroupList