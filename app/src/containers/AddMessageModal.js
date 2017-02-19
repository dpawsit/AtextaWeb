import React from 'react'
import { connect } from 'react-redux'
import { Modal, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'

class AddMessageModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 1,
			selectedGroup: ''
		}
		this.stepDecider = this.stepDecider.bind(this)
		this.incrementStep = this.incrementStep.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.clickGroup = this.clickGroup.bind(this)
	}

	incrementStep() {
		this.setState({step: this.state.step+1})
	}

	closeModal() {
		this.setState({showModal: false})
	}

	clickGroup(group) {
		this.setState({selectedGroup: group})
	}

	stepDecider() {
		const renderGroups = (group) => (
				<li onClick = {()=>{this.clickGroup(group.name)}}className = "centered colorBox">{group.name}</li>
			)
		switch(this.state.step) {
			case 1:
				return (
					<div>
						<form>
							<label>
								What do you want to name this trigger?
								<input type='text' id='groupName' />
            	</label>
            </form>
						<RaisedButton type="button" label="Cancel" secondary={true} 
						onClick = {this.closeModal}/>
						<RaisedButton type="button" label="Next" secondary={true} 
						onClick = {this.incrementStep}/>
					</div>
				)
			case 2:
				return (
					<div>
						<form>
							<label>
								Input the text you want to send
								<input type='text' id='groupName' />
            	</label>
            </form>
						<RaisedButton type="button" label="Cancel" secondary={true} 
						onClick = {this.closeModal}/>
						<RaisedButton type="button" label="Next" secondary={true} 
						onClick = {this.incrementStep}/>
					</div>
				)
			case 3:
				return(
					<div>
						Select the group you want {this.state.selectedGroup}
						<div className = "scrollable">
							<ul>
								{this.props.groups.map(renderGroups)}
							</ul>
						<RaisedButton type="button" label="Add new group" 
						onClick = {this.incrementStep}/>
						<RaisedButton type="button" label="Submit" 
						onClick = {this.closeModal}/>
						</div>
					</div>
				)
			default:
				return (
					<div></div>
				)
		}
	}

	render() {
		return(
	    <Modal show={this.props.show} onHide={this.props.close}>
	    	<Modal.Header closeButton>
	    		<Modal.Title>Add a message</Modal.Title>
	    	</Modal.Header>
	    	<Modal.Body>
	    		{this.stepDecider()}
	   		</Modal.Body>
	    </Modal>
		)
	}
}

function mapStateToProps({ groups }) {
	return { groups };
}

export default connect(mapStateToProps)(AddMessageModal)