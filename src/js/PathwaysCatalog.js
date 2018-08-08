import React, { Component } from 'react';
import PathwayComponent from './PathwayComponent'

class PathwaysCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pathways: props.pathwaysObj, cachedPathways: {}, renderPathwayAddition: false};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleDelete(key) {
    this.setState(function(prevState) {
      let newPathways = prevState.pathways;
      delete newPathways[key];
      return {
        pathways: newPathways
      };
    });
  }

  handleEdit(modifiedPathway) {
    this.setState(function(prevState) {
      let newPathways = prevState.pathways;
      newPathways[modifiedPathway.key] = modifiedPathway;
      return {
        pathways: newPathways
      }
    });
  }

  handleAdd(newPathway) {
    this.setState(function(prevState) {
      let newPathways = prevState.pathways;
      newPathways[newPathway.key] = newPathway;
      return {
        pathways: newPathways
      }
    });
  }

  renderPathwayComponents() {
    const pathwayComponents = Object.keys(this.props.pathways).map((key) => {
      <PathwayComponent key={key} pathway={this.props.pathways[key]} 
      sendEditToParent={this.handleEdit} sendDeleteToParent={this.handleDelete} />
    })
    return pathwayComponents;
  }
  
  render() {
    return (<div>{this.renderPathwayComponents}</div>);
  }
}



export default PathwaysCatalog;