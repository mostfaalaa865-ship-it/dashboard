import React, { useState } from "react";
import menu from "../assets/menu/menu2.svg";
import TableSkeleton from "../TableSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PaginatedItems from "./PaginatedItems";

function Table({ data, headers, setpage, actions, action }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const renderActions = (item) => {
    return actions?.map((action, index) => (
      <button
        key={index}
        onClick={() => {
          action.onClick(item);
          setOpenMenuId(null);
        }}
        className="block w-full text-left px-2 py-2 hover:bg-gray-100"
      >
        {action.label}
      </button>
    ));
  };

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
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="w-full">
            {data?.data ? (
              data.data?.map((item) => (
                <tr
                  key={item.id}
                  className="text-sm text-[#25272D] text-[14px]"
                >
                  {headers?.map((client) => {
                    const itemData = item[client.key];

                    return (
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
                        <div className="flex gap-3">
                          {" "}
                          {Array.isArray(itemData)
                            ? itemData.map((item) => <p>{item}</p>)
                            : itemData}
                        </div>
                      </td>
                    );
                  })}

                  <td
                    className="px-4 py-2 relative"
                    onClick={() =>
                      setOpenMenuId(openMenuId === item.id ? null : item.id)
                    }
                  >
                    {action ? (
                      renderActions(item)
                    ) : (
                      <button
                        className="text-heading bg-neutral-primary box-border border border-transparent hover:bg-neutral-secondary-medium f"
                        type="button"
                      >
                        <img src={menu} />
                      </button>
                    )}
                    {openMenuId === item.id && (
                      <div className="absolute right-2 top-0  mt-1 w-22  bg-white border rounded shadow z-50 flex items-center justify-center">
                        {renderActions(item)}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <TableSkeleton rows={6} cols={6} />
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between w-full  ">
        {data?.data?.length > 0 ? (
          <div className="m-auto">
            <PaginatedItems
              pageCount={data.last_page}
              currentPage={(data.current_page || 1) - 1}
              onPageChange={setpage}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Table;
