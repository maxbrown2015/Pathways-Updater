import React, { Component } from 'react';
import '../css/PathwaysCatalog.css'
import PathwayComponent from './PathwayComponent'

class PathwaysCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pathways: props.pathwaysObj, cachedPathways: {}, renderPathwayAddition: false};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.promptExportPathways = this.promptExportPathways.bind(this);
    this.promptDeclineChanges = this.promptDeclineChanges.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  handleDelete(key) {
    this.setState(function(prevState) {
      let newPathways = prevState.pathways;
      delete newPathways[key];
      return {
        pathways: newPathways
      };
    });
  }

  handleEdit(modifiedPathway) {
    this.setState(function(prevState) {
      let newPathways = prevState.pathways;
      newPathways[modifiedPathway.key] = modifiedPathway;
      return {
        pathways: newPathways
      }
    });
  }

  handleAdd(newPathway) {
    this.setState(function(prevState) {
      let newPathways = prevState.pathways;
      newPathways[newPathway.key] = newPathway;
      return {
        pathways: newPathways
      }
    });
  }

  renderPathwayComponents() {
    const pathwayComponents = Object.keys(this.props.pathways).map((key) => {
      <PathwayComponent key={key} pathway={this.props.pathways[key]} 
      sendEditToParent={this.handleEdit} sendDeleteToParent={this.handleDelete} />
    })
    return pathwayComponents;
  }

  promptExportPathways() {return}
  promptDeclineChanges() {return}
  togglePopup() {return}

  renderPathwayCatalogMarkup() {
    const pathwayComponents = this.renderPathwayComponents()
    return (<div className="Catalog">
      <div className="Title">Course Catalog</div>
      <div className="CourseList">{pathwayComponents}</div>
      <div className="Button-Wrapper">
        <div className="Submit-Icon"><i class="fa fa-check-circle" onClick={this.promptExportCourses}></i></div>
        <div className="Revert-Icon"><i class="fa fa-times" aria-hidden="true" onClick={this.promptDeclineChanges}></i></div>
        <div className="Add-Icon"><i class="fa fa-plus" onClick={this.togglePopup}></i></div>
      </div>
    </div>);
  }

  
  render() {
    return (<div>{this.renderPathwayComponents}</div>);
  }
}



export default PathwaysCatalog;