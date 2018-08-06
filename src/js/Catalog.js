import React, { Component } from 'react';
import '../css/Catalog.css';
import Course from './Course';


class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {courses: [], coursesMarkup: []}
    this.registerCourseStateChange = this.registerCourseStateChange.bind(this);

    Object.keys(props.data).forEach(index => {
      this.state.courses[index] = props.data[index];
    });

    Object.keys(props.data).forEach(index => {
      this.state.coursesMarkup[index] =(<Course data={props.data[index]} callback={this.registerCourseStateChange}/>);
    });
  };

  registerCourseStateChange(obj) {
    //this.setState({courses[index]   : newCourse});
    console.log(obj);
    console.log('state changed');
  }

  render() {
    return (<div className="Catalog"> {this.state.coursesMarkup}</div>);
  }

  checkState() {
    console.log(this.state.coureses);
  }
}


export default Catalog