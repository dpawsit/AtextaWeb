import React from 'react'
import axios from 'axios'
import { addGroup } from '../actions/atexta_actions'
import { connect } from 'react-redux'
import { Modal, ButtonToolbar, DropdownButton, MenuItem, Grid, Row, Col, Clearfix } from 'react-bootstrap'
import { RaisedButton, FlatButton, Step, StepButton, StepContent, StepLabel, Stepper } from 'material-ui'

class AddGroupModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 0,
			recipientsToAdd: [],
			newRecipientsToAdd: [],
			newGroupMedium: 'Select a medium',
			newGroupName: '',
			fetchedValidRecipients: false,
			validRecipients: []
		}
		this.stepDecider = this.stepDecider.bind(this)
		this.incrementStep = this.incrementStep.bind(this)
		this.addRecipientToGroup = this.addRecipientToGroup.bind(this)
		this.removeRecipientFromGroup = this.removeRecipientFromGroup.bind(this)
		this.selectMediumType = this.selectMediumType.bind(this)
		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleNameSubmit = this.handleNameSubmit.bind(this)
		this.fetchValidRecipients = this.fetchValidRecipients.bind(this)
		this.handleGroupSubmit = this.handleGroupSubmit.bind(this)
		this.decrementStep = this.decrementStep.bind(this)
	}

	fetchValidRecipients() {
		//refactor to a filter since recipients are on app state now
		let medium = this.state.newGroupMedium === 'Text' ? 'T' : 
		this.state.newGroupMedium === 'Slack' ? 'S' : this.state.newGroupMedium === 'Email' ? 'E' : null
		axios.get('groups/availableRecipients/' + this.props.userId + '/null/' + medium)
		.then(result=>{
			console.log('the result of fetchign valid recipients', result)
			this.setState({validRecipients: result.data, fetchedValidRecipients: true})
		})
		.catch(err=>{
			console.log('error fetching avilable recipients:', err)
		})

	}
	incrementStep() {
		if(this.state.step === 1) {
			this.fetchValidRecipients()
		}
		this.setState({step: this.state.step+1})
	}

	decrementStep() {
		const { step } = this.state
		if(step > 0) {
			this.setState({step: step-1})
		}
	}


	addRecipientToGroup(recipient) {
		let prevToAdd = this.state.recipientsToAdd
		let prevAvailable = this.state.validRecipients
		prevAvailable.splice(prevAvailable.indexOf(recipient), 1)
		prevToAdd.push(recipient)
		this.setState({recipientsToAdd: prevToAdd, validRecipients: prevAvailable})
	}

	removeRecipientFromGroup(recipient) {
		let prevToAdd = this.state.recipientsToAdd
		let prevAvailable = this.state.validRecipients
		prevToAdd.splice(prevToAdd.indexOf(recipient), 1)
		prevAvailable.push(recipient)
		this.setState({recipientsToAdd: prevToAdd, validRecipients: prevAvailable})
	}

	selectMediumType(medium) {
		//add a check
		this.setState({newGroupMedium: medium})
	}

	handleNameChange(event) {
    this.setState({newGroupName: event.target.value});
	}

	handleNameSubmit(event) {
		event.preventDefault()
		//check if it's empty, if so don't let them 
		this.incrementStep()
	}
	
	handleGroupSubmit() {
		let medium = this.state.newGroupMedium === 'Text' ? 'T' : 
		this.state.newGroupMedium === 'Slack' ? 'S' : this.state.newGroupMedium === 'Email' ? 'E' : null
		axios.post('/groups/addGroup', {
			groupInfo: {
				name: this.state.newGroupName,
				userId: this.props.userId,
				mediumType: medium
			},
			newRecipients: this.state.newRecipientsToAdd,
			savedRecipients: this.state.recipientsToAdd
		})
		.then(result=> {
			console.log('group added', result)
			this.props.addGroup({
				name: result.data.group.name,
				mediumType: result.data.group.mediumType,
				groupId: result.data.group.id,
				recipients: result.data.recipients.concat(this.state.recipientsToAdd)
			})
			if(this.props.fromAddMessageModal) {
				this.props.clickGroup(result.data.group.name, result.data.group.id)
			}
			this.props.close()
		})
		.catch(err=> {
			console.log('error submitting group:', err)
		})
	}

	stepDecider() {
		const renderAvailableRecipients = (recipient, i) => (
			<div key={i}>
				<Grid>
					<Row>
						<Col xs={5} md={5}>
							<li onClick = {()=>{this.addRecipientToGroup(recipient)}} 
							className = "centered colorBox">
							{recipient.name}
							</li>
						</Col>
						<Col xs={1} md={1}>
							<RaisedButton type="button" label="Edit >" secondary={true} />
						</Col>
					</Row>
				</Grid>
			</div>
		)
		const renderAddedRecipients = (recipient, i) => (
			<div key={i}>
				<Grid>
					<Row>
						<Col xs={5} md={5}>
							<li onClick = {()=>{this.removeRecipientFromGroup(recipient)}} 
							className = "centered colorBox">
							{recipient.name}
							</li>
						</Col>
						<Col xs={1} md={1}>
							<RaisedButton type="button" label="Edit >" secondary={true} />
						</Col>
					</Row>
				</Grid>
			</div>
		)
		switch(this.state.step) {
			case 0:
				return (
					<div>
						What medium is this?
						<ButtonToolbar>
				      <DropdownButton title={this.state.newGroupMedium} id="dropdown-size-medium">
				        <MenuItem eventKey="1" onSelect={()=> this.selectMediumType('Text')}>Text(Twilio)</MenuItem>
				        <MenuItem eventKey="2" onSelect={()=> this.selectMediumType('Slack')}>Slack</MenuItem>
				        <MenuItem eventKey="3" onSelect={()=> this.selectMediumType('Email')}>Email</MenuItem>
				      </DropdownButton>
				    </ButtonToolbar>
				    <br/>
						<FlatButton type="button" label="Cancel" onClick = {this.props.close}/>
						<RaisedButton type="button" label="Next" secondary={true} 
						onClick = {this.incrementStep}/>
					</div>
				)
			case 1:
				return (
					<div>
						<form onSubmit={this.handleNameSubmit}>
							<label>
								What do you want to name this group?
								<input value={this.state.newGroupName} onChange={this.handleNameChange} type='text' id='groupName' />
            	</label>
            </form>
						<FlatButton type="button" label="Back" onClick = {this.decrementStep}/>
						<RaisedButton type="button" label="Next" secondary={true} 
						onClick = {this.incrementStep}/>
					</div>
				)
			case 2:
				return this.state.fetchedValidRecipients ? (
					<div>
						who do you want to add to this group?
						<div className = "scrollable">
							Added so far:
							<ul>
								{this.state.recipientsToAdd.map(renderAddedRecipients)}
							</ul>
						</div>
						<div className = "scrollable">
							<ul>
								{this.state.validRecipients.map(renderAvailableRecipients)}
							</ul>
						</div>
						<FlatButton type="button" label="Back" onClick = {this.decrementStep} /> 
						<RaisedButton type="button" label="Submit" primary={true}
						onClick = {this.handleGroupSubmit}/>
					</div>
				) 
				:
				(<div>fetching your valid recipients....</div>)
			default:
				return (
					<div></div>
				)
		}
	}

	render() {
		return(
	    <Modal show={this.props.show} bsSize="large" onHide={this.props.close}>
	    	<Modal.Header closeButton>
	    		<Modal.Title>Add a group</Modal.Title>
	    	</Modal.Header>
	    	<Modal.Body>
	    		{this.stepDecider()}
					<Stepper activeStep={this.state.step}>
						<Step>
							<StepLabel>
								Choose the medium
							</StepLabel>
						</Step>
						<Step>
							<StepLabel>
								Name the group
							</StepLabel>
						</Step>
						<Step>
							<StepLabel>
								Select people from your address book
							</StepLabel>
						</Step>
					</Stepper>
	   		</Modal.Body>
	    </Modal>
		)
	}
}

function mapStateToProps({ atexta }) {
	return ({ userId: atexta.userId, userGroups: atexta.userGroups })
}

export default connect(mapStateToProps, {addGroup})(AddGroupModal)
