import React, { useState } from "react";
import useGetForm from "../hooks/Forms/useGetForm";
import { useParams } from "react-router-dom";
import { Axios } from "../Api/Axios";
import useSubmitForm from "../hooks/Forms/useSubmitForm";

function FormClient() {
  const { id } = useParams();
  const form = useGetForm(id);
  const [data, setData] = useState({});
  const submitForm = useSubmitForm({ data, setData, id });
  function onChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-5">
        <h1 className="text-5xl">{form?.title}</h1>
        <h4 className="mt-4 text-3xl">{form?.description}</h4>
        <form onSubmit={submitForm}>
          {form?.fields.map((input) => (
            <div className="my-3 flex flex-col w-175">
              <label htmlFor={input.id}>{input.label}</label>{" "}
              {input.type == "select" ? (
                <select
                  onChange={onChange}
                  id={input.id}
                  value={data[input.id] || ""}
                  className="h-11 w-full mt-4 cursor-pointer rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-700 shadow-sm outline-none transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  {input.options.map((optionValue) => (
                    <option value={optionValue}>{optionValue}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={data[input.id] || ""}
                  onChange={onChange}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  required={input.required}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormClient;
