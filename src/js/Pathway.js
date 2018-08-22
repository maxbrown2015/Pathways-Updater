import React, { Component } from 'react';
import ColorPicker from './ColorPicker';  
import MockPathwayButton from './MockPathwayButton';
import ConfirmationPopup from './ConfirmationPopup'
import '../css/PathwayComponent.css';

class Pathway extends React.Component {
  constructor(props) {
    super(props)
    this.deletePathway = this.deletePathway.bind(this);
    this.editPathway = this.editPathway.bind(this);
    this.validateInputs = this.validateInputs.bind(this); 
    this.updateColor = this.updateColor.bind(this);
    this.updateHighlight = this.updateHighlight.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.cancelEdits = this.cancelEdits.bind(this);

    this.renderTextAreas = this.renderTextAreas.bind(this);
    this.renderNoEditText = this.renderNoEditText.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.removePopup = this.removePopup.bind(this);    

    this.state = {
      name: props.pathway.name,
      description: props.pathway.description,
      color: props.pathway.color,
      highlight: props.pathway.highlight,
      key: props.pathway.key,
      activeEdit: false,
      isEditPopupActive: false,
      isDeletePopupActive: false,
      popupMessage: '',
    } 
  }

  deletePathway() {
    //prompt warning
    this.props.sendDeleteToParent(this.props.pathway.key);
  }

  editPathway() {
    //approve changes ? 
    this.toggleEditMode();
    const result = this.validateInputs();
    if (true) {
      const modifiedPathway = {
        name: this.state.name,
        description: this.state.description,
        color: this.state.color,
        highlight: this.state.highlight,
        key: this.props.pathway.key
      }
      this.props.sendEditToParent(modifiedPathway);
    }
  }

  cancelEdits() {
    // prompt "Are you sure?"
    this.setState((prevState) => {
      return {
        name: this.props.pathway.name,
        description: this.props.pathway.description,
        color: this.props.pathway.color,
        highlight: this.props.pathway.highlight,
        key: this.props.pathway.key,
        activeEdit: false
      }
    })
  }

  handleDelete() {
    this.setState(() => {
      return {
        isDeletePopupActive: true,
        popupMessage: `Are you sure you would like to delete ${this.props.pathway.name}"?`
      }
    });
  }

  handleEdit() {
    this.setState(() => {
      return {
        isEditPopupActive: true,
        popupMessage: `Are you sure you would like to edit ${this.props.pathway.name}?`
      }
    });
  }

  removePopup() {
    this.setState(() => {
      return {
        isDeletePopupActive: false,
        isEditPopupActive: false,
        popupMessage: ''
      }
    })
  }

  handleTextChange(event) {
    if (event.target.name === 'name') {
      this.setState({name: event.target.value})
    }
    if (event.target.name === 'description') {
      this.setState( {description: event.target.value} );
    }
  }

  updateColor(color) {
    if (this.state.activeEdit) this.setState( {color: color} );
  }

  updateHighlight(highlight) {
    if (this.state.activeEdit) this.setState( {highlight: highlight} );
  }

  render() {
    let textMarkup = this.state.activeEdit ? this.renderTextAreas() : this.renderNoEditText();
    const defaultMarkup = (
      <div className="Pathway">
        {textMarkup}
        {this.renderColorTitle()}
        {this.renderHighlightTitle()}
        <div className="Button-container">
        <div className="Pathway-Button-Mock">
          <MockPathwayButton color={this.state.color} highlight={this.state.highlight}/> 
        </div>
        {this.renderEditButtons()}
      </div>
      </div>);

    if (this.state.isDeletePopupActive) {
      return <div>{this.renderConfirmDeletePopup()}{defaultMarkup}</div>
    }
    else if (this.state.isEditPopupActive) {
      return <div>{this.renderConfirmEditPopup()}{defaultMarkup}</div>
    }
    else {
      return defaultMarkup
    }
  }

  renderConfirmDeletePopup() {
    return (
      <ConfirmationPopup message={this.state.popupMessage} handleAccept={this.deletePathway} 
      handleDecline={this.removePopup}/>
    );
  }

  renderConfirmEditPopup() {
    return (<ConfirmationPopup message={this.state.popupMessage} handleAccept={this.editPathway} 
    handleDecline={this.removePopup}/>);
  }


  renderTextAreas() {
    return( <div className="Text-container">
    <div className="Name"><textarea className="Name-area" name="name" value={this.state.name} readOnly={!this.state.activeEdit} 
     onChange={this.handleTextChange}/></div>
     <div className="Description"><label><textarea className="Description-area" 
     name="description" value={this.state.description} readOnly={!this.state.activeEdit}
      onChange={this.handleTextChange} cols={60} rows={10}/></label></div></div>)
   }
 
   renderNoEditText() {
     return( <div className="Text-container">
     <div className="Name"><div className="Name-area">{this.props.pathway.name}</div></div>
      <div className="Description"><div className="Description-area">{this.props.pathway.description}</div></div>
       </div>);
   }
 
   renderEditButtons() {
 
     if (!this.state.activeEdit) {
      return (<div className="Edit-buttons-container"> 
      <div className="Edit-button"  onClick={this.toggleEditMode}><i class="fa fa-pencil-square-o" 
      aria-hidden="true"></i></div>
      <div className="Delete-button"><i class="fa fa-trash" aria-hidden="true" onClick={this.handleDelete}></i></div>
      </div>);
     }
     else {
       return (
         <div className="Edit-buttons-container">
         <div className="Accept-edit-button"><i class="fa fa-check-circle" onClick={this.handleEdit}></i></div>
         <div className="Cancel-button"><i class="fa fa-times" aria-hidden="true" onClick={this.cancelEdits}></i></div>
         <div className="Delete-button"><i class="fa fa-trash" aria-hidden="true" onClick={this.handleDelete}></i></div>
         </div>
       )
     }
   }
 
   renderHighlightTitle() {
    const className = !this.state.isDeletePopupActive && !this.state.isEditPopupActive ? 'Picker-wrapper' : 'Picker-wrapper-onPopup';
     if (!this.state.activeEdit) {
       return (<div className="Color-container"><div className="Color-title">Highlight: {this.props.pathway.highlight}</div>
      </div>)
     }
     else {
       return (<div className="Highlight-container"><div className="Color-title">Highlight: {this.state.highlight}</div>
        <div className={className}>
      <ColorPicker currentColor={this.state.color} updateParentColor={this.updateHighlight}/>
    </div>
      </div>);
     }
   }
 
   renderColorTitle() {
     if (!this.state.activeEdit) {
      return (
        <div className="Color-container">
        <div className="Color-title">Color: {this.props.pathway.color}</div>
      </div>
    );
     }
     else {
      //visibility boolean
      const className = !this.state.isDeletePopupActive && !this.state.isEditPopupActive ? 'Picker-wrapper' : 'Picker-wrapper-onPopup';
      return (<div className="Color-container"><div className="Color-title">Color: {this.state.color}</div> 
      <div className={className}>
        <ColorPicker currentColor={this.state.color} updateParentColor={this.updateColor}/>
    </div></div>);
     }
   }

  validateInputs() {
    return true;
  }

  toggleEditMode() {
    this.setState((prevState) => {
     return {activeEdit: !prevState.activeEdit};
    })
  }
}

export default Pathway;