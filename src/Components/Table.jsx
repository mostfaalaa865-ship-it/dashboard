import React, { useState } from "react";
import ModalClient from "./modals/ModalClient";
import menu from "../assets/menu/menu2.svg";
import ModalCompanies from "./modals/ModalCompanies";
import ModalProduct from "./modals/ModalProduct";

function Table({ data, headers, Delete, modal }) {
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

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
                  <td
                    key={client.key}
                    className={`px-4 py-2 ${
                      client.key === "email" || client.key === "link"
                        ? "text-[#5B75D2] font-medium underline"
                        : client.key === "name" ||
                            client.key === "full_name" ||
                            client.key === "title"
                          ? "text-[#25372D] font-medium line-clamp-3"
                          : "text-[#25272D] text-[15px]"
                    }`}
                  >
                    {item[client.key]}
                  </td>
                ))}

                <td
                  className="px-4 py-2 relative"
                  onClick={() =>
                    setOpenMenuId(openMenuId === item.id ? null : item.id)
                  }
                >
                  <button
                    className="text-heading bg-neutral-primary box-border border border-transparent hover:bg-neutral-secondary-medium f"
                    type="button"
                  >
                    <img src={menu} />
                  </button>

                  {openMenuId === item.id && (
                    <div className="absolute right-2 top-0  mt-1 w-22  bg-white border rounded shadow z-50 flex items-center justify-center">
                      <button
                        onClick={() => {
                          setCurrentClient(item.id);
                          setShowModal(true);
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-2 py-2 hover:bg-gray-100"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => {
                          Delete(item.id);
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
      {modal == "client" ? (
        <ModalClient
          showModal={showModal}
          setShowModal={setShowModal}
          id={currentClient}
        />
      ) : modal == "companies" ? (
        <ModalCompanies
          showModal={showModal}
          setShowModal={setShowModal}
          id={currentClient}
        />
      ) : (
        <ModalProduct
          showModal={showModal}
          setShowModal={setShowModal}
          id={currentClient}
        />
      )}
    </div>
  );
}

export default Table;
