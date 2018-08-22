import React, { Component } from 'react';
import '../css/PathwaysCatalog.css'
import '../css/Catalog.css'
import Pathway from './Pathway'
import NewPathwayForm from './NewPathwayForm';
import ConfirmationPopup from './ConfirmationPopup';

class PathwaysCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathways: props.pathways, 
      cachedPathways: {}, 
      pathwayBeingAdded: false,
      isRevertPopupActive: false,
      isAcceptPopupActive: false,
      popupMessage: ''
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.promptExportPathways = this.promptExportPathways.bind(this);
    this.promptDeclineChanges = this.promptDeclineChanges.bind(this);
    this.renderOnPathwayAddition = this.renderOnPathwayAddition.bind(this);
    this.renderPathwayComponents = this.renderPathwayComponents.bind(this);

    this.toggleAddPathway = this.toggleAddPathway.bind(this);
    this.renderAcceptPopup = this.renderAcceptPopup.bind(this);
    this.renderRevertPopup = this.renderRevertPopup.bind(this);
    this.removePopup = this.removePopup.bind(this);
    this.revertAllChanges = this.revertAllChanges.bind(this);

    this.state.cachedPathways = JSON.parse(JSON.stringify(props.pathways));
    
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

  removePopup() {
    this.setState(() => {
      return {
        isAcceptPopupActive: false,
        isRevertPopupActive: false,
        popupMessage: ''
      }
    })
  }

  renderPathwayComponents() {
    console.log(this.props.pathways)
    const pathwayComponents = Object.keys(this.state.pathways).map((key) => (
      (<Pathway key={key} pathway={this.state.pathways[key]} 
      sendEditToParent={this.handleEdit} sendDeleteToParent={this.handleDelete} />)
    ));
    console.log(pathwayComponents);
    return pathwayComponents;
  }

  revertAllChanges() {
    this.setState(function (prevState) {
      return { pathways: prevState.cachedPathways,
            isRevertPopupActive: false }
    });
  }

  exportPathways() {
    alert("EXPORTING Pathways")
  }

  promptExportPathways() {
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

  renderAcceptPopup() {
    return (
      <ConfirmationPopup message={this.state.popupMessage} handleAccept={this.exportPathways} 
      handleDecline={this.removePopup} />
    );
  }

  renderRevertPopup() {
    return (
      <ConfirmationPopup message={this.state.popupMessage} handleAccept={this.revertAllChanges} 
      handleDecline={this.removePopup} />
    );
  }

  renderOnPathwayAddition() {
    if (!this.state.pathwayBeingAdded) {
      return (<div className="Button-Wrapper">
      <div className="Submit-Icon"><i class="fa fa-check-circle" onClick={this.promptExportPathways}></i></div>
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
    if (this.state.isRevertPopupActive) {
      return (<div>{this.renderRevertPopup()}{this.renderPathwayCatalogMarkup()}</div>)
    }
    else if (this.state.isAcceptPopupActive) {
      return (<div>{this.renderAcceptPopup()}{this.renderPathwayCatalogMarkup()}</div>)
    }
    else {
      return (<div>{this.renderPathwayCatalogMarkup()}</div>);
    }
  }
}

export default PathwaysCatalog;