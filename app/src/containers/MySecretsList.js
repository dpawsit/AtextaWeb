import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { RaisedButton } from 'material-ui'
import { Grid, Row, Col } from 'react-bootstrap'
import SetSecretModal from './SetSecretModal'
import MySecretItem from './MySecretItem'
import MySecretConfirmDelete from './MySecretConfirmDelete'


class MySecretsList extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      setCommands: [],
      unusedCommands: [],
      showSetNewCommandModal: false,
      showDeleteModal: false, 
      secretToDelete: null,
      commandToEdit: null
    }

    this.componentDidMount=this.componentDidMount.bind(this)
    this.openNewCommandModal=this.openNewCommandModal.bind(this)
    this.closeNewCommandModal=this.closeNewCommandModal.bind(this)
    this.addNewSecret=this.addNewSecret.bind(this)
    this.editSecret=this.editSecret.bind(this)
    this.deleteSecret=this.deleteSecret.bind(this)
    this.closeDeletionModal=this.closeDeletionModal.bind(this)
    this.removeSecret=this.removeSecret.bind(this)
    this.updateSecret=this.updateSecret.bind(this)
  }

  componentDidMount(){
    axios.get('/secretCommand/userCommands/'+this.props.userId)
    .then(res=>{
      // console.log('my secrets', res.data)
      this.setState({setCommands: res.data})
    })
    .catch(err=>{
      // console.log('error getting', err)
    })
  }

  openNewCommandModal() {
    this.setState({showSetNewCommandModal: true, commandToEdit: null})
  }
  
  closeNewCommandModal() {
    this.setState({showSetNewCommandModal: false, commandToEdit: null})
  }

  addNewSecret(secret){
    this.setState({setCommands: this.state.setCommands.concat(secret)})
  }

  editSecret(secret) {
    this.setState({showSetNewCommandModal: true, commandToEdit: secret})
  }

  updateSecret(secret) {
    let prevSetCommands = this.state.setCommands.slice()
    let prevIndex = prevSetCommands.findIndex(command=>command.id===secret.id)
    prevSetCommands[prevIndex] = secret
    this.setState({setCommands: prevSetCommands})
  }

  deleteSecret(secret) {
    this.setState({
      showDeleteModal: true, secretToDelete: secret 
    })
  }

  removeSecret(secret) {
    let prevCommands = this.state.setCommands.slice()
    let prevIndex = prevCommands.findIndex(command=>command.id===secret.id)
    prevCommands.splice(prevIndex, 1)
    this.setState({
      setCommands: prevCommands
    })
  }

  closeDeletionModal() {
    this.setState({showDeleteModal: false, secretToDelete: null})
  }

  render() {
    let renderSetCommands = (command, i) => (
      <MySecretItem secret={command} key={i} editSecret={this.editSecret} deleteSecret={this.deleteSecret} />
    )
    return(
      <div>
        <Grid className = "scrollGrid">
          <Row className = "tableHeader column">
            <Col md={2}>Trigger</Col>
            <Col md={3}>Alexa Response</Col>
            <Col md={4}>Text to Send</Col>
            <Col md={2}>Group</Col>
          </Row>
          {this.state.setCommands.map(renderSetCommands)}
        </Grid>
        <RaisedButton className="footerButton" type="button" label="Set New Command" backgroundColor="#270943" labelStyle={{ color: 'white' }}
        onClick={this.openNewCommandModal} />
        {this.state.showSetNewCommandModal ? 
        <SetSecretModal show={this.state.showSetNewCommandModal} close={this.closeNewCommandModal} 
        addNewSecret={this.addNewSecret} initialData={this.state.commandToEdit} updateSecret={this.updateSecret}/> :
        this.state.showDeleteModal ? 
        <MySecretConfirmDelete show={this.state.showDeleteModal} close={this.closeDeletionModal} secretToDelete={this.state.secretToDelete} removeSecret={this.removeSecret} /> :
        null}
      </div>
    )
  }
}

function mapStateToProps({ atexta }) {
  return { userId: atexta.userId }
}

export default connect(mapStateToProps, {})(MySecretsList)
