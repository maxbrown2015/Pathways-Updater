import React, { Component } from 'react';
import '../css/Course.css';
import Popup from 'react-popup';
import createDeletePopup from './DeletePopup.js'

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
      notifyParentOnChange: props.change,
      notifyParentOnDelete: props.delete
    };
  }

  handleChange(changedCourse) {
    this.setState({id: changedCourse.id, title: changedCourse.title, description: changedCourse.description, 
      pathways: changedCourse.pathways}, () => {
      this.state.notifyParentOnChange(this.state);
    });
  }

  handleDeleteButton() {
    //launch ARE YOU SURE? POPUp
    console.log('del');
    this.state.notifyParentOnDelete(this.state.id);
    //this.state = false;
    //Popup.create(createDeletePopup(this.state.id))
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
        <div className="Pathways-title">Current Pathways:</div>
        <div>{pathways}</div>
      </div>
      <div className="Button-wrapper">
        <div className="Edit-button"  onClick={(e) => this.handleChange(null)}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
        <div className="Delete-button" onClick={(e) => this.handleDeleteButton(this)}><i class="fa fa-times" aria-hidden="true"></i></div>
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
