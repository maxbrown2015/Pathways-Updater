import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import CourseCatalog from './js/CourseCatalog';
import ChooseCatalogInterface from './js/ChooseCatalogInterface';

const courses = {
  '101': {
    id: '101',
    title: "American Hist",
    description: "Lorem Ipsum",
    pathways: ['politics_rev', 'borders_immigration']
  },
  '015': {
    id: '015',
    title: "Euro Hist",
    description: "Lorem Ipsum",
    pathways: ['human_rights', 'religious_comm', 'econ_history']
  },
  '012': {
    id: '012',
    title: "Spanish Hist",
    description: "Lorem Ipsum",
    pathways: ['econ_history', 'slavery_race', 'religious_comm']
  }
}

const pathways = {
  econ_history: {
    name: "Economic History",
    description: "Lorem Ipsum",
    color: "#434343",
    highlight: "#Fdfdfd",
    key: 'econ_history'
  },
  human_rights: {
    name: "Human Rights",
    description: "Lorem Ipsum",
    color: "#dddfdd",
    highlight: '#dfdfdd',
    key: 'human_rights'
  },
  religious_comm: {
    name: "Religious Community",
    description: 'Lorem Ipsum',
    color: "#123213",
    highlight: '#453433',
    key: 'religious_comm'
  },
  borders_immigration: {
    name: "Borders And Immigration",
    description: 'Lorem Ipsum',
    color: "#143423",
    highlight: '#123214',
    key: 'borders_immigration'
  },
  slavery_race: {
    name: 'Slavery and Race',
    description: 'Lorem Ipsum',
    color: "#434343",
    highlight: '#FFFFFF',
    key: 'slavery_race'
  },
  politics_rev: {
    name: "Politics And Revolution",
    description: 'Lorem Ipsum',
    color: "#eeeeee",
    highlight: '#F1132F',
    key: 'politics_rev'
  }
}

ReactDOM.render(<div><ChooseCatalogInterface courses={courses} pathways={pathways}/></div>,document.getElementById('root'));

//