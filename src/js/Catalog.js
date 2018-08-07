import React, { Component } from 'react';
import '../css/Catalog.css';
import Course from './Course';


class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cachedCourses: [], courses: [], coursesMarkup: []}
    this.registerCourseStateChange = this.registerCourseStateChange.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this); 

    Object.keys(props.data).forEach((index) => {
      this.state.courses.push(props.data[index]);
      this.state.cachedCourses.push(props.data[index]);
    });

    
    Object.keys(props.data).forEach(index => {
        this.state.coursesMarkup.push({
          markup: (<Course data={props.data[index]} change= {this.registerCourseStateChange} delete={this.deleteCourse} active={true}/>),
        });
    });
    
  };

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
    /*
    let coursesMarkup = [];
    this.state.courses.forEach((item) => {
      //console.log(item);
      coursesMarkup.push(<Course data={item} pathwaysObj={this.props.pathwaysObj} change={this.registerCourseStateChange}
      delete={this.deleteCourse.bind(item.id)} />);
    });
    */

    return (<div className="Catalog">
      <div className="Title">Course Catalog</div>
      <div className="CourseList">{this.state.coursesMarkup}</div>
      <div className="Button-Wrapper">
        <div className="Submit-Icon"><i class="fa fa-check-circle" onClick={this.promptExportCourses}></i></div>
        <div className="Revert-Icon"><i class="fa fa-times" aria-hidden="true" onClick={this.promptDeclineChanges}></i></div>
      </div>
    </div>);
  }
}

export default Catalog