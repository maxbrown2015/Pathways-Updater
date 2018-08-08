import React, { Component } from 'react';

class PathwaysCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pathways: props.pathwaysObj, cachedPathways: {}, renderPathwayAddition: false};
  }
}

handleDelete(key) {

};



export default PathwaysCatalog;