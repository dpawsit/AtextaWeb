import React, {Component, PropTypes as T } from 'react'

class App extends Component {
	render() {
		let children = null;
		if (this.props.children) {
			children = React.cloneElement(this.props.children, {
				auth : this.props.route.auth
			})
		}

		return (
			<div>
			{children}
			</div>
		)
	}
}
export default App