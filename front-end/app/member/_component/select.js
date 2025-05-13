'use client'

export default function Select({
  title = '',
  name = '',
  arr = [],
  selectKey = '',
  citySelect = {},
  setCitySelect = () => {},
}) {
  return (
    <>
      <div className="user-form-input">
        <label htmlFor={name}>{title}</label>
        <select
          name={name}
          className="form-control"
          onChange={(e) => {
            setCitySelect({ ...citySelect, [selectKey]: e.target.value })
          }}
        >
          {selectKey != 'ZipCode' && <option value="">請選擇</option>}
          {arr.map((v, i) => {
            return (
              <option value={v[selectKey]} key={i}>
                {v[selectKey]}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}
