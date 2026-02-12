import React, { useState } from "react";
import useDeleteClient from "../hooks/useDeleteClient";
import ModalClient from "../ModalClient";
import menu from "../assets/menu/menu2.svg";

function Table({ data, headers }) {
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const { handleDelete } = useDeleteClient();

  console.log(headers);

  return (
    <div className="rounded-3xl px-4 ">
      <div className="border border-[#E2E4E9] rounded-[10px] mt-5 overflow-hidden pb-5">
        <table className="w-full  border-collapse">
          <thead>
            <tr className="bg-[#F8F8FA] text-[#8F929C] font-thin text-sm">
              {headers?.map((item, key) => (
                <th key={key} className="px-4 py-2 text-left text-[12px] ">
                  {item.value}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr key={item.id} className="text-sm text-[#25272D] text-[14px]">
                {headers?.map((client) => (
                  <td className="px-4 py-2"> {item[client.key]}</td>
                ))}

                <td
                  className="px-4 py-2 relative"
                  onClick={() =>
                    setOpenMenuId(openMenuId === item.id ? null : item.id)
                  }
                >
                  <button
                    class="text-heading bg-neutral-primary box-border border border-transparent hover:bg-neutral-secondary-medium f"
                    type="button"
                  >
                    <img src={menu} />
                  </button>

                  {openMenuId === item.id && (
                    <div className="absolute right-2 top-0  mt-1 w-22 absolute bg-white border rounded shadow z-50 flex items-center justify-center">
                      <button
                        onClick={() => {
                          setCurrentClient(item);
                          setShowModal(true);
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-2 py-2 hover:bg-gray-100"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => {
                          handleDelete(item.id);
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100"
                      >
                        🗑
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalClient
        showModal={showModal}
        setShowModal={setShowModal}
        client={currentClient}
      />
    </div>
  );
}

export default Table;
