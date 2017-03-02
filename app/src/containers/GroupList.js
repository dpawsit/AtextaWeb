import React from 'react'
import AddGroupModal from './AddGroupModal'
import GroupItem from './GroupItem'
import ConfirmDeleteGroupModal from './ConfirmDeleteGroupModal'
import { FloatingActionButton, RaisedButton, FlatButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'


class GroupList extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			showAddGroupModal: false,
			showDeleteGroupModal: false,
			groupToEdit: undefined,
			groupToDelete: undefined
		}
		this.renderGroups = this.renderGroups.bind(this)
		this.closeAddGroupModal = this.closeAddGroupModal.bind(this)
		this.openAddGroupModal = this.openAddGroupModal.bind(this)
		this.editGroup = this.editGroup.bind(this)
		this.deleteGroup = this.deleteGroup.bind(this)
		this.closeDeleteGroupModal = this.closeDeleteGroupModal.bind(this)
	}

	closeAddGroupModal () {
		this.setState({showAddGroupModal: false, groupToEdit: undefined})
	}
	openAddGroupModal() {
		this.setState({showAddGroupModal: true, groupToEdit: undefined})
	}

	editGroup(group) {
		this.setState({groupToEdit: group, showAddGroupModal: true})
	}

	deleteGroup(group) {
		this.setState({groupToDelete: group, showDeleteGroupModal: true})
	}

	closeDeleteGroupModal() {
		this.setState({groupToDelete: undefined, showDeleteGroupModal: false})
	}

	renderGroups(group, i) {
		return(
			<GroupItem key={i} group={group} editGroup={this.editGroup} deleteGroup={this.deleteGroup} />
	 	 	)
	}
	
	render() {
		return(
			<div>
				<Grid className="scrollGrid">
					<Row className = "tableHeader">

						<Col md={11}>
							<Col className="column" md={2}>Name</Col>
							<Col className="column" md={1}></Col>
							<Col className="column" md={8}>Recipients</Col>
						</Col>

						<Col md={1}>
						</Col>
					</Row>
					{this.props.userGroups.map(this.renderGroups)}
				</Grid>
				<RaisedButton className="footerButton" type="button" label="Create a new group" 
				backgroundColor="#270943" labelStyle={{ color: 'white' }} onClick={this.openAddGroupModal} />
				{this.state.showAddGroupModal ?
				<AddGroupModal close={this.closeAddGroupModal} show={this.state.showAddGroupModal} initialData={this.state.groupToEdit}/> :
				this.state.showDeleteGroupModal ? 
				<ConfirmDeleteGroupModal close={this.closeDeleteGroupModal} show={this.state.showDeleteGroupModal} groupToDelete={this.state.groupToDelete} /> :
				null
				}
			</div>
		)
		return (
			<div>
				<table className="table">
					<thead>
						<tr id="columnLabel">
							<th>Name</th>
							<th>Medium</th>
							<th>People</th>
						</tr>
					</thead>
					<tbody>
						{this.props.userGroups.map(this.renderGroups)}
					</tbody>
				</table>
				<RaisedButton type="button" label="add a new one" secondary={true} 
				onClick={this.openAddGroupModal}/>
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
