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
    let renderRecipients = (recipient, i) => (
      <FlatButton key={i} label={recipient.name} primary={true} style={{height: 23.5+'px', margin: 5+'px'}}/>
    )
    let group = this.props.group
    let medium = group.mediumType
    return(
        <Row onMouseEnter={this.allowEdits} onMouseLeave={this.preventEdits} className="hoverable column">

            <Col md={2} onClick={()=>{this.props.editGroup(group)}}>{group.name}</Col>
            <Col md={1}>
              {medium === 'T' ? <TextIcon /> : medium==='E' ? <EmailIcon /> : <em>Slack</em>}
            </Col>
            <Col className="sideScroll" md={8}>{group.recipients.map(renderRecipients)}</Col>
          
          <Col md={1}>
            
            {this.state.editMode ? <span><EditIcon onClick={()=>{this.props.editGroup(group)}}/> <TrashIcon onClick={()=>{this.props.deleteGroup(group)}}/></span> : null}
          </Col>

        </Row>
    )
  }
}

export default GroupItem

