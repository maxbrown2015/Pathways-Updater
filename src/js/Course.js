import React, { Component } from 'react';
import '../css/Course.css';
import PathwaysSelector from './PathwaySelector'
import ConfirmationPopup from './ConfirmationPopup';


class Course extends React.Component {
  constructor(props) {
    super(props);
   // this.editCourseButton = this.editCourseButton.bind(this);
    this.editCourse = this.editCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.cancelEdits = this.cancelEdits.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.renderPathwayNameMarkup = this.renderPathwayNameMarkup.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.updateSelectedPathways = this.updateSelectedPathways.bind(this);
    this.removePopup = this.removePopup.bind(this);

    //this.handleNameChange = this.handleNameChange.bind(this);
    
    //to_do set pathway state
    this.state = {
      id: props.data.id,
      title: props.data.title.toUpperCase(),
      description: props.data.description,
      selectedPathways: props.data.pathways,
      activeEdit: false,
      isDeletePopupActive: false,
      isEditPopupActive: false,
      popupMessage: ''
    };

    this.renderNonEditMarkup = this.renderNonEditMarkup.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    //console.log(props.data.pathways);
   // console.log(this. props.pathwaysObj)
  }

  /**
   * @description: Sends the component's corresponding id to the parent for deletion
   */
  deleteCourse() {

    this.props.sendDeleteToParent(this.props.data.id);
  }

  /**
   * @param {} event 
   * @description: Sends the current state to the parent as a new course to update the source of truth 
   */
  editCourse() {
    console.log("edit sent");
    const result = this.validateInputs();
    if (result === '') {
      //create a new version of the course to be updated in parent catalog
      const modifiedCourse = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        pathways: this.state.selectedPathways
      }
      this.removePopup();
      this.toggleEditMode();
      this.props.sendEditToParent(modifiedCourse);
    } else {
      //display message
    }
  }
  
  cancelEdits() {
    //prompt
    console.log("Edits canceled");
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
    console.log("Edit mode toggled");
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

  handleDelete() {
    console.log("delete popup active");
    this.setState(() => {
      return {
        isDeletePopupActive: true,
        popupMessage: `Are you sure you would like to delete HIST-${this.props.data.id}?`
      }
    });
  }

  handleEdit() {
    console.log("edit popup active");
    this.setState(() => {
      return {
        isEditPopupActive: true,
        popupMessage: `Are you sure you would like to edit HIST-${this.props.data.id}?`
      }
    });
  }

  removePopup() {
    console.log("popup removed");
    this.setState(() => {
      return {
        isDeletePopupActive: false,
        isEditPopupActive: false,
        popupMessage: ''
      }
    })
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
      return (<div className="Edit-button" ><i class="fa fa-pencil-square-o"  onClick={this.toggleEditMode}
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
          <div className="Cancel-button" onClick={this.cancelEdits}><i class="fa fa-times" aria-hidden="true"></i></div>
          <div className="Delete-button"><i class="fa fa-trash" aria-hidden="true" onClick={this.handleDelete}></i></div>
        </div>
      </div>
      );
  }

  renderEditingMarkup() {
    return (
    <div className="Editing-course">
      <div className="Text-container">
        <div className="Title">
        <label><textarea className="Title-area" 
        name="title" value={this.state.title} onChange={this.handleTextChange} rows={2} cols={50}/></label>
        </div>
        <div className="Description">
        <label><textarea className="Description-area" 
        name="description" value={this.state.description} onChange={this.handleTextChange} rows={8} cols={50}/></label>
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

  renderConfirmDeletePopup() {
    return (
      <ConfirmationPopup message={this.state.popupMessage} handleAccept={this.deleteCourse} 
      handleDecline={this.removePopup}/>
    );
  }

  renderConfirmEditPopup() {
    return (<ConfirmationPopup message={this.state.popupMessage} handleAccept={this.editCourse} 
    handleDecline={this.removePopup}/>);
  }

  render() {
      if (!this.state.activeEdit) {
        if (this.state.isDeletePopupActive) {
          return <div>{this.renderConfirmDeletePopup()}{this.renderNonEditMarkup()}</div>
        } else {
        return (this.renderNonEditMarkup())
        }
      }
      else {
        if (this.state.isDeletePopupActive) {
          return <div>{this.renderConfirmDeletePopup()}{this.renderEditingMarkup()}</div>
        }
        else if (this.state.isEditPopupActive) {
          return <div>{this.renderConfirmEditPopup()}{this.renderEditingMarkup()}</div>
        }
        else {
          return <div>{this.renderNonEditMarkup()}{this.renderEditingMarkup()}</div>
        }
      }
    };
}

export default Course;
