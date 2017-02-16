import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles';
import { FlatButton } from 'material-ui'

import Navbar from '../components/Navbar.jsx'
import MessageList from './MessageList.jsx'
import GroupList from './GroupList.jsx'
import AddGroupModal from './addGroupModal.jsx'
 
class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showAddGroupModal: false
		}
		this.closeAddGroupModal=this.closeAddGroupModal.bind(this)
		this.toggleAddGroupModal=this.toggleAddGroupModal.bind(this)
	}

	closeAddGroupModal() {
		this.setState({showAddGroupModal: false})
	}

	toggleAddGroupModal() {
		this.setState({showAddGroupModal: !this.state.showAddGroupModal})
	}

	render() {
		return (
			<div>
				<MuiThemeProvider>
					<div>
						<Navbar	/>
						<MessageList />
						<GroupList />
						<FlatButton label="show the add group modal" onClick={this.toggleAddGroupModal} />
						{this.state.showAddGroupModal ? <AddGroupModal /> : <div></div>}
					</div>
				</MuiThemeProvider>
      </div>
		)
	}
}

export default App