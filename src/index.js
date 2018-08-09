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
    title: "Economic History",
    description: "Lorem Ipsum",
    color: "#434343",
    highlight: "#Fdfdfd",
    key: 'econ_history'
  },
  human_rights: {
    title: "Human Rights",
    description: "Lorem Ipsum",
    color: "#dsddss",
    highlight: '#rerfdf',
    key: 'human_rights'
  },
  religious_comm: {
    title: "Religious Community",
    description: 'Lorem Ipsum',
    color: "#555545",
    highlight: '#rerfdf',
    key: 'religious_comm'
  },
  borders_immigration: {
    title: "Borders And Immigration",
    description: 'Lorem Ipsum',
    color: "#555545",
    highlight: '#rerfdf',
    key: 'borders_immigration'
  },
  slavery_race: {
    title: 'Slavery and Race',
    description: 'Lorem Ipsum',
    color: "#555545",
    highlight: '#rerfdf',
    key: 'slavery_race'
  },
  politics_rev: {
    title: "Politics And Revolution",
    description: 'Lorem Ipsum',
    color: "#555545",
    highlight: '#rerfdf',
    key: 'politics_rev'
  }
}

ReactDOM.render(<div><ChooseCatalogInterface courses={courses} pathways={pathways}/></div>,document.getElementById('root'));

//