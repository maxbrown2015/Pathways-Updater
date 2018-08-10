import React, { Component } from 'react';
import '../css/Catalog.css';
import Course from './Course';
import NewCourseForm from './NewCourseForm';


class CourseCatalog extends React.Component {

  constructor(props) {
    super(props);
    this.state = { courses: {}, cachedCourses: {}, renderCourseAddition: false }
    //this.registerCourseStateChange = this.registerCourseStateChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.promptDeclineChanges = this.promptDeclineChanges.bind(this);
    this.promptExportCourses = this.promptExportCourses.bind(this);
    this.togglePopup = this.togglePopup.bind(this);

    console.log("Constructor Called");
    this.state.courses = props.data;
    this.state.cachedCourses = JSON.parse(JSON.stringify(props.data));
  };

  togglePopup() {
    this.setState(function (prevState) {
      return {
        renderCourseAddition: !prevState.renderCourseAddition
      };
    });
  }

  handleDelete(id) {
    //console.log(newCourseList)
    console.log(id)
    this.setState(function (prevState) {
      let newCourses = prevState.courses;
      delete newCourses[id];
      return {
        courses: newCourses
      };
    });
  };

  handleEdit(modifiedCourse) {
    this.setState(function (prevState) {
      let newCourses = prevState.courses;
      newCourses[modifiedCourse.id] = modifiedCourse;
      return {
        newCourses: newCourses
      }
    });
  }

  handleAdd(newCourse) {
    const courseToAdd = {
      id: newCourse.id,
      title: newCourse.title,
      description: newCourse.description,
      pathways: newCourse.pathways
    }
    this.setState(function (prevState) {
      let newCourseList = prevState.courses;
      newCourseList[newCourse.id] = courseToAdd;
      //newCourseList[course.id] = courseTO
      return {
        courses: newCourseList
      };
    });
  }


  getCourseCatalogMarkup() {
    const markup = this.getCourseMarkup()
    return (<div className="Catalog">
      <div className="Title">Course Catalog</div>
      <div className="CourseList">{markup}</div>
      <div className="Button-Wrapper">
        <div className="Submit-Icon"><i class="fa fa-check-circle" onClick={this.promptExportCourses}></i></div>
        <div className="Revert-Icon"><i class="fa fa-times" aria-hidden="true" onClick={this.promptDeclineChanges}></i></div>
        <div className="Add-Icon"><i class="fa fa-plus" onClick={this.togglePopup}></i></div>
      </div>
    </div>);
  }

  getCourseMarkup() {
    const markup = Object.keys(this.state.courses).map((key) => (
      (<Course key={key} data={this.state.courses[key]} pathwaysObj={this.props.pathwaysObj}
        sendEditToParent={this.handleEdit} sendDeleteToParent={this.handleDelete} active={true} />)
    ));
    return markup;
  }

  getPopupMarkup() {
    return (
      <div className="Popup">
        <div className="Add-Popup">
          <div className="Add-Popup-Header"></div>
          <div className="Entry-Container">
            <div className="Text-Entry-Container">
              <NewCourseForm pathwaysObj={this.props.pathwaysObj} sendCourseToParent={this.handleAdd} />
            </div>
            <div className="Pathway-Selector-Container" onClick={this.togglePopup}></div>
          </div>
        </div>
      </div>
    )
  }


  render() {
    console.log("Render Called");

    const courseCatalog = this.getCourseCatalogMarkup();
    const addPopup = this.getPopupMarkup();

    if (!this.state.renderCourseAddition) {
      return (
        courseCatalog
      );
    }
    else {
      return (
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
    console.log(this.state.cachedCourses)
    this.setState(function (prevState) {
      return { courses: prevState.cachedCourses }
    });
  }
}


export default CourseCatalog