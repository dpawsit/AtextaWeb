import React from 'react'
import { connect } from 'react-redux'
import { Modal, ButtonToolbar, DropdownButton, MenuItem, Grid, Row, Col, Clearfix } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'

class AddGroupModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 1,
			people: [],
			newGroupMedium: 'Select a medium',
			newGroupName: '',
			fetchedValidRecipients: false
		}
		this.stepDecider = this.stepDecider.bind(this)
		this.incrementStep = this.incrementStep.bind(this)
		this.clickPerson = this.clickPerson.bind(this)
		this.selectMediumType = this.selectMediumType.bind(this)
		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleNameSubmit = this.handleNameSubmit.bind(this)

	}

	fetchValidRecipients() {
		axios.get('groups/availableRecipients/')

	}
	incrementStep() {
		this.setState({step: this.state.step+1})
	}

	clickPerson(person) {
		console.log('click handled')
		let prev = this.state.people
		prev.push(person)
		this.setState({people: prev})
	}

	selectMediumType(medium) {
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
	

	stepDecider() {
		const renderPeople = (person) => (
			<div>
				<Grid>
					<Row>
						<Col xs={5} md={5}>
							<li onClick = {()=>{this.clickPerson(person)}} 
							className = "centered colorBox" key={person.name}>
							{person.name}
							</li>
						</Col>
						<Col xs={1} md={1}>
							<RaisedButton type="button" label="Edit >" secondary={true} 
							onClick = {this.incrementStep}/>
						</Col>
					</Row>
				</Grid>
			</div>

		)
		switch(this.state.step) {
			case 1:
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
						<RaisedButton type="button" label="Cancel" secondary={true} 
						onClick = {this.props.close}/>
						<RaisedButton type="button" label="Next" secondary={true} 
						onClick = {this.incrementStep}/>
					</div>
				)
			case 2:
				return (
					<div>
						<form onSubmit={this.handleNameSubmit}>
							<label>
								What do you want to name this group?
								<input value={this.state.newGroupName} onChange={this.handleNameChange} type='text' id='groupName' />
            	</label>
            </form>
						<RaisedButton type="button" label="Cancel" secondary={true} 
						onClick = {this.props.close}/>
						<RaisedButton type="button" label="Next" secondary={true} 
						onClick = {this.incrementStep}/>
					</div>
				)
			case 3:
			console.log('the this we got so far is', this.state.newGroupMedium, this.state.newGroupName)

				return this.state.fetchedValidRecipients ? (
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
						onClick = {this.props.close}/>
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
	   		</Modal.Body>
	    </Modal>
		)
	}
}

function mapStateToProps({ atexta }) {
	return ({ userGroups: atexta.userGroups })
}
export default connect(mapStateToProps)(AddGroupModal)
