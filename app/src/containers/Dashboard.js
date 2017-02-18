import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles';
import { FlatButton } from 'material-ui'
import Navbar from '../components/Navbar'
import MessageList from './MessageList'
import GroupList from './GroupList'
import AddGroupModal from './AddGroupModal'
import AddMessageModal from './AddMessageModal'
import { connect } from 'react-redux'
import { getUserId } from '../actions/atexta_actions'

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showAddGroupModal: false,
			showAddMessageModal: false
		}
		this.componentDidMount = this.componentDidMount.bind(this)
		this.closeAddGroupModal=this.closeAddGroupModal.bind(this)
		this.toggleAddGroupModal=this.toggleAddGroupModal.bind(this)
		this.toggleAddMessageModal = this.toggleAddMessageModal.bind(this)
		this.closeAddMessageModal = this.closeAddMessageModal.bind(this)
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		let token = this.props.auth.getAccessToken();
		this.props.auth.getProfile(token)
		.then(profile => {
			this.props.getUserId(profile)
		})
		.catch(err=> {
			console.log('err getting profile', err)
		})
	}

	closeAddGroupModal() {
		this.setState({showAddGroupModal: false})
	}

	toggleAddGroupModal() {
		this.setState({showAddGroupModal: !this.state.showAddGroupModal})
	}

	closeAddMessageModal() {
		this.setState({showAddMessageModal: false})
	}

	toggleAddMessageModal() {
		this.setState({showAddMessageModal: !this.state.showAddMessageModal})
	}

	render() {
		console.log('props and tokens in dashboard', this.props.userId)
		return (
			<div>
				<MuiThemeProvider>
					<div>
						<Navbar	/>
						{/*<MessageList />*/}
						<FlatButton label="show the add message modal" onClick={this.toggleAddMessageModal} />
						{this.state.showAddMessageModal ? <AddMessageModal /> : <div></div>}
						{/*<GroupList />*/}
						<FlatButton label="show the add group modal" onClick={this.toggleAddGroupModal} />
						{this.state.showAddGroupModal ? <AddGroupModal /> : <div></div>}
					</div>
				</MuiThemeProvider>
      </div>
		)
	}
}

function mapStateToProps({atexta}) {
	return {userId: atexta.userId };
}

export default connect(mapStateToProps, {getUserId})(Dashboard)
