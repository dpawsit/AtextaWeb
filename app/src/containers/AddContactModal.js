import React from 'react'
import axios from 'axios'
// import { addContact } from '../actions/atexta_actions'
import { connect } from 'react-redux'
import { Modal, ButtonToolbar, DropdownButton, MenuItem, Grid, Row, Col } from 'react-bootstrap'
import { RaisedButton, FlatButton, Step, StepButton, StepContent, StepLabel, Stepper } from 'material-ui'

class AddContactModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      newContactName: '',
      newContactMedium: 'Select a medium',
      newContactInfo: ''
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
  }

  handleContactSubmit () {
    axios.post('')
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

	incrementStep() {
		this.setState({step: this.state.step+1})
	}

	decrementStep() {
		const { step } = this.state
		if(step > 0) {
			this.setState({step: step-1})
		}
	}

  stepDecider() {
    switch(this.state.step) {
      case 0:
				return (
					<div>
						What medium is this?
						<ButtonToolbar>
				      <DropdownButton title={this.state.newContactMedium} id="dropdown-size-medium">
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
								Name this new contact:
								<input value={this.state.newContactName}
                onChange={this.handleNameChange} type='text'/>
            	</label>
            </form>
						<FlatButton type="button" label="Back" onClick = {this.decrementStep}/>
						<RaisedButton type="button" label="Next" secondary={true} 
						onClick = {this.incrementStep}/>
          </div>
        )
      case 2: 
        return (
          <div>
            <form onSubmit={this.handleInfoSubmit}>
							<label>
								Input the contact info
								<input value={this.state.newContactInfo}
                onChange={this.handleInfoChange} type='text'/>
            	</label>
            </form>
						<FlatButton type="button" label="Back" onClick = {this.decrementStep} /> 
						<RaisedButton type="button" label="Submit" primary={true}
						onClick = {this.handleContactSubmit}/>
          </div>
        )
      default: 
        return (
          <div>error handling request, please try refreshing</div>
        )
    }
  }

	render() {
		return(
	    <Modal show={this.props.show} bsSize="large" onHide={this.props.close}>
	    	<Modal.Header closeButton>
	    		<Modal.Title>Create a new contact</Modal.Title>
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
								Contact Name
							</StepLabel>
						</Step>
						<Step>
							<StepLabel>
								Contact Info
							</StepLabel>
						</Step>
					</Stepper>
	   		</Modal.Body>
	    </Modal>
		)
	}
}

function mapStateToProps({ atexta }) {
	return ({ userRecipients: atexta.userRecipients })
}

export default connect(mapStateToProps)(AddContactModal)

