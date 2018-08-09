import React from 'react';
import '../css/ChooseCatalogInterface.css'
import CourseCatalog from './CourseCatalog'
import PathwaysCatalog from './PathwaysCatalog'

class ChooseCatalogInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {catalogSelected: ''};
    this.selectCourses = this.selectCourses.bind(this);
    this.selectPathways = this.selectPathways.bind(this);
  }

  selectCourses() {
    this.setState({catalogSelected: 'course'})
  }

  selectPathways() {
    this.setState({catalogSelected: 'pathway'})
  }


  renderMakeDecisionMarkup() {
    const markup = 
    (<div className="Overlay">
      <div className="Prompt-Container"><div className="Prompt">Would You Like To Edit Pathways or Courses?</div></div>
       <div className="Choose-Pathways-Container" name="pathways" onClick={this.selectPathways}><div className="Choose-Pathways">Pathways</div></div>
       <div className="Choose-Courses-Container" onClick={this.selectCourses} ><div className="Choose-Courses">Courses</div></div>
    </div>)
    return markup;
  }

  render() {
    if (this.state.catalogSelected === '') {
      return this.renderMakeDecisionMarkup()
    }
    if (this.state.catalogSelected === 'course') {
      return <CourseCatalog data={this.props.courses} pathwaysObj={this.props.pathways}/>
    }
    if (this.state.catalogSelected === 'pathway') {
      return <PathwaysCatalog pathwayObj={this.props.pathways}/>
    }
  }
  
}

export default ChooseCatalogInterface;