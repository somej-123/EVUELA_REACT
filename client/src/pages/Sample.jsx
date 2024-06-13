import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

function MySelectComponent() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}

export default MySelectComponent;