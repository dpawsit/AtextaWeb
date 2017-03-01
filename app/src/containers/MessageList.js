import React from 'react'
import axios from 'axios'
import { RaisedButton } from 'material-ui'
// import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui'
import { connect } from 'react-redux'
import AddMessageModal from './AddMessageModal'
import MessageItem from './MessageItem'
import ConfirmDeletionModal from './ConfirmDeletionModal'
import { Thumbnail, Grid, Row, Col } from 'react-bootstrap'


class MessageList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showAddMessageModal: false,
			showDeletionModal: false,
			commandToEdit: undefined,
			commandToDelete: undefined
		}	
		
		this.renderCommands = this.renderCommands.bind(this)
		this.editMessage = this.editMessage.bind(this)
		this.openAddMessageModal = this.openAddMessageModal.bind(this)
		this.closeAddMessageModal = this.closeAddMessageModal.bind(this)
		this.deleteMessage = this.deleteMessage.bind(this)
		this.closeDeletionModal = this.closeDeletionModal.bind(this)
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

	deleteMessage(command) {
		this.setState({showDeletionModal: true, commandToDelete: command})
	}

	closeDeletionModal() {
		this.setState({commandToDelete: undefined, showDeletionModal: false})
	}

	renderCommands(command, i) {
		return(
			<MessageItem key={i} command={command} editMessage={this.editMessage} deleteMessage={this.deleteMessage}/>
		)
	}

	render() {
		return(
			<div>
				<Grid className="scrollGrid">
					<Row className="tableHeader">

						<Col md={11}>
							<Col className="column" md={2}>Trigger</Col>
							<Col className="column" md={6}>Text</Col>
							<Col className="column" md={2}>Group</Col>
							<Col className="column" md={1}>Verified</Col>
						</Col>

						<Col md={1}>
						</Col>
					</Row>
					{this.props.userCommands.map(this.renderCommands)}
				</Grid>
				<RaisedButton className="footerButton" type="button" label="Create new command" primary={true} 
				onClick={this.openAddMessageModal} />
				{this.state.showAddMessageModal ? <AddMessageModal close={this.closeAddMessageModal}
					show={this.state.showAddMessageModal} initialData={this.state.commandToEdit}/> 
					: this.state.showDeletionModal ? <ConfirmDeletionModal close={this.closeDeletionModal}
					show={this.state.showDeletionModal} commandToDelete={this.state.commandToDelete} /> : 
					<div></div>}
			</div>
		)
	}
}

function mapStateToProps({ atexta }) {
	return { userCommands: atexta.userCommands };
}

export default connect(mapStateToProps)(MessageList)