import React, { Component } from 'react';
import '../css/Catalog.css';
import Course from './Course';


class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cachedCourses: [], courses: []}
    this.registerCourseStateChange = this.registerCourseStateChange.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this); 

    Object.keys(props.data).forEach((index) => {
      this.state.courses.push(props.data[index]);
      this.state.cachedCourses.push(props.data[index]);
    });

    /*
    Object.keys(props.data).forEach(index => {
      this.state.coursesMarkup[index] =(<Course data={props.data[index]} change= {this.registerCourseStateChange}
      delete={this.deleteCourse}/>);
      
    });
    */
  };

  deleteCourse(id) {
    let newCourseList = []
    console.log(id);
    this.state.courses.forEach((item) => {
      if (item.id !== id) {
        newCourseList.push(item);
      }
    });
    //console.log(newCourseList)
    this.setState({courses: newCourseList}, () => {
      console.log(this.state.courses);
    });
  }

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
    
    this.setState({courses: newCourseList}, () => {
      console.log('anything?')
    });
  
  }

  promptExportCourses() {
    console.log(this.state.courses);
  }

  promptDeclineChanges() {
    console.log("DECLINE");
  }


  render() {
    let coursesMarkup = [];
    this.state.courses.forEach((item) => {
      console.log(item);
      coursesMarkup.push(<Course data={item} change= {this.registerCourseStateChange}
      delete={this.deleteCourse}/>);
    });

    return (<div className="Catalog">
      <div className="Title">Course Catalog</div>
      <div className="CourseList">{coursesMarkup}</div>
      <div className="Button-Wrapper">
        <div className="Submit-Icon"><i class="fa fa-check-circle" onClick={this.promptExportCourses}></i></div>
        <div className="Revert-Icon"><i class="fa fa-times" aria-hidden="true" onClick={this.promptDeclineChanges}></i></div>
      </div>
    </div>);
  }
}

export default Catalog