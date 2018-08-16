import React from 'react';
import '../css/ChooseCatalogInterface.css'
import CourseCatalog from './CourseCatalog'
import PathwaysCatalog from './PathwaysCatalog'

/*
Component allows the user to pick whether to modify Pathways or Courses. 
Because both are interdependent, it is only
possibly to modfiy one or the other per session. Which catalog is rendered is dependent on the
user's selection
*/

class ChooseCatalogInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {catalogSelected: ''};
    this.selectCourses = this.selectCourses.bind(this);
    this.selectPathways = this.selectPathways.bind(this);
  }

  /**
   * @description: sets an identifying string to 'course', which tells this component to render Course catalog
   */
  selectCourses() {
    this.setState({catalogSelected: 'course'})
  }


  /**
   * @description: sets an identifying string to 'pathway', which tells this component to render Pathways catalog
   */
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
      return <PathwaysCatalog pathways={this.props.pathways}/>
    }
  }
  
}

export default ChooseCatalogInterface;