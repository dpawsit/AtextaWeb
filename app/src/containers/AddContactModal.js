import React from 'react';
import axios from 'axios';
import { addContact, editContact } from '../actions/atexta_actions';
import { connect } from 'react-redux';
import {
	Modal,
	ButtonToolbar,
	DropdownButton,
	MenuItem,
	Grid,
	Row,
	Col,
	FormGroup,
	FormControl,
	ControlLabel
} from 'react-bootstrap';
import {
	RaisedButton,
	FlatButton,
	Step,
	StepButton,
	StepContent,
	StepLabel,
	Stepper
} from 'material-ui';
import slackLock from '../utils/SlackAuthService';

class AddContactModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      newContactName: '',
      newContactMedium: 'Select a medium',
      newContactInfo: '',
			slackName: '',
			slackChannels: null
    }
    this.incrementStep = this.incrementStep.bind(this)
    this.decrementStep = this.decrementStep.bind(this)
    this.stepDecider = this.stepDecider.bind(this)
    this.selectMediumType = this.selectMediumType.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleInfoChange = this.handleInfoChange.bind(this)
    this.handleNameSubmit = this.handleNameSubmit.bind(this)
    this.handleInfoSubmit = this.handleInfoSubmit.bind(this)
    this.handleContactSubmit = this.handleContactSubmit.bind(this)
		this.getSlackChannels = this.getSlackChannels.bind(this)
		this.renderChannels = this.renderChannels.bind(this)
		this.renderGroups = this.renderGroups.bind(this);
		this.renderUsers = this.renderUsers.bind(this);
		this.componentWillMount=this.componentWillMount.bind(this)
  }

	componentWillMount() {
		console.log(this.props.initialData)
		if(this.props.initialData) {
			let medium = this.props.initialData.mediumType === 'T' ? 'Text' : 
				this.props.initialData.mediumType === 'S' ? 'Slack' :
				this.props.initialData.mediumType === 'E' ? 'Email' :
				'Select a medium'
			this.setState({
				newContactName: this.props.initialData.name,
				newContactMedium: medium,
				newContactInfo: this.props.initialData.contactInfo,
				step: 1
			})
		}
	}

  handleContactSubmit (event) {
		event.preventDefault()
		let mediumType = this.state.newContactMedium === 'Text' ? 'T' : 
		this.state.newContactMedium === 'Slack' ? 'S' : this.state.newContactMedium === 'Email' ? 'E' : null
		let newContact = {
			name: this.state.newContactName,
			contactInfo: this.state.newContactInfo, 
			mediumType
		}
		if(this.props.initialData) {
			axios.put('/groups/recipientInfo', {
				recipientId: this.props.initialData.id,
				recipientInfo: {
					name: this.state.newContactName,
					contactInfo: this.state.newContactInfo
				}
			})
			.then(res=>{

			})
			.catch(err=>{

			})
			this.props.close()
			this.props.editContact({
				id: this.props.initialData.id,
				contactInfo: this.state.newContactInfo,
				name: this.state.newContactName,
				mediumType
			})
		} else {
			axios.post('/groups/newRecipient', {userId: this.props.userId, recipients: [newContact]})
			.then(res=>{
				console.log('recipient', res)
				this.props.close()
				res.data.forEach(createdRecipient=>{
					this.props.addContact({
						id: createdRecipient.id,
						contactInfo: createdRecipient.contactInfo,
						mediumType: createdRecipient.mediumType,
						name: createdRecipient.name
					})
				})
			})
			.catch(err=>{
				console.log('error is', err)
				this.props.close()
			})
		}
  }

	getSlackChannels () {
		let token = slackLock.getToken();
		console.log('token in get channels: ', token);
		axios.get('/slack/getChannels', {params: {token: token}})
		.then(results => {
			console.log('result from getting channels: ', results.data);
			this.setState({
				slackChannels: results.data
			})
		})
		.catch(error => {
			console.log('error from getting channels: ', error);
		})
}

  selectMediumType(medium) {
		//add a check
		this.setState({newContactMedium: medium})
	}

  handleNameChange(event) {
    this.setState({newContactName: event.target.value});
	}

	handleNameSubmit(event) {
		event.preventDefault()
		//check if it's empty, if so don't let them 
		this.incrementStep()
	}

  handleInfoChange(event) {
    this.setState({newContactInfo: event.target.value})
  }

  handleInfoSubmit(event) {
    event.preventDefault()
    this.incrementStep()
  }

	handleInfoSelect(recipient, displayName) {
		this.setState({
			newContactInfo: recipient,
			slackName: displayName
		})
	}

	incrementStep() {
		this.setState({step: this.state.step + 1})
	}

	decrementStep() {
		if(this.state.step > 0) {
			this.setState({step: this.state.step - 1})
		}
	}

	renderChannels(channels, i) {
		return(
			<MenuItem
				eventKey={channels}
				onSelect={()=> this.handleInfoSelect(channels, channels)}
			>
				Channel:  #{channels}
			</MenuItem>	
		)
	}

	renderGroups(groups, i) {
		return(
			<MenuItem
				eventKey={groups}
				onSelect={()=> this.handleInfoSelect(groups, groups)}
			>
				Private Group:  {groups}
			</MenuItem>
	 	)
	}

	renderUsers(users, i) {
		return(
			<MenuItem
				eventKey={users.id}
				onSelect={()=> this.handleInfoSelect(users.id, users.name)}
			>
				Private Group:  {users.name}
			</MenuItem>
	 	)
	}

  stepDecider() {
    switch(this.state.step) {
      case 0:
				return (
					<div>
						<b>What medium is this?</b>
						<br/>
						<ButtonToolbar>
				      <DropdownButton title={this.state.newContactMedium} id="dropdown-size-medium">
				        <MenuItem eventKey="1" onSelect={()=> this.selectMediumType('Text')}>Text(Twilio)</MenuItem>
				        <MenuItem eventKey="2" onSelect={()=> this.selectMediumType('Slack')}>Slack</MenuItem>
				        <MenuItem eventKey="3" onSelect={()=> this.selectMediumType('Email')}>Email</MenuItem>
				      </DropdownButton>
				    </ButtonToolbar>
						<br/>
						<FlatButton type="button" label="Cancel" onClick = {this.props.close}/>
						<RaisedButton type="button" label="Next" backgroundColor="#270943" labelStyle={{ color: 'white' }} onClick = {this.incrementStep}/>
					</div>
				)
      case 1:
				if (this.state.newContactMedium === 'Slack' && !localStorage.getItem("slackToken")) {
					slackLock.show();
				}	else if (this.state.newContactMedium === 'Slack' && !this.state.slackChannels) {
					this.getSlackChannels();
				}
        return (
          <div>
            <form onSubmit={this.handleNameSubmit}>
							<label>
								Name this new contact:
								<input 
									type='text' 
									value={this.state.newContactName}
                	onChange={this.handleNameChange} 
									required
									id="groupName"
									/>
            	</label>
            </form>
						<FlatButton type="button" label="Back" onClick = {this.decrementStep}/>
						<RaisedButton type="button" label="Next" backgroundColor="#270943" labelStyle={{ color: 'white' }} onClick = {this.incrementStep}/>
          </div>
        )
      case 2:
				if (this.state.newContactMedium === 'Slack') {
					return (
						<div>
							<b>Select Slack Recipient</b>
							<ButtonToolbar>
								<DropdownButton 
									title={this.state.slackName ? this.state.slackName : "Select"} 
									id="dropdown-size-large"
								>
									{this.state.slackChannels.channels.map(this.renderChannels)}
									{this.state.slackChannels.groups.map(this.renderGroups)}
									{this.state.slackChannels.users.map(this.renderUsers)}
								</DropdownButton>
							</ButtonToolbar>
							<br/>
							<FlatButton type="button" label="Back" onClick = {this.decrementStep} /> 
							<RaisedButton type="button" label="Submit" backgroundColor="#270943" labelStyle={{ color: 'white' }}
							onClick = {this.handleContactSubmit}/>
						</div>
					)
				}	else {
					return (
						<div>
							<form onSubmit={this.handleContactSubmit}>
								<label>
									Input the contact info
									<input 
										required
										value={this.state.newContactInfo}
										onChange={this.handleInfoChange} 
										type='text'
										/>
								</label>
							</form>
							<br/>
							<FlatButton type="button" label="Back" onClick = {this.decrementStep} /> 
							<RaisedButton type="button" label="Submit" backgroundColor="#270943" labelStyle={{ color: 'white' }}
							onClick = {this.handleContactSubmit}/>
						</div>
					)
				}
      default: 
        return (
          <div>error handling request, please try refreshing</div>
        )
    }
  }

	render() {
		console.log('slack channels before rendering: ', this.state.slackChannels);
		console.log('slack recipient before sending: ', this.state.newContactInfo);
		return(
	    <Modal show={this.props.show} bsSize="large">
	    	<Modal.Header closeButton onHide={this.props.close}>
	    		<Modal.Title>Create a new contact</Modal.Title>
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
								Contact Name
							</StepLabel>
						</Step>
						<Step>
							<StepLabel>
								Contact Info
							</StepLabel>
						</Step>
					</Stepper>
	    		{this.stepDecider()}
	   		</Modal.Body>
	    </Modal>
		)
	}
}

function mapStateToProps({ atexta }) {
	return ({ userId: atexta.userId, userRecipients: atexta.userRecipients })
}

export default connect(mapStateToProps, {addContact, editContact})(AddContactModal)

