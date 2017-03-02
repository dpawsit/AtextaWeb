import React from 'react'
import { Grid, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FlatButton } from 'material-ui'
import TrashIcon from 'material-ui/svg-icons/action/delete'
import TextIcon from 'material-ui/svg-icons/communication/chat'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import EditIcon from 'material-ui/svg-icons/content/create'

class GroupItem extends React.Component {
  constructor(props) {
    super(props)
    this.state={
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
    let renderRecipients = (recipient, i) => (
      <FlatButton key={recipient.name} label={recipient.name} primary={true} style={{size: 5+'%', margin: 5+'px'}}/>
    )
    let group = this.props.group
    let medium = group.mediumType
    return(
        <Row onMouseEnter={this.allowDeletion} onMouseLeave={this.preventDeletion}>
          <Col md={11} className="hoverable">

            <Col className="column" md={2} onClick={()=>{this.props.editGroup(group)}}>{group.name}</Col>
            <Col className="column" md={1}>
              {medium === 'T' ? <TextIcon /> : medium==='E' ? <EmailIcon /> : <em>Slack</em>}
            </Col>
            <Col className="column sideScroll" md={8}>{group.recipients.map(renderRecipients)}</Col>
          
          </Col>
          <Col md={1}>
            
            {this.state.deletionMode ? <span><EditIcon onClick={()=>{this.props.editGroup(group)}}/> <TrashIcon onClick={()=>{this.props.deleteGroup(group)}}/></span> : null}
          </Col>

        </Row>
    )
  }
}

export default GroupItem

