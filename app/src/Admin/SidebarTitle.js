import React, { Component } from 'react';

const styles = {
  root: {
    fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
  },
  header: {
    backgroundColor: '#270943',
    color: 'white',
    padding: '16px',
    fontSize: '1.5em',
  },
};

class SidebarTitle extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const rootStyle = this.props.style ? {...styles.root, ...this.props.style} : styles.root;

    return (
      <div style={rootStyle}>
        <div style={styles.header}>{this.props.title}</div>
        {this.props.children}
      </div>
    );
  }
};

SidebarTitle.propTypes = {
  style: React.PropTypes.object,
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  children: React.PropTypes.object,
};

export default SidebarTitle;