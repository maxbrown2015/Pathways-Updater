import React, { Component } from 'react';

class PathwayComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      description: props.description,
      color: props.color,
      highlight: props.highlight
    }
  }

  handleEdit() {
    //approve changes ? 
  }

  handleDelete() {
    //warning message
  }

  render() {
    return(this);
  }
}

export default PathwayComponent;