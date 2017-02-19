import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles';
import { FlatButton } from 'material-ui'
import Navbar from '../components/Navbar'
import MessageList from './MessageList'
import GroupList from './GroupList'
import { connect } from 'react-redux'
import { getUserId } from '../actions/atexta_actions'

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showMessageList: true,
			showGroupList: false
		}
		this.componentWillMount = this.componentWillMount.bind(this)
		this.renderMessageList = this.renderMessageList.bind(this)
		this.renderGroupList = this.renderGroupList.bind(this)
	}

	componentWillMount() {
		//let token = this.props.auth.getAccessToken();
		//this.props.auth.getProfile(token)
	//	.then(profile => {
			this.props.getUserId(this.props.auth.getAccessToken());
	//	})
		//.catch(err=> {
		//	console.log('err getting profile', err)
	//	})
	}

	renderMessageList() {
		this.setState({
			showMessageList: true,
			showGroupList: false
		})
	}

	renderGroupList() {
		this.setState({
			showGroupList: true,
			showMessageList: false
		})
	}

	render() {
		console.log('props and tokens in dashboard', this.props.userId)
		return (
			<div>
				<MuiThemeProvider>
					<div>
						<Navbar	renderGroupList={this.renderGroupList} renderMessageList={this.renderMessageList}/>
						{this.state.showMessageList ? <MessageList /> : 
						this.state.showGroupList ? <GroupList /> :
						<div></div>
						}
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
