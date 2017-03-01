import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

class MessageItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deletionMode: false
    }
    this.allowDeletion = this.allowDeletion.bind(this)
    this.preventDeletion = this.preventDeletion.bind(this)
  }

  allowDeletion() {
    this.setState({deletionMode: true})
  }

  preventDeletion() {
    this.setState({deletionMode: false})
  }

  render() {
    let command = this.props.command;
    return(
      <div>
        <Row onMouseEnter={this.allowDeletion} onMouseLeave={this.preventDeletion}>
          <Col md={11} className="hoverable" onClick={()=>{this.props.editMessage(command)}}> 

            <Col className="column" md={2}>{command.commandName}</Col>
            <Col className="column" md={6}>{command.text}</Col>
            <Col className="column" md={2}>{command.groupName}</Col>
            <Col className="column" md={1}><img className="checkmarks" src={command.verified ? 'http://www.clipartbest.com/cliparts/jix/og7/jixog7oAT.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/X_mark.svg/896px-X_mark.svg.png'} /></Col>
          
          </Col>

          <Col md={1}>
            {this.state.deletionMode ? <svg onClick={()=>{this.props.deleteMessage(command)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg> : null}
          </Col>

        </Row>
      </div>
    )
  }
}

export default MessageItem