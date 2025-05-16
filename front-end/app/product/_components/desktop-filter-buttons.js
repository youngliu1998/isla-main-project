'use client'
import React from 'react'
import PropTypes from 'prop-types'
import './_style.css/desktop-filter-buttons.css'

const SelectableButtonGroup = ({
  options,
  selected,
  onToggle,
  renderOption,
}) => {
  return (
    <div className="sidebar-filter-filter-btn-container">
      {options.map((option, index) => (
        <div
          key={option}
          className={`sidebar-filter-filter-btn ${
            selected.includes(option) ? 'sidebar-filter-filter-btn-active' : ''
          }`}
          onClick={() => onToggle(option, selected)}
        >
          <div className="sidebar-filter-btn-check-box">
            <input
              type="checkbox"
              className="form-check-input"
              checked={selected.includes(option)}
              readOnly
            />
            {renderOption ? renderOption(option, index) : <span>{option}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

SelectableButtonGroup.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  renderOption: PropTypes.func,
}

export default SelectableButtonGroup
