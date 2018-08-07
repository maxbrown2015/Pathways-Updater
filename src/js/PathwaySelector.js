import React, { Component } from 'react';
//import PathwaySelectorItem from './PathwaySelectorItem'
import '../css/Course.css';

class PathwaySelector extends React.Component {
  constructor(props) {
    super(props);
    //this.state.pathwaysprops.pathways
    this.state = {pathways: []}

    Object.keys(props.allPathways).forEach((index) => {
      const selected = props.selectedPathways.includes(props.allPathways[index].key);
      this.state.pathways.push({
        selected: {selected},
        pathway: props.allPathways[index]
      });
    });

    console.log(this.state);
    
    //iterate through state and add active pathways 
  }

  render() {
    let pathwayCheckboxs = [];
    this.state.allPathways.forEach((item) => {
      //
    })
    return (<div>hi</div>);
  }
}

export default PathwaySelector;