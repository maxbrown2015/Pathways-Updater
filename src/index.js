import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Catalog from './js/Catalog';
import Popup from 'react-popup';


const data = {
  1: {
    id: '001',
    title: "American Hist",
    description: "Lorem Ipsum",
    pathways: ['politics_rev', 'slavery_race', 'border_immigration']
  },
  2: {
    id: '015',
    title: "Euro Hist",
    description: "Lorem Ipsum",
    pathways: ['human_rights', 'religious_comm', 'econ_history']
  },
  3: {
    id: '019',
    title: "Spanish Hist",
    description: "Lorem Ipsum",
    pathways: ['econ_history', 'slavery_race', 'religous_comm']
  }
}

const pathwaysObj = {
  econ_history: {
    title: "Economic History",
    color: "#434343",
    key: 'econ_history'
  },
  human_rights: {
    title: "Human Rights",
    color: "#111111",
    human_rights: 'human_rights'
  },
  religious_comm: {
    title: "Religious Community",
    color: "#555545",
    key: 'religous_comm'
  }
}

ReactDOM.render(<div><Catalog data={data} pathwaysObj={pathwaysObj}/></div>,document.getElementById('root'));