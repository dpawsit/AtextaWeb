import React from 'react'
import axios from 'axios'
import { addGroup, editGroup } from '../actions/atexta_actions'
import { connect } from 'react-redux'
import { Modal, ButtonToolbar, DropdownButton, MenuItem, Grid, Row, Col, Clearfix } from 'react-bootstrap'
import { RaisedButton, FlatButton, Step, StepButton, StepContent, StepLabel, Stepper, Table, TableBody, TableRow, TableRowColumn, TableHeader, TableFooter } from 'material-ui'


class AddGroupModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 0,
			recipientsToAdd: [],
			// newRecipientsToAdd: [], this happens in another component now
			newGroupMedium: 'Select a medium',
			newGroupName: '',
			fetchedValidRecipients: false,
			validRecipients: [],
			recipientsToAddQueue: [],
			recipientsToRemoveQueue: []
		}
		this.componentWillMount = this.componentWillMount.bind(this)
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
		this.addRecipientToQueue = this.addRecipientToQueue.bind(this)
		this.removeRecipientFromQueue = this.removeRecipientFromQueue.bind(this) 	
	}

	componentWillMount() {
		if(this.props.initialData) {
			const medium = this.props.initialData.mediumType === 'T' ? 'Text' :
			this.props.initialData.mediumType === 'E' ? 'Email' :
			this.props.initialData.mediumType === 'S' ? 'Slack' : 'Select a medium'
			console.log('inside here', this.props.initialData)
			this.setState({
				newGroupMedium: medium,	
				newGroupName: this.props.initialData.name,
				recipientsToAdd: this.props.initialData.recipients.slice(),
				step: 1
			})
		}
	}

	fetchValidRecipients() {
		//REFACTOR to a filter since recipients are on app state now
		let medium = this.state.newGroupMedium === 'Text' ? 'T' : 
		this.state.newGroupMedium === 'Slack' ? 'S' : this.state.newGroupMedium === 'Email' ? 'E' : null
		axios.get('groups/availableRecipients/' + this.props.userId + '/null/' + medium)
		.then(result=>{
			let uniqueResults = []
			//welp this time complexity sucks, change to objects later
			for(let i = 0; i<result.data.length; i++) {
				let flag = false;
				for(let j = 0; j<this.state.recipientsToAdd.length; j++) {
					if(this.state.recipientsToAdd[j].id === result.data[i].id) {
						flag = true
						break;
					}
				}
				if(!flag) uniqueResults.push(result.data[i])
			}
			console.log(result.data)
			this.setState({validRecipients: uniqueResults, fetchedValidRecipients: true})
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

	addRecipientToQueue(indexes) {
		indexes = indexes === 'none' ? [] : indexes
 		this.setState({recipientsToAddQueue: indexes})
	}

	removeRecipientFromQueue(indexes) {
		console.log('queried me', indexes)
		indexes = indexes === 'none' ? [] : indexes
		this.setState({recipientsToRemoveQueue: indexes})
	}

	addRecipientToGroup() {
		let indexesOfValidRec = this.state.recipientsToAddQueue.slice()
		console.log('trying to add', indexesOfValidRec)
		let prevToAdd = this.state.recipientsToAdd.slice()
		let prevAvailable = this.state.validRecipients.slice()
		if(indexesOfValidRec==='all') {
			this.setState({recipientsToAdd: prevToAdd.concat(prevAvailable), validRecipients: []})
		} else {
			//iterate backwards because indexes are ordered upwards, and push before splice
			for(let i = indexesOfValidRec.length-1; i>=0; i--) {
				prevToAdd.push(prevAvailable[indexesOfValidRec[i]])
				prevAvailable.splice(indexesOfValidRec[i], 1)
			}
		}
		this.setState({recipientsToAdd: prevToAdd, validRecipients: prevAvailable})
	}

	removeRecipientFromGroup() {
		let indexesOfRecToAdd = this.state.recipientsToRemoveQueue.slice()
		console.log('trying to remove', indexesOfRecToAdd)
		let prevToAdd = this.state.recipientsToAdd.slice()
		let prevAvailable = this.state.validRecipients.slice()
		if(indexesOfRecToAdd==='all') {
			this.setState({recipientsToAdd: [], validRecipients: prevAvailable.concat(prevToAdd)})
		} else {
			for(let i = indexesOfRecToAdd.length-1; i>=0; i--) {
				prevAvailable.push(prevToAdd[indexesOfRecToAdd[i]])
				prevToAdd.splice(indexesOfRecToAdd[i], 1)
			}
		}
		this.setState({recipientsToAdd: prevToAdd, validRecipients: prevAvailable})
	}

	selectMediumType(medium) {
		//add a check if that matches
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
		if(this.props.initialData) {
			//this is an edit request
			this.props.editGroup({
				name: this.state.newGroupName,
				mediumType: this.props.initialData.mediumType,
				groupId: this.props.initialData.groupId,
				recipients: this.state.recipientsToAdd
			})
			this.props.close()
			console.log('recognized as an edit request')
			const editedGroup = {
				name: this.state.newGroupName,
				mediumType: medium,
				groupId: this.props.initialData.groupId,
				savedRecipients: this.state.recipientsToAdd,
				newRecipients: []
			}

			if(this.state.newGroupName !== this.props.initialData.name) {
				axios.put('/groups/groupName', {
					groupId: this.props.initialData.groupId,
					groupName: this.state.newGroupName
				})
				.then(result=>{

				})
				.catch(err=>{

				})
			}

			let toDelete = []
			this.props.initialData.recipients.forEach(initialRecipient => {
				let found = false;
				this.state.recipientsToAdd.forEach(currentRecipient => {
					if(currentRecipient.id === initialRecipient.id) found = true
				})
				if(!found) toDelete.push(initialRecipient.id)
			})

			let toAdd = []
			this.state.recipientsToAdd.forEach(Irecipient => {
				let found = false;
				this.props.initialData.recipients.forEach(Jrecipient => {
					if(Jrecipient.id === Irecipient.id) found = true
				})
				if(!found) toAdd.push(Irecipient.id)
			}) 

			if(toDelete.length) {
				console.log('attempting to delete', toDelete)
				axios.delete('/groups/groupRecipients', {params : {groupId : this.props.initialData.groupId, recipients: toDelete}
				})
				.then(result=>{
					console.log('result of deleting recipients', result)
				})
				.catch(error=>{
					console.log('error eleting group recipients', error)
				})
			}


			if(toAdd.length) {
				console.log('attempintg to add', toAdd)
				axios.put('/groups/linkRecipient', {
						groupId: this.props.initialData.groupId,
						recipients: toAdd
				})
				.then(result=>{
				})
				.catch(error=>{

				})
			}

		} else {
			axios.post('/groups/addGroup', {
				groupInfo: {
					name: this.state.newGroupName,
					userId: this.props.userId,
					mediumType: medium
				},
				newRecipients: [],
				savedRecipients: this.state.recipientsToAdd
			})
			.then(result=> {
				console.log('group added', result)
				this.props.addGroup({
					name: result.data.group.name,
					mediumType: result.data.group.mediumType,
					groupId: result.data.group.id,
					recipients: this.state.recipientsToAdd
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
	}

	stepDecider() {
		const renderAvailableRecipients = (recipient, i) => {
			return(
			<TableRow key={i} selected={false}>
				<TableRowColumn>{recipient.name}</TableRowColumn>
			</TableRow>
			)}
		const renderAddedRecipients = (recipient, i) => (
			<TableRow key={i} selected={false}>
				<TableRowColumn>{recipient.name}</TableRowColumn>
			</TableRow>
		)
		switch(this.state.step) {
			case 0:
				return (
					<div>
						<strong>What medium is this?</strong>
						<p></p>
						<ButtonToolbar>
				      <DropdownButton title={this.state.newGroupMedium} id="dropdown-size-medium">
				        <MenuItem eventKey="1" onSelect={()=> this.selectMediumType('Text')}>Text(Twilio)</MenuItem>
				        <MenuItem eventKey="2" onSelect={()=> this.selectMediumType('Slack')}>Slack</MenuItem>
				        <MenuItem eventKey="3" onSelect={()=> this.selectMediumType('Email')}>Email</MenuItem>
				      </DropdownButton>
				    </ButtonToolbar>
					</div>
				)
			case 1:
				return (
					<div>
						<form onSubmit={this.handleNameSubmit}>
							<label>
								What do you want to name this group?
								<input 
									value={this.state.newGroupName} 
									onChange={this.handleNameChange} 
									type='text' 
									id='groupName' 
									maxLength = "30"
								/>
            	</label>
            </form>
					</div>
				)
			case 2:
				let removeButton = <RaisedButton key="removeRec" label=">" onTouchTap={this.removeRecipientFromGroup} style={{padding : '2px'}}/>
				let addButton = <RaisedButton key="addRec" label="<" onTouchTap={this.addRecipientToGroup} style={{padding : '2px'}}/>								
				return this.state.fetchedValidRecipients ? (
					<div>
						<Grid>
							<Row>
								<Col md={4}>
									<Table height={400+'px'} selectable={true} multiSelectable={true}
									onRowSelection = {this.removeRecipientFromQueue}>
										<TableBody displayRowCheckbox={true} showRowHover={true}>
											{this.state.recipientsToAdd.map(renderAddedRecipients)}
										</TableBody>
										<TableFooter>
											<TableRow>
												<TableRowColumn>
													Added so far
												</TableRowColumn>
												<TableRowColumn>
													{removeButton}
												</TableRowColumn>
											</TableRow>
										</TableFooter>
									</Table>
									
								</Col>
								<Col md={4}>
									<Table height={400+'px'} selectable={true} multiSelectable={true}
									onRowSelection = {this.addRecipientToQueue}>
										<TableBody displayRowCheckbox={true} showRowHover={true}>
											{this.state.validRecipients.map(renderAvailableRecipients)}
										</TableBody>
										<TableFooter>
											<TableRow>
												<TableRowColumn>
													{addButton}
												</TableRowColumn>
												<TableRowColumn>
													All available
												</TableRowColumn>
											</TableRow>
										</TableFooter>
									</Table>
									
								</Col>
							</Row>
						</Grid>
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
	    		<Modal.Title>Update your group</Modal.Title>
	    	</Modal.Header>
	    	<Modal.Body>
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
	    		{this.stepDecider()}
	   		</Modal.Body>
				<Modal.Footer>
					{/*REFACTOR = if it's edit mode, don't let them change the medium*/}
					<FlatButton type="button" label={this.state.step === 0 ? "Cancel" : "Back" } 
					onClick={this.state.step === 0 ? this.props.close : this.decrementStep}/>
					<RaisedButton type="button" label={this.state.step=== 2 ? "Submit" : "Next"}
					backgroundColor="#270943" labelStyle={{ color: 'white' }}
					onClick = {this.state.step === 2 ? this.handleGroupSubmit : this.incrementStep}/>
				</Modal.Footer>
	    </Modal>
		)
	}
}

function mapStateToProps({ atexta }) {
	return ({ userId: atexta.userId, userGroups: atexta.userGroups })
}

export default connect(mapStateToProps, {addGroup, editGroup})(AddGroupModal)
