// src/FilterForm.js
import React from 'react';

const FilterForm = ({ filters, onFilterChange, onApplyFilters }) => {
  return (
    <div>
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={filters.brand}
        onChange={onFilterChange}
      />
      <input
        type="number"
        name="rentalPrice"
        placeholder="Max Rental Price"
        value={filters.rentalPrice}
        onChange={onFilterChange}
      />
      <input
        type="number"
        name="minMileage"
        placeholder="Min Mileage"
        value={filters.minMileage}
        onChange={onFilterChange}
      />
      <input
        type="number"
        name="maxMileage"
        placeholder="Max Mileage"
        value={filters.maxMileage}
        onChange={onFilterChange}
      />
      <button onClick={onApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterForm;
