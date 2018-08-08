import React, { Component } from 'react';
import '../css/Course.css';
import PathwaysSelector from './PathwaySelector'

class Course extends React.Component {
  constructor(props) {
    super(props);
   // this.handleEditButton = this.handleEditButton.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.handleNameChange = this.handleNameChange.bind(this);
    console.log(props.data.id);
    //to_do set pathway state
    this.state = {
      id: props.data.id,
      title: props.data.title.toUpperCase(),
      description: props.data.description,
      selectedPathways: props.data.pathways,
      activeEdit: true,
    };
  }

  handleDeleteButton(e) {
    //this.setState({active: false});
    //launch ARE YOU SURE? POPUp
    console.log('del'); 
    this.props.delete(this.props.data.id);
  }

  componentWillUnmount() {
    //console.log(this.props.data.id);
  }

  handleChange() {
    this.setState((prevState) => ({
      activeEdit: !prevState.activeEdit
    }));
  }



  render() {
    //console.log(this.state);
    let pathways = getPathwayMarkup(this.state.selectedPathways);
    //console.log(this.state.activeEdit);
      if (this.state.activeEdit) {
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
            <div className="Edit-button"  onClick={this.handleChange}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
            <div className="Delete-button" onClick={this.handleDeleteButton}><i class="fa fa-times" aria-hidden="true"></i></div>
          </div>
        </div>
        );
      }
      else {
        return (
          <div className="Editing-course">
            <div className="Title-And-Buttons-Wrapper">
              <div className="Edit-number">HIST {this.state.id}</div>
              <div className="Button-wrapper">
                <div className="Edit-button"  onClick={this.handleChange}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                <div className="Confirm-button"><i class="fa fa-check-circle"></i></div>
              </div>
            </div>
            <div className="Editing-container">
              <div className="Editing-text-container">
                <div className="Edit-title">TITLE:</div>
                <div className="Edit-descirption">DESCRIPTION:</div>
              </div>
              <div><PathwaysSelector pathways={this.props.pathwaysObj} selectedPathways={this.props.data.pathways}/></div>
            </div>
          </div>
        );
      }
  };
}

function getPathwayMarkup(selectedPathways) {
  let pathways = []
  Object.keys(selectedPathways).forEach(index => {
    pathways.push(<div className="Pathways-item">{selectedPathways[index]}</div>);
  });
  return pathways;
}

  //

export default Course;


  /*
  handleChange(changedCourse) {
    this.setState({id: changedCourse.id, title: changedCourse.title, description: changedCourse.description, 
      pathways: changedCourse.pathways}, () => {
      this.state.notifyParentOnChange(this.state);
    });
  }
  */