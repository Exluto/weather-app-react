import React from 'react'
import "./switch.css"

function Switcher() {
  const Switch = ({ isOn, handleToggle, onColor }) => {
    return (
      <label style={{ background: isOn && onColor }} className="react-switch">
        <input
          checked={isOn}
          onChange={handleToggle}
          className="react-switch-checkbox"
          type="checkbox"
        />
        <div className="react-switch-button" />
        <div className="react-switch-labels">
          <span>F</span>
          <span>C</span>
        </div>
      </label>
    );
  };
}

export default Switcher