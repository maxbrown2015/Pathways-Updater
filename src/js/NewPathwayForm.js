import React, { Component } from 'react';
import ColorPicker from './ColorPicker';  
import MockPathwayButton from './MockPathwayButton';
import '../css/PathwayComponent.css';

class NewPathwayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      color: '#FFFFFF',
      highlight: '#FFFFFF',
      key: ''
    }

    this.updateColor = this.updateColor.bind(this);
    this.updateHighlight = this.updateHighlight.bind(this);
    this.addPathway = this.addPathway.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

  }

  updateColor(color) {
     this.setState( {color: color} );
  }

  updateHighlight(highlight) {
    this.setState( {highlight: highlight} );
  }

  handleTextChange(event) {
    if (event.target.name === 'name') {
      this.setState({name: event.target.value})
    }
    if (event.target.name === 'description') {
      this.setState( {description: event.target.value} );
    }
  }

  addPathway() {
    //prompt 
    //validate
    const key = generateKey(this.state.name)
    const newPathway = {
      name: this.state.name,
      description: this.state.description,
      color: this.state.color,
      highlight: this.state.highlight,
      key: key
    }
    this.props.sendNewPathwayToParent(newPathway)
  }

  cancelAdd() {
    //prompt
    this.props.cancelAddPathway();
  }

  render() {
    return (<div className="Pathway">

    <div className="Text-container">
    <div className="Name"><textarea className="Name-area" name="name" value={this.state.title} hint={'Enter Title'}
     onChange={this.handleTextChange}/></div>
     <div className="Description"><textarea className="Description-area" 
     name="description" value={this.state.description} hint={'Enter Description'}
      onChange={this.handleTextChange}/></div>
    </div>
    <div className="Color-container"><div className="Color-title">Color: {this.state.color}</div> 
      <div className="Picker-wrapper">
      <ColorPicker currentColor={this.state.color} updateParentColor={this.updateColor}/>
      </div>
    </div>

    <div className="Highlight-container"><div className="Color-title">Highlight: {this.state.highlight}</div>
        <div className="Picker-wrapper">
      <ColorPicker currentColor={this.state.color} updateParentColor={this.updateColor}/>
    </div>
      </div>
      <div className="Button-container">
      <div className="Pathway-Button-Mock">
        <MockPathwayButton color={this.state.color} highlight={this.state.highlight}/> 
      </div>
         <div className="Edit-buttons-container">
         <div className="Accept-edit-button"><i class="fa fa-check-circle" onClick={this.addPathway}></i></div>
         <div className="Cancel-button"><i class="fa fa-times" aria-hidden="true" onClick={this.cancelAdd}></i></div>
         </div>
       </div>
    </div>)
  }
}

function generateKey(pathwayName) {
  const splitName = pathwayName.split(" ");
  if (splitName.length === 1) return pathwayName.toLowerCase();
  const newKey = splitName[0].toLowerCase() + '_' + splitName[1].toLowerCase();
  return newKey;
}


export default NewPathwayForm;