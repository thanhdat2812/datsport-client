import React from "react";

function YearPicker({ startYear, endYear, handleSelect }) {
  const yearOptions = [];

  for (let year = endYear; year >= startYear; year--) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }


  const handleSelectChange = (event) => {
    handleSelect(event.target.value);
  }

  return (
    <div className="form-group">
      <select className="form-select" onChange={handleSelectChange}>
        <option value="">Select a year</option>
        {yearOptions}
      </select>
    </div>
  );
}

export default YearPicker;
