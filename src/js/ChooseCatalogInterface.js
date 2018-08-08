import React from 'react';
import '../css/ChooseCatalogInterface.css'
import CourseCatalog from './CourseCatalog'
import PathwaysCatalog from './PathwaysCatalog'

class ChooseCatalogInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {catalogSelected: ''};
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(event) {
    let choice = '';
    if (choice === 'course') {
      this.setState({catalogSelected: 'course'})
    }
    if (choice === 'pathway') {
      this.setState({catalogSelected: 'pathway'})
    }
  }

  render() {
    if (this.state.catalogSelected === '') {
      return <div>PICK A CATALOGUE</div>
    }
    if (this.state.catalogSelected === 'course') {
      return <CourseCatalog data={this.props.courses} pathwayObj={this.props.pathways}/>
    }
    if (this.state.catalogSelected === 'pathway') {
      return <PathwaysCatalog pathwayObj={this.props.pathways}/>
    }
  }
  
}

export default ChooseCatalogInterface;