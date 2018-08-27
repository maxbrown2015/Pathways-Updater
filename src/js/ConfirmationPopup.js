import React, { Component } from 'react';
import '../css/ConfirmationPopup.css';

class ConfirmationPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  handleAccept() {
    this.props.handleAccept()
  }

  handleDecline() {
    this.props.handleDecline();
  }

  render() {
    return (
    <div className="Popup">
      <div className="Popup-inner">
        <div className="Message-container">
          <div className="Message-header"></div>
          <div className="Message">{this.props.message}</div>
        </div>
        <div className="Buttons-container">
        <div className="Accept"><i class="fa fa-check-circle" onClick={this.handleAccept}></i></div>
        <div className="Decline"><i class="fa fa-times" aria-hidden="true" onClick={this.handleDecline}></i></div>
        </div>
      </div>
    </div>
    );
  }
}

export default ConfirmationPopup;