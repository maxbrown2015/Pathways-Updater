import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Course from './js/Course';
import Catalog from './js/Catalog';


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
  }
}

ReactDOM.render(<Catalog data={data}/>, document.getElementById('root'));

