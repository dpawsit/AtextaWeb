import React from 'react'
import axios from 'axios'
import { RaisedButton } from 'material-ui'
// import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui'
import { connect } from 'react-redux'
import AddMessageModal from './AddMessageModal'
import { Thumbnail, Grid, Row, Col } from 'react-bootstrap'


class MessageList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showAddMessageModal: false,
			commandToEdit: undefined
		}	
		
		this.renderCommands = this.renderCommands.bind(this)
		this.editMessage = this.editMessage.bind(this)
		this.openAddMessageModal = this.openAddMessageModal.bind(this)
		this.closeAddMessageModal = this.closeAddMessageModal.bind(this)
	}

	closeAddMessageModal() {
		this.setState({commandToEdit: undefined, showAddMessageModal: false})
	}

	openAddMessageModal() {
		this.setState({commandToEdit: undefined, showAddMessageModal: true})
	}

	editMessage(command) {
		this.setState({commandToEdit: command, showAddMessageModal: true})	
	}

	renderCommands(command, i) {
		return(
			<Row className="hoverable" key={i} onClick={()=>{this.editMessage(command)}}>
				<Col className="column" md={2}>{command.commandName}</Col>
				<Col className="column" md={6}>{command.text}</Col>
				<Col className="column" md={2}>{command.groupName}</Col>
				<Col className="column" md={1}><img className="checkmarks" src={command.verified ? 'http://www.clipartbest.com/cliparts/jix/og7/jixog7oAT.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/X_mark.svg/896px-X_mark.svg.png'} /></Col>
			</Row>	
		)
	}

	render() {
		return(
			<div>
				<Grid className="scrollGrid">
					<Row className="tableHeader">
						<Col className="column" md={2}>Trigger</Col>
						<Col className="column" md={6}>Text</Col>
						<Col className="column" md={2}>Group</Col>
						<Col className="column" md={1}>Verified</Col>
					</Row>
					{this.props.userCommands.map(this.renderCommands)}
				</Grid>
				<RaisedButton className="footerButton" type="button" label="Create new command" primary={true} 
				onClick={this.openAddMessageModal} />
				{this.state.showAddMessageModal ? <AddMessageModal close={this.closeAddMessageModal}
					show={this.state.showAddMessageModal} initialData={this.state.commandToEdit}/> : <div></div>}
			</div>
		)
	}
}

function mapStateToProps({ atexta }) {
	return { userCommands: atexta.userCommands };
}

export default connect(mapStateToProps)(MessageList)