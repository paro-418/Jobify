const FormRowSelect = ({ handleChange, labeltext, name, value, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labeltext || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => (
          <option key={index} value={itemValue}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
