import React, { Component } from 'react';
import PathwaySelector from './PathwaySelector';
//import '../css/Course.css';
import '../css/NewCourseForm.css'
import '../css/ConfirmationPopup.css'
import ConfirmationPopup from './ConfirmationPopup';


class NewCourseForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewCourse = this.addNewCourse.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.updateSelectedPathways = this.updateSelectedPathways.bind(this);

    this.handlePathwayUpdateFromChild = this.handlePathwayUpdateFromChild.bind(this);

    this.askUserToApprove = this.askUserToApprove.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);

    this.state = {
      number: '',
      title: '',
      description: '',
      pathways: [],
      isPopupActive: false,
      popupMessage: '',
    };
  }

  handleTextChange(event) {
    const name = event.target.name;
    if (name === 'number') {
      this.setState({number: event.target.value})
    }
    if (name === 'title') {
      this.setState({title: event.target.value})
    }
    if (name === 'description') {
      this.setState({description: event.target.value})
    }
  }

  handlePathwayUpdateFromChild(updatedPathways) {
    this.setState({pathways: updatedPathways});
  }

  handleSubmit(event) {
    let result = this.validateInputs();
  }

  addNewCourse() {
    const validatedNumber = this.state.number;
    const validatedTitle = this.state.title;
    const validatedDescription = this.state.description;
    const validatedPathways = this.state.pathways;

    const newCourse = {
      id: validatedNumber,
      title: validatedTitle,
      description: validatedDescription,
      pathways: validatedPathways
    };

    console.log(newCourse);
    this.props.sendCourseToParent(newCourse);
    this.props.cancelForm();
  }

  cancelChanges() {
    //maybe just untoggle popup?

    this.setState(() => {
    return {  
      number: '',
      title: '',
      description: '',
      pathways: [],
      isPopupActive: false,
      popupMessage: '',
    }
  });
  }

  updateSelectedPathways(newPathways) {
    this.setState(() => ({
      pathways: newPathways
    }));
  }

  askUserToApprove() {
    //validate HERE!!!! 
    console.log("trigger Popup")  
    this.setState(() => {
      return {
        popupMessage: `Are you sure you would like to add HIST-${this.state.number} ${this.state.title} to the Course Catalog?\n \n` +
        `Description: ${this.state.description}`,
        isPopupActive: true,
      }
    })
  }

  renderCourseForm() {
    return (
      <div className="Editing-course">
      <div className="Text-container">
        <div className="Number">
        <label className="Number-label">Enter Course Number<textarea className="Number-area" 
          name="number" value={this.state.name} onChange={this.handleTextChange}/> </label>
        </div> 
        <div className="Number">
        <label className="Title-label">Enter Course Title<textarea className="Title-area" 
        name="title" value={this.state.title} onChange={this.handleTextChange}/></label>
        </div>
        <div className="Number">
        <label className="Description-label">Enter Course Description<textarea className="Description-area" 
        name="description" value={this.state.description} onChange={this.handleTextChange} cols={16} rows={8}/></label>
        </div>
      </div>
      <div className="Selector-container">
        <div className="Selector-header">Select Pathways</div>
        <div className="Selector-wrapper">
        <PathwaySelector pathways={this.props.pathways} selectedPathways={this.state.pathways}
          sendSelectedPathwaysToParent={this.updateSelectedPathways}/>
        </div>
        <div className="Button-wrapper">
        <div className="Accept-edit-button"><i class="fa fa-check-circle" onClick={this.askUserToApprove}></i></div>
        <div className="Cancel-button" onClick={this.props.cancelForm}><i class="fa fa-times" aria-hidden="true"></i></div>
        </div>
      </div>
      </div>
    )
  }

  renderConfirmationPopup() {
    return (
      <ConfirmationPopup message={this.state.popupMessage} handleAccept={this.addNewCourse} handleDecline={this.cancelChanges} />
    );
  }

  render() {
    if (!this.state.isPopupActive) {
      return this.renderCourseForm();
    }
    else { 
      return this.renderConfirmationPopup();
    }
  }

  validateInputs() {
    let message = '';
    if (!isValidNumber(this.state.number)) {
      message.concat('The Number Was Entered Incorrectly: Please use the format XXXX or XXX. For Example, 0001 or 410\n');
    }
    if (!isValidTitle(this.state.title)) {
      message.concat('The Title Was Entered Incorrectly.\n');
    }
    if (!isValidDescription(this.state.title)) {
      message.concat('The Description Was Entered Incorrectly. Try Typing In The Description Instead Of Copy and Pasting.\n');
    }
    if (!isValidPathways(this.state.pathways)) {
      message.concat("There Was An Error Selecting Pathways. Be Sure To Select 1 - 3 pathways")
    }
    return message;
  }
}

function isValidNumber(number) {
  return false;
}

function isValidTitle(title) {
  return false;
}

function isValidDescription(description) {
  return false;
}

function isValidPathways(pathways) {
  return false;
} 

export default NewCourseForm;