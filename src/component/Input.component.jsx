import React from 'react'
import css from '../css/input.component.css'

function inputComponent({ error, value, className, onChange, placeholder }) {
  return (
    <div>
      <input
        className={error ? [className, css.error].join(' ') : className}
        placeholder={error ? error : placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default inputComponent