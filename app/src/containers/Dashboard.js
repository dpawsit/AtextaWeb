import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles';
import { FlatButton } from 'material-ui'
import Navbar from '../components/Navbar'
import MessageList from './MessageList'
import GroupList from './GroupList'
import AddressBook from './AddressBook'
import { connect } from 'react-redux'
import { getUserInfo, userLogout } from '../actions/atexta_actions'
import Loading from 'react-loading';
import axios from 'axios';
import { Col } from 'react-bootstrap';

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showMessageList: true,
			showGroupList: false,
			finished: false
		}
		this.componentWillMount = this.componentWillMount.bind(this)
		this.renderMessageList = this.renderMessageList.bind(this)
		this.renderGroupList = this.renderGroupList.bind(this)
		this.handleLogout = this.handleLogout.bind(this);
		this.renderAddressBook = this.renderAddressBook.bind(this)
	}

	componentWillMount() {
		var token = this.props.auth.getAccessToken()
		  axios.post('/auth/login', {token})
			.then(result => {
				axios.defaults.headers.common['Authorization'] = result.data.token;
				this.props.getUserInfo(result.data.userId, result.data.userCommands, result.data.userGroups, result.data.userRecipients);
				this.setState({finished: true})
				console.log('results:', result.data)
			}).catch(error => {
				console.log(error);
			})
	}

	renderMessageList() {
		this.setState({
			showMessageList: true,
			showGroupList: false,
			showAddressBook: false
		})
	}

	renderGroupList() {
		this.setState({
			showGroupList: true,
			showMessageList: false,
			showAddressBook: false
		})
	}

	renderAddressBook() {
		this.setState({
			showAddressBook: true,
			showMessageList: false,
			showGroupList: false
		})
	}

	handleLogout(){
		this.props.userLogout();
		this.props.auth.logout();
	}

	render() {
		const loadingCol = {maxWidth: 500, margin: '0 auto 10px'};
		return this.state.finished ? 
		(
			<div>
				<MuiThemeProvider>
					<div>
						<Navbar	renderGroupList={this.renderGroupList} renderMessageList={this.renderMessageList} 
						renderAddressBook={this.renderAddressBook} logout={this.handleLogout}/>
						 {this.state.showMessageList ? <MessageList /> : 
							this.state.showGroupList ? <GroupList /> :
							this.state.showAddressBook ? <AddressBook /> :
							<div></div>
						 }
					</div>
				</MuiThemeProvider>
      </div>
		)
		:
		(
      <Col style={loadingCol}>
      <Loading type="cylon" color="#001f3f" width={500} heigth={500} delay={0}/> 
			</Col> 
		)

	}
}

function mapStateToProps({atexta}) {
	return {userId: atexta.userId };
}

export default connect(mapStateToProps, {getUserInfo, userLogout})(Dashboard)
