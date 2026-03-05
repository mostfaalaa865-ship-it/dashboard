import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Modal({ id, setShowModal, children }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const location = useLocation();
  const path = location.pathname;

  let title = "Dashboard";

  if (path.includes("Clients")) {
    title = "create  Clients";
  } else if (path.includes("Companies")) {
    title = "create  Companies";
  } else if (path.includes("Products")) {
    title = "Add Product";
  } else if (path.includes("Messages")) {
    title = "Create Chat";
  }

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 z-60 bg-black/50"></div>
      <div>
        <div
          className=" fixed inset-0 z-77 flex items-center justify-center "
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-120 w-full relative  max-h-[105vh]  overflow-y-auto "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center bg-[#FBFBFC]  rounded-lg p-6 h-14.5 ">
              <h3 className="text-lg font-medium">
                {" "}
                {id ? "update " + title : title}
              </h3>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                onClick={() => setShowModal(false)}
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </div>
            {children}
            <div className="flex  gap-4 items-center   rounded-lg p-8 h-14.5 ">
              <button
                form="form"
                type="submit"
                className="h-8 px-4 flex justify-center items-center cursor-pointer text-white rounded-sm bg-[#6696F5] hover:bg-[#6287E6] transition whitespace-nowrap"
              >
                {id ? "Update" : "Create "}
              </button>
              <button
                type="button"
                className="h-8 px-4 flex justify-center items-center cursor-pointer  border border-[#E2E4E9]   transition hover:bg-[#F3F4F6] gap-2  "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* {(createLoading || updateLoading) && <Loading />} */}
      </div>
    </>
  );
}

export default Modal;
