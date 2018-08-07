import Popup from 'react-popup';
import '../css/Popup.css'

const createDeletePopup = function createDeletePopup(courseName) {
  const deletePopup = {
    title: null,
    content: `Are You Sure You Want Delete HIST-${courseName}?`,
    className: 'Warning-popup',
    buttons: {
        left: [{
            text: 'Cancel',
            className: 'Warning-popup',
            action: function () {
                Popup.alert('You pressed the Cancel btn');
                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.close();
            }
        }],
        right: [{
            text: 'Save',
            className: 'Warning-popup',
            action: function () {
                Popup.alert('You pressed the Save btn');
                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.close();
            }
        }]
    }
  };
  return deletePopup;
}

export default createDeletePopup;
