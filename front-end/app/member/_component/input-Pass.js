'use client'

export default function InputPass({
  password = {},
  title = '',
  name = '',
  value = '',
  setPassword = () => {},
}) {
  return (
    <>
      <div className="user-form-input">
        <label htmlFor={name}>{title}</label>
        <input
          type="password"
          name={name}
          value={value}
          onChange={(e) => {
            setPassword({ ...password, [name]: e.target.value })
          }}
          className="form-control"
        />
      </div>
    </>
  )
}
