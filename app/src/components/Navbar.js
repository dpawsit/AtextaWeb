import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { AppBar } from 'material-ui';

class MyNavbar extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <AppBar
        title="Atexta"
      />
    )
  }

  render(){
    return (
      <Navbar className="nav" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><span className="navItems">Atexta</span></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
          <Nav>
            <NavItem className="navHeaders" eventKey={1} onClick={this.props.renderSecretList} href="#"><span className="navItems">My Secrets</span></NavItem>
            <NavItem className="navHeaders" eventKey={2} onClick={this.props.renderMessageList}><span className="navItems">My Messages</span></NavItem>
            <NavItem className="navHeaders" eventKey={3} onClick={this.props.renderGroupList}><span className="navItems">My Groups</span></NavItem>
            <NavItem className="navHeaders" eventKey={4} onClick={this.props.renderAddressBook} href="#"><span className="navItems">Address Book</span></NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={6} onClick={this.props.logout} href="#"><span className="navItems">Log out</span></NavItem>
          </Nav>
      </Navbar>
    )
  }
}

export default MyNavbar;
