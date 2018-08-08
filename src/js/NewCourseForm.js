import React, { Component } from 'react';
import '../css/NewCourseForm.css';

class NewCourseForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this);
    this.submitCourse = this.submitCourse.bind(this);
    this.liftUpNewCourse = this.liftUpNewCourse.bind(this);
    this.state = {
      number: '',
      title: '',
      description: ''
    };
  }

  handleFormChange(event) {
    const name = event.target.name;
    console.log(name);
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

  submitCourse() {
    let result = validateInputs();
    if (result !== '') {
      //displayErrorMessage(result);
    }
    else {
      this.liftUpNewCourse();
    }
  }

  liftUpNewCourse() {
    const validatedNumber = this.state.number;
    const validatedTitle = this.state.title;
    const validatedDescription = this.state.description;

    const newCourse = {
      id: validatedNumber,
      title: validatedTitle,
      description: validatedDescription
    };

    this.props.sendCourseToParent(newCourse);
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
    return message;
  }

  render() {
    return (
      <div className="Wrapper">
      <form onSubmit={this.submitCourse}>
        <label className="Number-label">Enter course number in the format XXXX or XXX 
          <input type="text" name="number" value={this.state.number} onChange={this.handleFormChange} className="Number-input"/>
        </label>
        <br></br>
        <label className="Title-label">Enter the title of the course 
          <input type="text" name="title" value={this.state.title} onChange={this.handleFormChange} className="Title-input"/>
        </label>
        <br></br>
        <label className="Description-label">Enter the course description
          <textarea value={this.state.description} name="description" onChange={this.handleFormChange} 
          className="Description-input" cols="40" rows="5"/>
        </label>
        <br></br>
        <input type="submit" name="submit" />
      </form>
      </div>
    );
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

export default NewCourseForm;