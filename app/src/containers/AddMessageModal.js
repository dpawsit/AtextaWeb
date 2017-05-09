import React from 'react'
import axios from 'axios'
import AddGroupModal from './AddGroupModal'
import { connect } from 'react-redux'
import { Modal, ButtonToolbar, DropdownButton, MenuItem, Well } from 'react-bootstrap'
import { RaisedButton, FlatButton, Step, StepButton, StepContent, StepLabel, Stepper, List, ListItem } from 'material-ui'
import { addCommand, editCommand } from '../actions/atexta_actions'
import TextIcon from 'material-ui/svg-icons/communication/chat'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import {lengthExceedsMaxTrigger, triggerLengthIsTooShort} from '../utils/formValidation'

class AddMessageModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 0,
			selectedGroup: this.props.initialData.groupName,
			selectedGroupId: this.props.initialData.groupId,
			newCommandName: this.props.initialData.commandName,
			newCommandText: this.props.initialData.text,
			addingNewGroup: false,
			nameTooLong: false,
			nameTooShort: true
		}
		this.componentDidMount = this.componentDidMount.bind(this)
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

	componentDidMount() {
		if(this.state.newCommandName.length) {
			this.setState({nameTooShort: false})
		}
	}

	handleNameChange(event) {
    this.setState({newCommandName: event.target.value});
		if(lengthExceedsMaxTrigger(event.target.value)) {
			this.setState({nameTooLong:true, nameTooShort:false})
		} else if(triggerLengthIsTooShort(event.target.value)) {
			this.setState({nameTooLong: false, nameTooShort: true})
		} else {
			this.setState({nameTooLong:false, nameTooShort: false})
		}
	}

	handleNameSubmit(event) {
		event.preventDefault()
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
					// console.log('error updating name:', err)
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
			
			axios.post('command/newCommand', {
				newCommand
			})
			.then(result=>{
				// console.log('resulting command', result)
				this.props.addCommand({
					id: result.data.id,
					commandName: result.data.name,
					userId: result.data.userId,
					groupName: this.state.selectedGroup,
					groupId: result.data.groupId,
					text: this.state.newCommandText,
					additionalContent: null,
					verified: result.data.verified
				})
			})
			.catch(err=>{
				// console.log('error submitting command', err)
			})
			this.props.close()
		}
	}

	incrementStep() {
		if(this.state.nameTooLong || this.state.nameTooShort) {
			window.alert('Please fix the name of this trigger')
		}  else {
			this.setState({step: this.state.step+1})
		}
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
		const renderGroups = (groupName, groupId, mediumType, index) => {
			return(
				<ListItem key={index} onClick={()=>{this.clickGroup(groupName, groupId)}} primaryText={groupName} className="centered"
				leftIcon={mediumType==='T' ? <TextIcon /> : mediumType==='E' ? <EmailIcon /> : <strong>Slack</strong>} />
			)
		}
		switch(this.state.step) {
			case 0:
				return (
					<div>
						<form onSubmit={this.handleNameSubmit} className="modalForms" autoComplete="off">
							<label>
								What do you want to name this trigger?
								<input 
									required={true}  
									value={this.state.newCommandName} 
									type='text' 
									id='groupName' 
									onChange={this.handleNameChange} 
								/>
            	</label>
            </form>
						{this.state.nameTooLong ? <p className="warnings">Please choose a shorter trigger - if a trigger is too long Alexa loses accuracy</p> : 
						this.state.nameTooShort ? <p className="warnings">This input is required</p> : 
						<p>&nbsp;</p>}
					</div>
				)
			case 1:
				return (
					<div>
						<form onSubmit={this.handleTextSubmit} autoComplete="on">
							<label>
								Input the text you want to send
								<input 
									value={this.state.newCommandText} 
									type='text' 
									id='groupName' 
									onChange={this.handleTextChange}
									maxLength="139"
								/>
            	</label>
            </form>
						<br/>
					</div>
				)
			case 2:
				return(
					<div>
						Select the group you want:  <strong><em>{this.state.selectedGroup}</em></strong>
						<div className = "scrollable">
							<Well bsSize="large">
								<List>
									{this.props.userGroups.map((group, index) => (
										renderGroups(group.name, group.groupId, group.mediumType, index)
									))}
								</List>
							</Well>
						</div>
						<RaisedButton type="button" label="Create a new group" backgroundColor="darkgrey" labelStyle={{color: 'white'}}
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
	    		{this.stepDecider()}
	   		</Modal.Body>
				<Modal.Footer>
					<FlatButton type="button" label={this.state.step === 0 ? "Cancel" : "Back" } 
					onClick={this.state.step === 0 ? this.props.close : this.decrementStep}/>
					<RaisedButton type="button" label={this.state.step=== 2 ? "Submit" : "Next"}
					backgroundColor="#270943" labelStyle={{ color: 'white' }}
					onClick = {this.state.step === 2 ? this.handleCommandSubmit : this.incrementStep}/>
				</Modal.Footer>
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