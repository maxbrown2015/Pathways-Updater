import React, { Component } from 'react';
import '../css/PathwaysCatalog.css'
import '../css/Catalog.css'
import Pathway from './Pathway'
import NewPathwayForm from './NewPathwayForm';

class PathwaysCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pathways: props.pathways, cachedPathways: {}, pathwayBeingAdded: false};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.promptExportPathways = this.promptExportPathways.bind(this);
    this.promptDeclineChanges = this.promptDeclineChanges.bind(this);
    this.renderOnPathwayAddition = this.renderOnPathwayAddition.bind(this);
    this.renderPathwayComponents = this.renderPathwayComponents.bind(this);
    this.toggleAddPathway = this.toggleAddPathway.bind(this);
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
    console.log(modifiedPathway);
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
        pathways: newPathways,
        pathwayBeingAdded: !prevState.pathwayBeingAdded
      }
    });
  }

  toggleAddPathway() {
    this.setState((prevState) => {
      return {pathwayBeingAdded: !prevState.pathwayBeingAdded }
    })
  }

  renderPathwayComponents() {
    console.log(this.props.pathways)
    const pathwayComponents = Object.keys(this.props.pathways).map((key) => (
      (<Pathway key={key} pathway={this.props.pathways[key]} 
      sendEditToParent={this.handleEdit} sendDeleteToParent={this.handleDelete} />)
    ));
    console.log(pathwayComponents);
    return pathwayComponents;
  }

  promptExportPathways() {return}
  promptDeclineChanges() {return}

  renderOnPathwayAddition() {
    if (!this.state.pathwayBeingAdded) {
      return (<div className="Button-Wrapper">
      <div className="Submit-Icon"><i class="fa fa-check-circle" onClick={this.promptExportCourses}></i></div>
      <div className="Revert-Icon"><i class="fa fa-times" aria-hidden="true" onClick={this.promptDeclineChanges}></i></div>
      <div className="Add-Icon"><i class="fa fa-plus" onClick={this.toggleAddPathway}></i></div>
      </div>)
    }
    else {
     return( <div className="New-pathway-wrapper">
      <NewPathwayForm sendNewPathwayToParent={this.handleAdd} cancelAddPathway={this.toggleAddPathway}/>
    </div>)
    }
  }

  renderPathwayCatalogMarkup() {
    const pathwayComponents = this.renderPathwayComponents()
    return (<div className="Pathways-Catalog">
      <div className="Title">Pathway Catalog</div>
      <div className="Pathway-List">{pathwayComponents}</div>
      {this.renderOnPathwayAddition()}
    </div>);
  }

  render() {
    return (<div>{this.renderPathwayCatalogMarkup()}</div>);
  }
}



export default PathwaysCatalog;