import { useContext } from "react";
import { FilterContext } from "../../context/FilterProvider";

function ModalFilter({ open, setOpen, filterOptions }) {
  const {
    FilterValue,
    setFilterValue,
    // filterType,
    // setFilterType,
    setApplyFilter,
  } = useContext(FilterContext);
  console.log(FilterValue);

  function onChange(e) {
    setFilterValue({ ...FilterValue, [e.target.name]: e.target.value });
  }

  return (
    <>
      {open === true ? (
        <div
          className="fixed    right-20   flex justify-end z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[320px]  bg-white p-5 border-1 border-gray-700  rounded-2xl  relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-5">Filter</h2>

            <div>
              {filterOptions.map((item) => (
                <>
                  <label className="text-sm text-gray-500">{item.label}</label>
                  <input
                    onChange={onChange}
                    type="text"
                    value={FilterValue[item.value] || ""}
                    name={item.value}
                    placeholder="Type something..."
                    className="w-full border rounded-md p-2 mt-1 outline-none"
                  />
                </>
              ))}
            </div>

            {/* Buttons */}
            <div className=" w-full px-5 flex gap-2 mt-3.5">
              <button
                className="w-1/2 py-2 border rounded-md cursor-pointer"
                onClick={() => {
                  (setOpen(false), setFilterValue({}));
                }}
              >
                Cancel
              </button>

              <button
                className="w-1/2 py-2 bg-black text-white rounded-md cursor-pointer"
                onClick={() => {
                  setApplyFilter((prev) => !prev);
                  setOpen(false);
                  setFilterValue({});
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
