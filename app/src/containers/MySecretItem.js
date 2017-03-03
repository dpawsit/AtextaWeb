import React from 'react'
import { Grid, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import TrashIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/content/create'
// import TextIcon from 'material-ui/svg-icons/communication/chat'
// import EmailIcon from 'material-ui/svg-icons/communication/email'

class MySecretItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false
    }
    this.allowEdits = this.allowEdits.bind(this)
    this.preventEdits = this.preventEdits.bind(this)
  }

  allowEdits() {
    this.setState({editMode: true})
  }

  preventEdits() {
    this.setState({editMode: false})
  }

  render() {
    let secret = this.props.secret;
    const tooltipForTrigger = (
      <Tooltip id="tooltipForTrigger">To use this secret command simply turn on Alexa and say "Alexa tell Atexta to {secret.name}"</Tooltip>
    )
    return(
      <div>
        <Row className="hoverable column" onMouseEnter={this.allowEdits} onMouseLeave={this.preventEdits}>

            <Col md={2}>
              <OverlayTrigger placement="right" overlay={tooltipForTrigger} animation={true}>
                <div>{secret.name}</div>
              </OverlayTrigger>
            </Col>
            <Col md={3}>{secret.speech}</Col>
            <Col md={4}>{secret.text}</Col>
            <Col md={2}>{secret.GroupName}</Col>
            <Col md={1}>
              {this.state.editMode ? <div><EditIcon onClick={()=>{this.props.editSecret(secret)}} /> <TrashIcon onClick={()=>{this.props.deleteSecret(secret)}} /> </div>: null}
            </Col>

        </Row>
      </div>
    )
  }
}

export default MySecretItem