import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles';
import Navbar from '../components/Navbar.jsx'
import MessageList from './MessageList.jsx'

 
class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Navbar	/>
					<MessageList />
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App