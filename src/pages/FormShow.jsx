import React from "react";
import useGetForm from "../hooks/Forms/useGetForm";
import { useParams } from "react-router-dom";

function FormShow() {
  const { id } = useParams();
  const form = useGetForm(id);
  console.log(form);

  return (
    <div>
      <h1 className="text-5xl text-center font-bold">{form?.title}</h1>
      <p className="text-3xl text-center mt-4 ">{form?.description}</p>
      <div className="mt-8 px-16 ">
        {form?.fields?.map((input, key) => (
          <div className="mt-4 flex flex-col" key={key}>
            <label htmlFor={input.id}>{input.label}</label>
            {input.type === "textarea" ? (
              <textarea
                rows={"150"}
                id={input.id}
                placeholder={input.placeholder}
                className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              ></textarea>
            ) : (
              <input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            )}
          </div>
        ))}
        <button className="h-8  mt-8 not-odd:px-4 flex justify-center items-center cursor-pointer  border border-[#E2E4E9]   transition hover:bg-[#F3F4F6] gap-2  ">
          submit
        </button>
      </div>
    </div>
  );
}

export default FormShow;
