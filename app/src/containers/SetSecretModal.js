import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { RaisedButton, FlatButton, Step, StepButton, StepContent, StepLabel, Stepper } from 'material-ui'
import { Modal, ButtonToolbar, DropdownButton, MenuItem, Grid, Row, Col } from 'react-bootstrap'

class SetSecretModal extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      step: 0,
      newSecretName: 'Select a secret from our list',
      newSecretId: null,
      newSecretResponse: '',
      newSecretText: '',
      newSecretGroupName: 'Select one of your groups',
      newSecretGroupId: null,
      unusedSecrets: []
    }
    this.incrementStep=this.incrementStep.bind(this)
    this.decrementStep=this.decrementStep.bind(this)
    this.stepDecider=this.stepDecider.bind(this)
    this.componentDidMount=this.componentDidMount.bind(this)
    this.selectSecret = this.selectSecret.bind(this)
    this.selectGroup = this.selectGroup.bind(this)
    this.handleSecretSubmit = this.handleSecretSubmit.bind(this)
    this.handleResponseChange=this.handleResponseChange.bind(this)
    this.handleTextChange=this.handleTextChange.bind(this)
    this.handleEnterKeyStrokes=this.handleEnterKeyStrokes.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
  }

  componentWillMount() {
    console.log(this.props.initialData)
    if(this.props.initialData) {
      this.setState({
        newSecretName: this.props.initialData.name,
        newSecretId: this.props.initialData.triggerId,
        newSecretResponse: this.props.initialData.speech,
        newSecretText: this.props.initialData.text,
        newSecretGroupName: this.props.initialData.GroupName,
        newSecretGroupId: this.props.initialData.groupId
      })
    }
  }

  componentDidMount() {
    axios.get('/secretCommand/availableSecretTriggers/'+this.props.userId)
    .then(res=>{
      console.log('avilable secrest', res.data)
      this.setState({unusedSecrets: res.data})
    })
    .catch(err=>{
      console.log('err in getting', err)
    })
  }

  incrementStep(){
    this.setState({step: this.state.step+1})
  }

  decrementStep(){
    this.setState({step: this.state.step-1})
  }

  selectSecret(secret){
    this.setState({newSecretName: secret.name, newSecretId: secret.id})
  }

  handleEnterKeyStrokes(event){
    event.preventDefault()
    this.incrementStep()
  }

  selectGroup(group){
    this.setState({newSecretGroupName: group.name, newSecretGroupId: group.groupId})
  }

  handleSecretSubmit(){
    if(this.props.initialData) {
      //this is an edit
      if(this.props.initialData.triggerId !== this.state.newSecretId) {
        axios.put('/secretCommand/updateTrigger', {
          commandId: this.props.initialData.id,
          newTriggerId: this.state.newSecretId
        })
        .then(res=>{

        })
        .catch(err=>{

        })
      }

      if(this.props.initialData.groupId !== this.state.newSecretGroupId) {
        axios.put('/secretCommand/updateGroup', {
          commandId: this.props.initialData.id,
          groupId: this.state.newSecretGroupId
        })
        .then(res=>{

        })
        .catch(err=>{

        })
      }

      if(this.props.initialData.speech !== this.state.newSecretResponse) {
        axios.put('/secretCommand/secretResponse', {
          commandId: this.props.initialData.id,
          newResponse: {speech: this.state.newSecretResponse }
        })
        .then(res=>{

        })
        .catch(err=>{

        })
      }

      if(this.props.initialData.text !== this.state.newSecretText) {
        axios.post('/secretCommand/newMessage', {
          commandId: this.props.initialData.id,
          newMessage: {
            additionalContent: null,
            text: this.state.newSecretText
          }
        })
        .then(res=>{

        })
        .catch(err=>{

        })
      }

      this.props.close()
      this.props.updateSecret({
        GroupName: this.state.newSecretGroupName,
        additionalContent:null,
        groupId: this.state.newSecretGroupId,
        id: this.props.initialData.id,
        mediumType: this.props.initialData.mediumType, //TOFIX, this may not be true
        name: this.state.newSecretName,
        responseId: this.props.initialData.responseId, //TOFIX
        secretMessageId: this.state.newSecretId,
        speech: this.state.newSecretResponse,
        text: this.state.newSecretText,
        triggerId: this.props.initialData.triggerId, //TOFIX
        verified: 0
      })
    } else {
      //this is a new post
      axios.post('/secretCommand/newCommand', {
        newCommand:{
          text: this.state.newSecretText,
          additionalContent: null,
          responseSpeech: this.state.newSecretResponse,
          triggerId: this.state.newSecretId,
          groupId: this.state.newSecretGroupId,
          userId: this.props.userId
        }
      })
      .then(res=>{
        console.log('result of secret post', res)
        this.props.close()
        this.props.addNewSecret({
          GroupName: this.state.newSecretGroupName,
          additionalContent: null,
          groupId: this.state.newSecretGroupId,
          id: res.data.id,
          name: this.state.newSecretName,
          responseId: res.data.responseId,
          secretMessageId: res.data.secretMessageId,
          speech: this.state.newSecretResponse,
          text: this.state.newSecretText,
          triggerId: res.data.triggerId,
          verified: res.data.verified
        })
      })
      .catch(err=>{
        console.log('error posting secret', err)
      })
    }

  }

  handleResponseChange(event) {
    this.setState({newSecretResponse: event.target.value})
  }

  handleTextChange(event){
    this.setState({newSecretText: event.target.value})
  }


  stepDecider(){
    let renderUnusedSecrets = (secret, i) => {
      return(
        <MenuItem key={i} eventKey={i} onSelect={()=> this.selectSecret(secret)}>{secret.name}</MenuItem>
      )
    }
    let renderUserGroups = (group, i) => {
      return(
        <MenuItem key={i} eventKey={i} onSelect={()=> this.selectGroup(group)}>{group.name}</MenuItem>
      )
    }
    switch(this.state.step) {
      case 0:
        return (
          <div>
            Select the secret you want to use
            <ButtonToolbar>
                <DropdownButton title={this.state.newSecretName} id="dropdown-size-medium">
                  {this.state.unusedSecrets.map(renderUnusedSecrets)}
                </DropdownButton>
            </ButtonToolbar>
          </div>
        )
      case 1:
        return(
          <div>
            <form onSubmit={this.handleEnterKeyStrokes}>
              <label>
                What should Alexa say back when you trigger this?
                <input value={this.state.newSecretResponse} type='text' 
                onChange={this.handleResponseChange} />
              </label>
            </form>
          </div>
        )
      case 2: 
        return (
          <div>
            <form onSubmit={this.handleEnterKeyStrokes}>
              <label>
                What text would you like to send when you trigger this?
                <input value={this.state.newSecretText} type='text' 
                onChange={this.handleTextChange} />
              </label>
            </form>
          </div>
        )
      case 3:
        return (
          <div>
            Select the group you want to send the message to
            <ButtonToolbar>
                <DropdownButton title={this.state.newSecretGroupName} id="dropdown-size-medium">
                  {this.props.userGroups.map(renderUserGroups)}
                </DropdownButton>
            </ButtonToolbar>
          </div>
        )
    }
  }

  render() {
    console.log('current step', this.state.step)
    return(
      <div>
        <Modal show={this.props.show} bsSize="large" onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Register your modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stepper activeStep={this.state.step}>
              <Step>
                <StepLabel>
                  Select a name
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  Input the response you want Alexa to say
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  Input the text you want to send
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  Select your group
                </StepLabel>
              </Step>
            </Stepper>
            {this.stepDecider()}
          </Modal.Body>
          <Modal.Footer>
            <FlatButton type="button" label={this.state.step === 0 ? "Cancel" : "Back" } 
            onClick={this.state.step === 0 ? this.props.close : this.decrementStep}/>
            <RaisedButton type="button" label={this.state.step=== 3 ? "Submit" : "Next"}
            backgroundColor="#270943" labelStyle={{ color: 'white' }}
            onClick = {this.state.step === 3 ? this.handleSecretSubmit : this.incrementStep}/>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}


function mapStateToProps({ atexta }) {
  return { userId: atexta.userId, userGroups: atexta.userGroups}
}

export default connect(mapStateToProps)(SetSecretModal)