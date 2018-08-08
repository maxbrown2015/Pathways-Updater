import React, { Component } from 'react';
import '../css/Catalog.css';
import Course from './Course';
import NewCourseForm from './NewCourseForm';


class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {courses: [], coursesMarkup: [], renderCourseAddition: false}
    this.registerCourseStateChange = this.registerCourseStateChange.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this); 

    this.promptDeclineChanges = this.promptDeclineChanges.bind(this);
    this.promptExportCourses = this.promptExportCourses.bind(this);
    this.togglePopup = this.togglePopup.bind(this);  

    Object.keys(props.data).forEach((index) => {
      this.state.courses.push(props.data[index]);
    });

  
    Object.keys(props.data).forEach(index => {
        this.state.coursesMarkup.push(
          (<Course data={props.data[index]} change= {this.registerCourseStateChange} delete={this.deleteCourse} active={true}/>),
        );
    });
    
  };

  togglePopup() {
    console.log("hello")
    this.setState(function(prevState) {
      return {
        renderCourseAddition: !prevState.renderCourseAddition
      };
    });
  }

  deleteCourse(id) {
    //console.log(newCourseList)
    let newCourseList = []
    console.log(id)
    this.setState(function(prevState) {
      return {
        courses: prevState.courses.filter((course) => course.id !== id)
      };
    });
  };


  registerCourseStateChange(newCourse) {
    let newCourseList = [];
    this.state.courses.forEach((item) => {
      if (newCourse.id !== item.id) {
        newCourseList.push(item);
      }
      else {
        const courseToAdd = {
          id: newCourse.id,
          title: newCourse.title,
          description: newCourse.description,
          pathways: newCourse.pathways
        }
        newCourseList.push(courseToAdd);
      }
    });
  }

  getCourseCatalogMarkup() {
    return (<div className="Catalog">
    <div className="Title">Course Catalog</div>
    <div className="CourseList">{this.state.coursesMarkup}</div>
    <div className="Button-Wrapper">
      <div className="Submit-Icon"><i class="fa fa-check-circle" onClick={this.promptExportCourses}></i></div>
      <div className="Revert-Icon"><i class="fa fa-times" aria-hidden="true" onClick={this.promptDeclineChanges}></i></div>
      <div className="Add-Icon"><i class="fa fa-plus" onClick={this.togglePopup}></i></div>
    </div>
  </div>);
  }

  getPopupMarkup() {
    return (
      <div className="Popup">
        <div className="Add-Popup">
          <div className="Add-Popup-Header"></div>
          <div className="Entry-Container">
            <div className="Text-Entry-Container">
              <NewCourseForm />
            </div>
            <div className="Pathway-Selector-Container"  onClick={this.togglePopup}></div>
          </div>
        </div>
      </div>
    )
  }

  
  render() {

    const courseCatalog = this.getCourseCatalogMarkup();
    const addPopup = this.getPopupMarkup();

    if (!this.state.renderCourseAddition) {
      return (
        courseCatalog
      );
    }
    else {
      return(
        <div>
          {addPopup}
          {courseCatalog}
        </div>
      );
    }
  }


  promptExportCourses() {
    console.log(this.state.courses);
  }

  promptDeclineChanges() {
    console.log("DECLINE");
  }

  addNewCourse() {
    this.togglePopup();
    //input text 
    //validate text
    //create new object and new markup and update state
    //
  }
}



export default Catalog