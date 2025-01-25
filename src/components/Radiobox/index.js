import './index.css'

const Radiobox = props => {
  const {salaryDetails, ischecked, updateSalaryRange} = props
  const {label, salaryRangeId} = salaryDetails
  const onChangeRadiobox = e => {
    updateSalaryRange(e.target.value)
  }
  return (
    <li className="checkboxlist">
      <label>
        <input
          type="radio"
          checked={ischecked}
          value={salaryRangeId}
          onChange={onChangeRadiobox}
        />
        {label}
      </label>
      <br />
    </li>
  )
}

export default Radiobox
