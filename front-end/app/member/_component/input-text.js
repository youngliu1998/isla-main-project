'use client'

export default function InputText({
  text = {},
  title = '',
  name = '',
  value = '',
  setText = () => {},
}) {
  return (
    <>
      <div className="user-form-input">
        <label htmlFor={name}>{title}</label>
        <div className="user-input-box">
          <input
            type="text"
            name={name}
            value={value}
            onChange={(e) => {
              setText({ ...text, [name]: e.target.value })
            }}
            className="form-control"
          />
        </div>
      </div>
    </>
  )
}
