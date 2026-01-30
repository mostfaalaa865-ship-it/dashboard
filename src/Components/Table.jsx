import React from "react";
import { fakeData } from "../Fakedata";

function Table() {
  return (
    <div className="rounded-3xl px-4 ">
      <div className="border border-[#E2E4E9] rounded-[10px] mt-5 overflow-hidden">
        <table className="w-full  border-collapse">
          <thead>
            <tr className="bg-[#F8F8FA] text-[#8F929C] font-thin text-sm">
              <th className="px-4 py-2 text-left text-[12px] ">Name</th>
              <th className="px-4 py-2 text-left text-[12px] ">Status</th>
              <th className="px-4 py-2 text-left text-[12px]">Email address</th>
              <th className="px-4 py-2 text-left text-[12px]">Creation Date</th>
              <th className="px-4 py-2 text-left text-[12px]">Phone</th>
              <th className="px-4 py-2 text-left text-[12px]">Location</th>
            </tr>
          </thead>

          <tbody>
            {fakeData.map((item) => (
              <tr className="text-sm text-[#25272D] text-[14px]">
                <td className="px-4 py-2 font-inter">{item.Name}</td>

                <td className="px-4 py-2">
                  <span className="inline-block px-3 py-1 text-[#F57F17] bg-[#FFFDE7] rounded-md">
                    {item.Status}
                  </span>
                </td>

                <td className="px-4 py-2 underline text-[#5B75D2]">
                  {" "}
                  {item.Email}
                </td>
                <td className="px-4 py-2"> {item.CreationDate}</td>
                <td className="px-4 py-2">{item.Phone}</td>
                <td className="px-4 py-2">{item.Location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
