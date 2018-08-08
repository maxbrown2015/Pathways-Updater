import React, { Component } from 'react';

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
  
  render() {
    return (<div></div>);
  }
}



export default PathwaysCatalog;