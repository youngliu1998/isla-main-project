'use client'

export default function InputText({
  text = {},
  title = '',
  name = '',
  value = '',
  setText = () => {},
  disabled = '',
}) {
  return (
    <>
      <div className="user-form-input">
        <label htmlFor={name}>{title}</label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => {
            setText({ ...text, [name]: e.target.value })
          }}
          className="form-control"
          disabled={disabled}
        />
      </div>
    </>
  )
}
