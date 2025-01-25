import './index.css'

const Checkbox = props => {
  const {jobType, checkValue, updateCheckboxList} = props
  const {label, employmentTypeId} = jobType
  const onChangeCheckbox = e => {
    const {name, checked} = e.target
    //console.log(name , checked)
    updateCheckboxList(name, checked)
  }
  return (
    <li className="checkboxlist">
      <label>
        <input
          type="checkbox"
          name={employmentTypeId}
          checked={checkValue}
          onChange={onChangeCheckbox}
        />
        {label}
      </label>
      <br />
    </li>
  )
}

export default Checkbox
