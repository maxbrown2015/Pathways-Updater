import React, { Component } from 'react';
import '../css/MockPathwayButton.css';

class MockPathwayButton extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const style = {
      height: '10em',
      width: '20em',
      margin: '0 auto',
      background: 'black'
     // background: `linear-gradient(to right, ${this.props.color}, ${this.props.highlight}`
    };
    //console.log(this.props.color);
    return (<div style={{height: '30%', width: '80%', margin: '0 auto', 
    background: `linear-gradient(to right bottom, ${this.props.color}, ${this.props.highlight}`}}></div>)
  }
}

export default MockPathwayButton;