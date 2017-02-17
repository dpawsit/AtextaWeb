import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles';
import { FlatButton } from 'material-ui'

import Navbar from '../components/Navbar'
import MessageList from './MessageList'
import GroupList from './GroupList'
import AddGroupModal from './AddGroupModal'
import AddMessageModal from './AddMessageModal'

import { connect } from 'react-redux'
import { getUserId } from '../actions/index'

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showAddGroupModal: false,
			showAddMessageModal: false
		}
		this.componentWillMount = this.componentWillMount.bind(this)
		this.closeAddGroupModal=this.closeAddGroupModal.bind(this)
		this.toggleAddGroupModal=this.toggleAddGroupModal.bind(this)
		this.toggleAddMessageModal = this.toggleAddMessageModal.bind(this)
		this.closeAddMessageModal = this.closeAddMessageModal.bind(this)
	}

	componentWillMount() {
		let token = this.props.auth.getAccessToken();
		this.props.auth.getProfile(token)
		.then(profile => {
			getUserId(profile, token)
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
		console.log('props and tokesn in dashboard', this.props.token, this.props.userId)
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

function mapStateToProps(state) {
	return { token: state.Atexta.token, userId: state.Atexta.userId };
}

export default connect(mapStateToProps, {getUserId})(Dashboard)