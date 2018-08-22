import React, { Component } from 'react';
import '../css/Catalog.css';
import Course from './Course';
import NewCourseForm from './NewCourseForm';
import ConfirmationPopup from './ConfirmationPopup';


class CourseCatalog extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      courses: {}, 
      cachedCourses: {}, 
      renderCourseAddition: false,
      isRevertPopupActive: false,
      isAcceptPopupActive: false,
      popupMessage: ''
     }
    //this.registerCourseStateChange = this.registerCourseStateChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.promptDeclineChanges = this.promptDeclineChanges.bind(this);
    this.promptExportCourses = this.promptExportCourses.bind(this);

    this.revertAllChanges = this.revertAllChanges.bind(this);
    this.exportCourses= this.exportCourses.bind(this); 
    this.toggleAddCourse = this.toggleAddCourse.bind(this);

    this.renderAcceptPopup = this.renderAcceptPopup.bind(this);
    this.renderRevertPopup = this.renderRevertPopup.bind(this);
    this.removePopup = this.removePopup.bind(this);

    console.log("Constructor Called");
    this.state.courses = props.data;
    this.state.cachedCourses = JSON.parse(JSON.stringify(props.data));
  };

  toggleAddCourse() {
    this.setState((prevState) => {
      return {
        renderCourseAddition: !prevState.renderCourseAddition
      };
    });
  }

  handleDelete(id) {
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
      {this.renderButtonsOrNewCourseForm()}
    </div>);
  }

  getCourseMarkup() {
    const markup = Object.keys(this.state.courses).map((key) => (
      (<Course key={key} data={this.state.courses[key]} pathwaysObj={this.props.pathwaysObj}
        sendEditToParent={this.handleEdit} sendDeleteToParent={this.handleDelete} active={true} />)
    ));
    return markup;
  }
  
  renderButtonsOrNewCourseForm() {
    if (this.state.renderCourseAddition) {
      return <div className="New-Course-Form-Wrapper"><NewCourseForm pathways={this.props.pathwaysObj}
       sendCourseToParent={this.handleAdd} cancelForm={this.toggleAddCourse}/></div>
    }
    else {
      return  (<div className="Button-Wrapper">
      <div className="Submit-Icon"><i class="fa fa-check-circle" onClick={this.promptExportCourses}></i></div>
      <div className="Revert-Icon"><i class="fa fa-times" aria-hidden="true" onClick={this.promptDeclineChanges}></i></div>
      <div className="Add-Icon"><i class="fa fa-plus" onClick={this.toggleAddCourse}></i></div>
    </div>);
    }
  }


  render() {
    if (this.state.isAcceptPopupActive) {
      return <div>{this.renderAcceptPopup()}{this.getCourseCatalogMarkup()}</div>
    } else if (this.state.isRevertPopupActive) {
      return <div><div>{this.renderRevertPopup()}{this.getCourseCatalogMarkup()}</div></div>
    }
    else {
      return this.getCourseCatalogMarkup();
    }
  }

  removePopup() {
    this.setState(() => {
      return {
        isAcceptPopupActive: false,
        isRevertPopupActive: false,
        popupMessage: ''
      }
    })
  }

  renderAcceptPopup() {
    return (
      <ConfirmationPopup message={this.state.popupMessage} handleAccept={this.exportCourses} 
      handleDecline={this.removePopup} />
    );
  }

  renderRevertPopup() {
    return (
      <ConfirmationPopup message={this.state.popupMessage} handleAccept={this.revertAllChanges} 
      handleDecline={this.removePopup} />
    );
  }


  revertAllChanges() {
    this.setState(function (prevState) {
      return { courses: prevState.cachedCourses,
            isRevertPopupActive: false }
    });
  }

  exportCourses() {
    alert("EXPORTING COURSES")
  }

  promptExportCourses() {
        this.setState(() => {
      return {
        isAcceptPopupActive: true,
        popupMessage: "Are you sure you would like to submit your changes? This action cannot be undone."
      }
    })
  }

  promptDeclineChanges() {
    this.setState(() => {
      return {
        isRevertPopupActive: true,
        popupMessage: "Would you like to revert all changes made since the beginning of the session? This action cannot be undone."
      }
    })
  }
}


export default CourseCatalog