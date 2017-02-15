import React from 'react'
import Navbar from '../components/Navbar.jsx'
import MessageList from './MessageList.jsx'
 
class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<Navbar	/>
				<MessageList />
			</div>
		)
	}
}

export default App