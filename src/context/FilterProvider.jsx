import { createContext, useState } from "react";
export const FilterContext = createContext("");

function FilterProvider({ children }) {
  const [FilterValue, setFilterValue] = useState({});
  const [applyFilter, setApplyFilter] = useState(false);
  function resetFilter() {
    setFilterValue({});
  }

  return (
    <FilterContext.Provider
      value={{
        FilterValue,
        setFilterValue,
        applyFilter,
        setApplyFilter,
        resetFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
