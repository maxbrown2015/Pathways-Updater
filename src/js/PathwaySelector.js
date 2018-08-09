import React, { Component } from 'react';
//import PathwaySelectorItem from './PathwaySelectorItem'
import '../css/Course.css';

class PathwaySelector extends React.Component {
  constructor(props) {
    super(props);
    //this.state.pathwaysprops.pathways
    this.state = {pathwaysActiveOrNot: {}, numberOfChecked: 0}

    Object.keys(props.pathways).forEach((key) => {
      let active = props.selectedPathways.includes(key);

      if (active) this.state.numberOfChecked = this.state.numberOfChecked + 1;

      this.state.pathwaysActiveOrNot[key] = {
        pathway: props.pathways[key],
        active: active
      }
    });


    this.handleSelect = this.handleSelect.bind(this);
  
    this.updateParent = this.updateParent.bind(this);
    //iterate through state and add active pathways 
  }

  updateParent() {
    
    let selectedPathways = [];
    Object.keys(this.state.pathwaysActiveOrNot).forEach((key) => {
      if(this.state.pathwaysActiveOrNot[key]['active']) selectedPathways.push(key);
    });
    console.log(selectedPathways)
    this.props.sendSelectedPathwaysToParent(selectedPathways);
  }

  renderCheckBoxes() {

    let IDs = Object.keys(this.state.pathwaysActiveOrNot)
    const markup = IDs.map((id) => {
      const title = this.state.pathwaysActiveOrNot[id]['pathway'].title;
      const checked = this.state.pathwaysActiveOrNot[id]['active'];
      return (
      <div key={id}>
      <label>{title}
      <input name={id} type="checkbox" checked={checked} onChange={this.handleSelect}/>
      </label>
      </div>
      );
    });
    return markup;
  }

  handleSelect(event) {
    
    if (this.state.numberOfChecked === 3 && event.target.checked) {
      alert('no');
      return;
    }
    const pathwayToCheck = event.target.name;
    //console.log(pathwayToCheck);
    this.setState(function (prevState) {
      let newPathwayState = prevState.pathwaysActiveOrNot;
      const active = !newPathwayState[pathwayToCheck]['active'];
      newPathwayState[pathwayToCheck]['active'] = active;

      let number = prevState.numberOfChecked
      if (active) number = number + 1
      else number = number - 1
      return { pathwaysActiveOrNot: newPathwayState, numberOfChecked: number};
    }, () => {
      //send updated state to parent 
      this.updateParent();
    });
  }

  render() {
    return (
    <div>{this.renderCheckBoxes()}</div>);
  }
}

export default PathwaySelector;