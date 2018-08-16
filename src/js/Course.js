import React, { Component } from 'react';
import '../css/Course.css';
import PathwaysSelector from './PathwaySelector'


class Course extends React.Component {
  constructor(props) {
    super(props);
   // this.handleEditButton = this.handleEditButton.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handelCancelEdits = this.handelCancelEdits.bind(this);
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
      activeEdit: false,
    };

    this.renderNonEditMarkup = this.renderNonEditMarkup.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    //console.log(props.data.pathways);
   // console.log(this. props.pathwaysObj)
  }

  /**
   * @description: Sends the component's corresponding id to the parent for deletion
   */
  handleDelete() {
    this.props.sendDeleteToParent(this.props.data.id);
  }

  /**
   * @param {} event 
   * @description: Sends the current state to the parent as a new course to update the source of truth 
   */
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
    this.setState({activeEdit: false});
    event.preventDefault();
  }

  handelCancelEdits() {
    //prompt
    this.setState(() => {
      return {
        title: this.props.data.title.toUpperCase(),
        description: this.props.data.description,
        selectedPathways: this.props.data.pathways,
        activeEdit: false
      }
    })

  }
  /**
  * @description: Switches markup between editing area and default display
  */
  toggleEditMode() {
    this.setState((prevState) => ({
      activeEdit: !prevState.activeEdit
    }));
  }

  validateInputs() {
    let message = '';
    return message;
  }

  /**
   * 
   * @param {*} event : The type of form changed
   * @description: Updates the state of the title or description whenever the corresponding form is edited.
   */
  handleTextChange(event) {
    if (event.target.name === 'title') {
      this.setState({title: event.target.value})
    }
    if (event.target.name === 'description') {
      this.setState({description: event.target.value})
    }
  }
  
  /**
   * 
   * @param {*} pathways : the new selected pathways to update the state. Lifted up from PathwaysSelector Component
   * @description: Get state from child component to register the current selected pathways of a course.
   */
  updateSelectedPathways(pathways) {
    this.setState((prevState) => ({
      selectedPathways: pathways
    }));
  }

  renderPathwayNameMarkup() { 
    const markup = Object.keys(this.props.data.pathways).map((index) => {
      const key = this.props.data.pathways[index];
      return <div key={key} className="Pathways-item">{this.props.pathwaysObj[key].name}</div>
    });
    
    return markup;
  }

  renderEditButton() {
    if (!this.state.activeEdit) {
      return (<div className="Edit-button"  onClick={this.toggleEditMode}><i class="fa fa-pencil-square-o" 
      aria-hidden="true"></i></div>)
    }
    else {
      return (
      <div className="Accept-edit-button"><i class="fa fa-check-circle" onClick={this.handleEdit}></i></div>
    )
    }
  }


  renderNonEditMarkup() {
    let editButton = this.renderEditButton(); 
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
          {editButton}
          <div className="Cancel-button" onClick={this.handelCancelEdits}><i class="fa fa-times" aria-hidden="true"></i></div>
          <div className="Delete-button"><i class="fa fa-trash" aria-hidden="true" onClick={this.handleDelete}></i></div>
        </div>
      </div>
      );
  }

  renderEditingMarkup() {
    return (
    <div className="Editing-course">
      <div className="Text-container">
        <div className="Title"><textarea className="Title-area" 
        name="title" value={this.state.title} onChange={this.handleTextChange}/>
        </div>
        <div className="Description"><textarea className="Description-area" 
        name="description" value={this.state.description} onChange={this.handleTextChange}/>
        </div>
      </div>
      <div className="Selector-container">
        <div className="Selector-header">Select Pathways</div>
        <div className="Selector-wrapper">
        <PathwaysSelector pathways={this.props.pathwaysObj} selectedPathways={this.props.data.pathways}
          sendSelectedPathwaysToParent={this.updateSelectedPathways}/>
        </div>
      </div>
    </div>
      )
  }

  render() {
      if (!this.state.activeEdit) {
        return (this.renderNonEditMarkup())
      }
      else {
        return <div>{this.renderNonEditMarkup()}{this.renderEditingMarkup()}</div>
      }
    };
}

export default Course;
