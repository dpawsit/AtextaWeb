import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { AppBar } from 'material-ui';

// const MyNavbar = () => (
//   <AppBar
//     title="Title"
//     iconClassNameRight="muidocs-icon-navigation-expand-more"
//   />
// );

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
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Atexta</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">My Secrets</NavItem>
            <NavDropdown eventKey={2} onClick={this.props.renderMessageList} title="My Messages" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>View my messages</MenuItem>
              <MenuItem eventKey={2.2}>Create a new message</MenuItem>
              <MenuItem eventKey={2.3}>Something else here</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown eventKey={3} onClick={this.props.renderGroupList} title="My Groups" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>View my groups</MenuItem>
              <MenuItem eventKey={3.2}>Create a new group</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">My profile</NavItem>
            <NavItem eventKey={2} onClick={this.props.logout} href="#">Log out</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default MyNavbar;
