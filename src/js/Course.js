import React, { Component } from 'react';
import '../css/Course.css';
import PathwaysSelector from './PathwaySelector'

class Course extends React.Component {
  constructor(props) {
    super(props);
   // this.handleEditButton = this.handleEditButton.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.renderPathwayNameMarkup = this.renderPathwayNameMarkup.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.updateSelectedPathways = this.updateSelectedPathways.bind(this);
    //this.handleNameChange = this.handleNameChange.bind(this);
    
    //to_do set pathway state
    this.state = {
      id: props.data.id,
      title: props.data.title.toUpperCase(),
      description: props.data.description,
      selectedPathways: props.data.pathways,
      activeEdit: true,
    };
    //console.log(props.data.pathways);
   // console.log(this.props.pathwaysObj)
  }

  handleDelete() {
    this.props.sendDeleteToParent(this.props.data.id);
  }

  handleEdit(event) {
    const result = this.validateInputs();
    if (result === '') {
      //create a new version of the course to be updated in parent catalog
      const modifiedCourse = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        pathways: this.state.selectedPathways
      }
      this.props.sendEditToParent(modifiedCourse);
    } else {
      //display message
    }
    event.preventDefault();
  }

  toggleEditMode() {
    this.setState((prevState) => ({
      activeEdit: !prevState.activeEdit
    }));
  }

  validateInputs() {
    let message = '';
    return message;
  }

  handleTextChange(event) {
    if (event.target.name === 'title') {
      this.setState({title: event.target.value})
    }
    if (event.target.name === 'description') {
      this.setState({description: event.target.value})
    }

  }

  updateSelectedPathways(pathways) {
    this.setState((prevState) => ({
      selectedPathways: pathways
    }));
  }

  renderPathwayNameMarkup() { 
    const markup = Object.keys(this.props.data.pathways).map((index) => {
      const key = this.props.data.pathways[index];
      return <div key={key} className="Pathways-item">{this.props.pathwaysObj[key].title}</div>
    });
    
    return markup;
  }

  renderCourseMarkup() {
    return (
      <div className="Course">
        <div className="Number-title-wrapper">
          <div className="Course-number">HIST {this.props.data.id}</div>
          <div className="Course-title">{this.props.data.title}</div>
        </div>
        <div className="Pathways-wrapper">
          <div className="Pathways-title">Current Pathways:</div>
          <div>{this.renderPathwayNameMarkup()}</div>
        </div>
        <div className="Button-wrapper">
          <div className="Edit-button"  onClick={this.toggleEditMode}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
          <div className="Delete-button" onClick={this.handleDelete}><i class="fa fa-times" aria-hidden="true"></i></div>
        </div>
      </div>
      );
  }

  renderEditingMarkup() {
    return (<div className="Editing-course">
    <div className="Editing-container">
      <div className="Editing-text-container">
      <form>
        <div className="Title-edit"><label>Enter New Course Title
          <input type="text" name="title" value={this.state.title} onChange={this.handleTextChange}/></label></div>
        <div className="Description-edit"><label>Enter New Course Description
          <textarea name="description" value={this.state.description} onChange={this.handleTextChange}/>
        </label></div>
        <div className="Submit-edit"><input type="submit" value="Submit" onClick={this.handleEdit}/></div>
      </form>
      </div>
      <div><PathwaysSelector pathways={this.props.pathwaysObj} selectedPathways={this.props.data.pathways}
      sendSelectedPathwaysToParent={this.updateSelectedPathways}/></div>
    </div>
  </div>);
  }

  render() {
      if (this.state.activeEdit) {
        return (this.renderCourseMarkup())
      }
      else {
        return <div>{this.renderCourseMarkup()}{this.renderEditingMarkup()}</div>
      }
    };
}

export default Course;
