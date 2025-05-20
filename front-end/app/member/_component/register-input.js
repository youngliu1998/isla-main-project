'use client'

export default function RegisterInput({
  title = '',
  name = 'account',
  type = 'text',
  value = '',
  text = '',
  setText = (f) => {
    f
  },
  disabled = '',
}) {
  const isStar = name == 'email' || name == 'birthday' ? '*' : ''
  return (
    <>
      <div className="register-input-block">
        <label htmlFor={name}>
          {title}
          <span className="user-star">{isStar}</span>
        </label>
        <input
          className="form-control"
          disabled={disabled}
          type={type}
          name={name}
          value={value}
          onChange={(e) => {
            setText({ ...text, [name]: e.target.value })
          }}
        />
      </div>
    </>
  )
}
