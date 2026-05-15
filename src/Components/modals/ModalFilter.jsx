import { useContext } from "react";
import { FilterContext } from "../../context/FilterProvider";

function ModalFilter({ open, setOpen, filterOptions = [] }) {
  const {
    FilterValue,
    setFilterValue,
    filterType,
    setFilterType,
    setApplyFilter,
  } = useContext(FilterContext);

  return (
    <>
      {open === true ? (
        <div
          className="fixed  h-96  right-20   flex justify-end z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[320px] h-full bg-white p-5 border-1 border-gray-700  rounded-2xl  relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-5">Filter</h2>

            {/* Select */}
            <div className="mb-5">
              <label className="text-sm text-gray-500">Status</label>
              <select
                className="w-full border rounded-md p-2 mt-1 outline-none"
                onChange={(e) => {
                  setFilterType(e.target.value);
                }}
                value={filterType}
              >
                <option value="">All</option>

                {filterOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Input */}
            <div>
              <label className="text-sm text-gray-500">Search</label>
              <input
                onChange={(e) => setFilterValue(e.target.value)}
                type="text"
                value={FilterValue}
                placeholder="Type something..."
                className="w-full border rounded-md p-2 mt-1 outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="absolute bottom-5 left-0 w-full px-5 flex gap-2">
              <button
                className="w-1/2 py-2 border rounded-md cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

              <button
                className="w-1/2 py-2 bg-black text-white rounded-md cursor-pointer"
                onClick={() => {
                  setApplyFilter((prev) => !prev);
                  setOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ModalFilter;
