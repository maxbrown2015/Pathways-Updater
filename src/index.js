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
  }
}

ReactDOM.render(<div><div><Catalog data={data}/></div><div><Popup /></div></div>, document.getElementById('root'));

