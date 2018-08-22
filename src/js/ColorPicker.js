import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import '../css/ColorPicker.css'

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: props.currentColor
    }
    this.handleColorChange = this.handleColorChange.bind(this);
    this.sendColorToParent = this.sendColorToParent.bind(this);

  }

  handleColorChange = (color) => {
    //console.log(color);
    this.setState( {color: color.hex} );
    this.sendColorToParent(color.hex);
  }

  sendColorToParent(color) {
    this.props.updateParentColor(color);
  }

  shouldComponentUpdate() {
    console.log('updated');
    return true;
  }

  componentWillUnmount() {
    console.log('unmounted');
  }

  render() {
    return (
      <SketchPicker className="ColorPicker" color={this.state.color} onChangeComplete={this.handleColorChange} />
    );
  }
}

export default ColorPicker;