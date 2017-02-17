import React from 'react'
import { connect } from 'react-redux'
import { Modal, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'

class AddGroupModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: true,
			step: 1,
			people: []
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

	clickPerson(person) {
		console.log('click handled')
		let prev = this.state.people
		prev.push(person)
		this.setState({people: prev})
	}

	stepDecider() {
		const renderPeople = (person) => (
			<div>
				<li onClick = {()=>{this.clickPerson(person)}} 
				className = "centered colorBox" key={person.name}>
				{person.name}
				</li>
				<RaisedButton type="button" label="Edit >" secondary={true} 
				onClick = {this.incrementStep}/>
			</div>

		)
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
						who do you want to add to this group?
						<div className = "scrollable">
							Added so far:
							<ul>
								{this.state.people.map(renderPeople)}
							</ul>
						</div>
						<div className = "scrollable">
							<ul>
								{this.props.people.map(renderPeople)}
							</ul>
						</div>
						<RaisedButton type="button" label="Add new contact" 
						onClick = {this.incrementStep}/>
						<RaisedButton type="button" label="Submit" 
						onClick = {this.closeModal}/>
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

function mapStateToProps({ people, groups }) {
	return ({ people, groups })
}
export default connect(mapStateToProps)(AddGroupModal)
