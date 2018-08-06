import React, { Component } from 'react';
import '../css/Course.css';

class Course extends React.Component {
  constructor(props) {
    super(props);
   // this.handleEditButton = this.handleEditButton.bind(this);
    //this.handleDeleteButton = this.handleDeleteButton.bind(this);

    //this.handleNameChange = this.handleNameChange.bind(this);
    //to_do set pathway state
    this.state = {
      id: props.data.id,
      title: props.data.title.toUpperCase(),
      description: props.data.description,
      pathways: props.data.pathways,
      notifyParent: props.callback
    };

  }

  handleNameChange(name) {
    this.setState({title: name}, () => {
      this.state.notifyParent(this.state)
    });
  }

  render() {
    //console.log(this.state);
    let pathways = getPathwayMarkup(this.state.pathways);
    return (
    <div className="Course">
      <div className="Number-title-wrapper">
        <div className="Course-number">HIST {this.state.id}</div>
        <div className="Course-title">{this.state.title}</div>
      </div>
      <div className="Pathways-wrapper">
        <div className="Pathways-title">Pathways:      </div>
        <div>{pathways}</div>
      </div>
      <div className="Button-wrapper">
        <div className="Edit-button"  onClick={(e) => this.handleNameChange('hello')}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
        <div className="Delete-button"><i class="fa fa-times" aria-hidden="true"></i></div>
      </div>
    </div>
    );
  };
}

function getPathwayMarkup(pathwayObject) {
  let pathways = []
  Object.keys(pathwayObject).forEach(index => {
    pathways.push(<div className="Pathways-item">{pathwayObject[index]}</div>);
  });
  return pathways;
}

export default Course;
