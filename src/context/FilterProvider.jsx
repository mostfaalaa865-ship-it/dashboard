import { createContext, useState } from "react";
export const FilterContext = createContext("");

function FilterProvider({ children }) {
  const [FilterValue, setFilterValue] = useState("");
  const [filterType, setFilterType] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        FilterValue,
        setFilterValue,
        filterType,
        setFilterType,
        applyFilter,
        setApplyFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
