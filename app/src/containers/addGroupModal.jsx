import React from 'react'
import { Modal, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'

class AddGroupModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: true,
			step: 1
		}
		this.stepDecider = this.stepDecider.bind(this)
		this.incrementStep = this.incrementStep.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	incrementStep() {
		this.setState({step: this.state.step+1})
	}

	closeModal() {
		this.setState({showModal: false})
	}

	stepDecider() {
		switch(this.state.step) {
			case 1:
				return (
					<div>
						What medium is this?
						<ButtonToolbar>
				      <DropdownButton title="Select Medium" id="dropdown-size-medium">
				        <MenuItem eventKey="1">Text(Twilio)</MenuItem>
				        <MenuItem eventKey="2">Slack</MenuItem>
				        <MenuItem eventKey="3">Email</MenuItem>
				      </DropdownButton>
				    </ButtonToolbar>
				    <br/>
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
								What do you want to name this group?
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
				return (
					<div>
						<p>Who do you want to add to this group?</p>
						<RaisedButton type="button" label="Cancel" secondary={true} 
						onClick = {this.closeModal}/>
						<RaisedButton type="button" label="Submit" secondary={true}  
						/>
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
	    <Modal show={this.state.showModal} onHide={this.closeModal}>
	    	<Modal.Header closeButton>
	    		<Modal.Title>Add a group</Modal.Title>
	    	</Modal.Header>
	    	<Modal.Body>
	    		{this.stepDecider()}
	   		</Modal.Body>
	    </Modal>
		)
	}
}
export default AddGroupModal