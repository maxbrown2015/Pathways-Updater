import React, { Component } from 'react';

class PathwayComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.validateInputs = this.validateInputs.bind(this); 
    this.state = {
      title: props.pathway.title,
      description: props.pathway.description,
      color: props.pathway.color,
      highlight: props.pathway.highlight,
      key: props.pathway.key
    }
    
  }

  handleEdit() {
    //approve changes ? 
    const result = this.validateInputs();
    if (true) {
      const modifiedPathway = {
        title: this.state.title,
        description: this.state.description,
        color: this.state.color,
        highlight: this.state.highlight,
        key: this.state.key
      }
      this.props.sendEditToParent(modifiedPathway);
    }
  }

  handleDelete() {
    //warning message
    this.props.sendDeleteToParent(this.props.key)
  }

  validateInputs() {
    return true;
  }

  render() {
    return(this);
  }
}

export default PathwayComponent;