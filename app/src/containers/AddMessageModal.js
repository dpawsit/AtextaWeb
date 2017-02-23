import React from 'react'
import axios from 'axios'
import AddGroupModal from './AddGroupModal'
import { connect } from 'react-redux'
import { Modal, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
import { RaisedButton, FlatButton, Step, StepButton, StepContent, StepLabel, Stepper } from 'material-ui'
import { addCommand, editCommand } from '../actions/atexta_actions'

class AddMessageModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 0,
			selectedGroup: this.props.initialData.groupName,
			selectedGroupId: this.props.initialData.groupId,
			newCommandName: this.props.initialData.commandName,
			newCommandText: this.props.initialData.text,
			addingNewGroup: false
		}
		this.stepDecider = this.stepDecider.bind(this)
		this.incrementStep = this.incrementStep.bind(this)
		this.clickGroup = this.clickGroup.bind(this)
		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleCommandSubmit = this.handleCommandSubmit.bind(this)
		this.handleNameSubmit = this.handleNameSubmit.bind(this)
		this.handleTextSubmit = this.handleTextSubmit.bind(this)
		this.decrementStep = this.decrementStep.bind(this)
		this.handleNewGroup = this.handleNewGroup.bind(this)
		this.handleNewGroupClose = this.handleNewGroupClose.bind(this)
	}

	handleNameChange(event) {
    this.setState({newCommandName: event.target.value});
	}

	handleNameSubmit(event) {
		event.preventDefault()
		//check if it's empty, if so don't let them 
		this.incrementStep()
	}

	handleTextChange(event) {
		this.setState({newCommandText: event.target.value})
		//also check if empty
	}

	handleTextSubmit(event) {
		event.preventDefault()
		this.incrementStep()
	}

	handleNewGroup() {
		this.setState({addingNewGroup: true})
	}

	handleNewGroupClose() {
		this.setState({addingNewGroup: false})
	}

	handleCommandSubmit() {
		console.log('this is the command', this.state.selectedGroupId, this.state.newCommandName, this.state.newCommandText)
		if(this.props.initialData.id) {
			//this is an edit request
			const editedCommand = {
				commandName: this.state.newCommandName,
				userId: this.props.userId,
				groupName: this.state.selectedGroup,
				groupId: this.state.selectedGroupId,
				text: this.state.newCommandText,
				additionalContent: null
			}

			this.props.editCommand(editedCommand, this.props.initialData.id)

			if(this.state.newCommandName !== this.props.initialData.commandName) {
				//only update what has changed
				axios.put('command/updateName', {
					commandId: this.props.initialData.id,
					updateName: this.state.newCommandName
				})
				.then(result=> {
				})
				.catch(err=> {
					console.log('error updating name:', err)
				})
			}
			if(this.state.selectedGroupId !== this.props.initialData.groupId) {
				axios.put('command/updateGroup', {
					commandId: this.props.initialData.id,
					groupId: this.state.selectedGroupId
				})
				.then(result=>{
					
				})
				.catch(err=>{

				})
			}
			if(this.state.newCommandText !== this.props.initialData.text) {
				axios.post('command/newMessage/', {
					commandId: this.props.initialData.id,
					newMessage: {
						text: this.state.newCommandText,
						additionalContent: null
					}
				})
				.then(result=> {

				})
				.catch(err=>{

				})
			}
			this.props.close()
		} else {
			//this is a new command post request
			let newCommand = {
				name: this.state.newCommandName,
				userId: this.props.userId,
				groupId: this.state.selectedGroupId,
				text: this.state.newCommandText,
				additionalContent: null
			}

			let commandToAppend = {
				commandName: this.state.newCommandName,
				userId: this.props.userId,
				groupName: this.state.selectedGroup,
				text: this.state.newCommandText,
				additionalContent: null
			}

			axios.post('command/newCommand', {
				newCommand
			})
			.then(result=>{
				this.props.addCommand(commandToAppend)
			})
			.catch(err=>{
				console.log('error submitting command', err)
			})
			this.props.close()
		}
	}

	incrementStep() {
		this.setState({step: this.state.step+1})
	}

	decrementStep() {
		const { step } = this.state
		if(step > 0) {
			this.setState({step: step-1})
		}
	}

	clickGroup(group, id) {
		this.setState({selectedGroup: group, selectedGroupId: id})
	}

	stepDecider() {
		const renderGroups = (groupName, groupId, index) => {
			return(
				<li key={index} onClick = {()=>{this.clickGroup(groupName, groupId)}} className = "centered colorBox">{groupName}</li>
			)
		}
		switch(this.state.step) {
			case 0:
				return (
					<div>
						<form onSubmit={this.handleNameSubmit}>
							<label>
								What do you want to name this trigger?
								<input value={this.state.newCommandName} type='text' id='groupName' 
								onChange={this.handleNameChange} />
            	</label>
            </form>
						<FlatButton type="button" label="Cancel" onClick = {this.props.close}/>
						<RaisedButton type="button" label="Next" secondary={true} 
						onClick = {this.incrementStep}/>
					</div>
				)
			case 1:
				return (
					<div>
						<form onSubmit={this.handleTextSubmit}>
							<label>
								Input the text you want to send
								<input value={this.state.newCommandText} type='text' id='groupName' 
								onChange={this.handleTextChange}  />
            	</label>
            </form>
						<FlatButton type="button" label="Back" onClick = {this.decrementStep}/>
						<RaisedButton type="button" label="Next" secondary={true} 
						onClick = {this.incrementStep}/>
					</div>
				)
			case 2:
				return(
					<div>
						Select the group you want:  <span className="centered colorBox">{this.state.selectedGroup}</span>
						<div className = "scrollable">
							<ul>
								{this.props.userGroups.map((group, index) => (
									renderGroups(group.name, group.groupId, index)
								))}
							</ul>
						</div>
						<FlatButton type="button" label="Back" onClick = {this.decrementStep} /> 
						<RaisedButton type="button" label="Submit" primary={true}
						onClick = {this.handleCommandSubmit}/>
						<RaisedButton type="button" label="Create a new group" secondary={true}
						onClick = {this.handleNewGroup}/>
					</div>
				)
			default:
				return (
					<div></div>
				)
		}
	}

	render() {
		return this.state.addingNewGroup ? 
		(
			<AddGroupModal show={this.state.addingNewGroup} close={this.handleNewGroupClose}
			 fromAddMessageModal={true} clickGroup={this.clickGroup}/>
		)
		:
		(
	    <Modal show={this.props.show} onHide={this.props.close}>
	    	<Modal.Header closeButton>
	    		<Modal.Title>Add a message</Modal.Title>
	    	</Modal.Header>
	    	<Modal.Body>
	    		{this.stepDecider()}
					<Stepper activeStep={this.state.step}>
						<Step>
							<StepLabel>
								Choose the name
							</StepLabel>
						</Step>
						<Step>
							<StepLabel>
								Input the text
							</StepLabel>
						</Step>
						<Step>
							<StepLabel>
								Select a group (optional)
							</StepLabel>
						</Step>
					</Stepper>
	   		</Modal.Body>
	    </Modal>
		)
	}
}

AddMessageModal.defaultProps = {
	initialData: {
		commandName: '',
		groupId: null,
		groupname: '',
		text: ''
	}
}

function mapStateToProps({ atexta }) {
	return { userId: atexta.userId, userGroups: atexta.userGroups };
}

export default connect(mapStateToProps, {addCommand, editCommand})(AddMessageModal)