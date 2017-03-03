import React, { PropTypes as T } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'
import AuthService from '../utils/AuthService'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imgSrc: './images/logoLanding.png'
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }

	 handleMouseOver () {
    this.setState({
      imgSrc: './images/logoLanding_purp.png'
    })
  }

  handleMouseOut () {
    this.setState({
      imgSrc: './images/logoLanding.png'
    })
  }

		static propTypes = {
		location: T.object,
		auth: T.instanceOf(AuthService)
	}

  render () {
    const { auth } = this.props
    return (
      <div>
        <div id='bg'>
          <img src='http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/Purple-wallpaper-11.jpg' alt='' />
        </div>
        <div id='landingLogo'>
          <img onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} src={this.state.imgSrc} alt='hi jesse' onClick={auth.login.bind(this)} />
        </div>
      </div>
    )
  }
}

	// render() {
	// 	const { auth } = this.props
	// 	return (
	// 		<div>
	// 			<h2>Login</h2>
	// 			 <ButtonToolbar>
  //         <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
  //       </ButtonToolbar>
  //     </div>
  //   )
  // }

export default Login
