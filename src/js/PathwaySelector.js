import React, { Component } from 'react';
//import PathwaySelectorItem from './PathwaySelectorItem'
import '../css/Course.css';

class PathwaySelector extends React.Component {
  constructor(props) {
    super(props);
    //this.state.pathwaysprops.pathways
    this.state = {pathways: {}, selectedPathways: {}}
    this.state.pathways = props.pathways;
    this.state.selectedPathways = props.selectedPathways
    console.log(props.pathways);
    console.log(props.selectedPathways);
    
    
    //iterate through state and add active pathways 
  }

  renderCheckBoxes() {
    let IDs = Object.keys(this.state.pathways)
    console.log(IDs)
    const markup = IDs.map((id) => {
      return (
      <div key={id}>
      <label>{this.state.pathways[id].title}
      <input  type="checkbox" checked={true}/>
      </label>
      </div>
      );
    });
    console.log(markup)
    return markup;

  }

  render() {
    return (
    <div><form>{this.renderCheckBoxes()}</form></div>);
  }
}

export default PathwaySelector;