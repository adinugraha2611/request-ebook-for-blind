import React from 'react';

class FinishedForm extends React.Component {
  render() {
    const closePopup = this.props.closePopup;
    setTimeout(() => {}, 1000);
    return (
      <div className="popup">
        <div className="popup-content">
          <h3 role="alert">{this.props.endMessage}</h3>
        </div>
      </div>
    );
  }
}
export default FinishedForm;
