import React from 'react'
import { Grid, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import EditIcon from 'material-ui/svg-icons/content/create'
import TrashIcon from 'material-ui/svg-icons/action/delete'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import CrossOut from 'material-ui/svg-icons/av/not-interested'

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
    const tooltip = (
      <Tooltip id="tooltip">After submitting a command please test it with the Atexta skill to verify Alexa can understand your trigger for future use</Tooltip>
    )
    const tooltipForTrigger = (
      <Tooltip id="tooltipForTrigger">To use this command simply turn on Alexa and say "Alexa tell Atexta send quick message {command.commandName}"</Tooltip>
    )
    const toolTipForSuccessTrigger = (
      <Tooltip id="toolTipForSuccessTrigger">You have succesfully verified this command, give it a try now!</Tooltip>
    )
    return(
      <div>
        <Row className="hoverable column" onMouseEnter={this.allowDeletion} onMouseLeave={this.preventDeletion}>

            <Col className="normalCursor" md={2}>
              <OverlayTrigger placement="right" overlay={tooltipForTrigger} animation={true}>
                <div>{command.commandName}</div>
              </OverlayTrigger>
            </Col>
            <Col className="sidescroll" md={6}>{command.text}</Col>
            <Col md={2}>{command.groupName}</Col>
            <Col md={1}>
            {command.verified ? 
              <OverlayTrigger placement="top" overlay={toolTipForSuccessTrigger}>
                <CheckCircle /> 
              </OverlayTrigger> :
              <OverlayTrigger placement="top" overlay={tooltip} animation={true}>
                 <CrossOut />
              </OverlayTrigger>}
            </Col>

          <Col md={1}>
            {this.state.deletionMode ? <div><EditIcon className="pointer" onClick={()=>{this.props.editMessage(command)}} /> <TrashIcon className="pointer" onClick={()=>{this.props.deleteMessage(command)}} /> </div>: null}
          </Col>

        </Row>
      </div>
    )
  }
}

export default MessageItem