import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { RaisedButton } from 'material-ui'
import { Grid, Row, Col } from 'react-bootstrap'
import SetSecretModal from './SetSecretModal'


class MySecretsList extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      setCommands: [],
      unusedCommands: [],
      showSetNewCommandModal: false
    }

    this.componentDidMount=this.componentDidMount.bind(this)
    this.openNewCommandModal=this.openNewCommandModal.bind(this)
    this.closeNewCommandModal=this.closeNewCommandModal.bind(this)
    this.addNewSecret=this.addNewSecret.bind(this)
  }

  componentDidMount(){
    axios.get('/secretCommand/userCommands/'+this.props.userId)
    .then(res=>{
      console.log('my secrets', res.data)
      this.setState({setCommands: res.data})
    })
    .catch(err=>{
      console.log('error getting', err)
    })
  }

  openNewCommandModal() {
    this.setState({showSetNewCommandModal: true})
  }
  
  closeNewCommandModal() {
    this.setState({showSetNewCommandModal: false})
  }

  addNewSecret(secret){
    this.setState({setCommands: this.state.setCommands.concat(secret)})
  }

  render() {
    let renderSetCommands = (command, i) => {
      return(
        <Row key={i}>
          <Col className="column" md={2}>{command.name}</Col>
          <Col className="column" md={3}>{command.speech}</Col>
          <Col className="column" md={4}>{command.text}</Col>
          <Col className="column" md={2}>{command.GroupName}</Col>
        </Row>
      )
    }

    return(
      <div>
        <Grid className = "scrollGrid">
          <Row className = "tableHeader">
            <Col className="column" md={2}>Trigger</Col>
            <Col className="column" md={3}>Alexa Response</Col>
            <Col className="column" md={4}>Text to Send</Col>
            <Col className="column" md={2}>Group</Col>
          </Row>
          {this.state.setCommands.map(renderSetCommands)}
        </Grid>
        <RaisedButton className="footerButton" type="button" label="Set New Command" backgroundColor="#270943" labelStyle={{ color: 'white' }}
        onClick={this.openNewCommandModal} />
        {this.state.showSetNewCommandModal ? 
        <SetSecretModal show={this.state.showSetNewCommandModal} close={this.closeNewCommandModal} addNewSecret={this.addNewSecret} /> :
        null}
      </div>
    )
  }
}

function mapStateToProps({ atexta }) {
  return { userId: atexta.userId }
}

export default connect(mapStateToProps, {})(MySecretsList)
