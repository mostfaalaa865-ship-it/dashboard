import React, { useState } from "react";
import Modal from "./Modal";
import { Axios } from "../../Api/Axios";
import useCreateForm from "../../hooks/Forms/useCreateForm";
// import { data } from "react-router-dom";

function ModalCreateForm({ id, showModal, setShowModal }) {
  const [fields, setFields] = useState([]);
  const [title, settitle] = useState("");
  const [slug, setslug] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");
  const CreateForm = useCreateForm(setShowModal);

  function addInput() {
    setFields((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        label: "",
        type: "",
        placeholder: "",
        options: [],
        required: false,
      },
    ]);
  }

  console.log(fields);

  const data = {
    title,
    slug,
    description,
    status,
    fields,
  };
  return (
    <div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          title={id ? "Update Form" : "Create Form"}
          buttonText={id ? "Update" : "Create"}
        >
          <form
            id="form"
            onSubmit={(e) => {
              e.preventDefault();
              CreateForm(data);
            }}
          >
            <div className="space-y-6 p-3">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <h2 className="text-base font-semibold text-gray-700 mb-4">
                  Form Details
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    type="text"
                    placeholder="Form Title"
                    className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <input
                    onChange={(e) => {
                      setslug(e.target.value);
                    }}
                    type="text"
                    placeholder="Slug"
                    className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <input
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    type="text"
                    placeholder="Description"
                    className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <select
                    onChange={(e) => {
                      setstatus(e.target.value);
                    }}
                    className="h-11 rounded-xl border border-gray-300 px-4 text-sm bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="draft">Draft</option>

                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-700">Form Fields</h2>

                <button
                  className="h-11 px-5 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition shadow-sm"
                  onClick={addInput}
                >
                  + Add Input
                </button>
              </div>

              <div className="space-y-4">
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="font-semibold text-gray-700">
                        Input {index + 1}
                      </h3>

                      <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                        Field
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Label"
                        className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        onChange={(e) => {
                          const copy = [...fields];
                          copy[index].label = e.target.value;
                          setFields(copy);
                        }}
                      />

                      <select
                        className="h-11 rounded-xl border border-gray-300 px-4 text-sm bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        onChange={(e) => {
                          const copy = [...fields];
                          copy[index].type = e.target.value;
                          setFields(copy);
                        }}
                      >
                        <option value="">Choose Type</option>

                        <option value="text">Text</option>

                        <option value="email">Email</option>

                        <option value="textarea">Textarea</option>

                        <option value="select">Select</option>

                        <option value="number">Number</option>

                        <option value="date">Date</option>
                        <option value="radio">Radio</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Placeholder"
                        className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        onChange={(e) => {
                          const copy = [...fields];
                          copy[index].placeholder = e.target.value;
                          setFields(copy);
                        }}
                      />

                      <select
                        className="h-11 rounded-xl border border-gray-300 px-4 text-sm bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        onChange={(e) => {
                          const copy = [...fields];
                          copy[index].required = e.target.value === "true";

                          setFields(copy);
                        }}
                      >
                        <option value="false">Optional</option>

                        <option value="true">Required</option>
                      </select>

                      {item.type === "select" ? (
                        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                          <h3 className="mb-3 text-sm font-semibold text-gray-700">
                            Options
                          </h3>

                          <div className="space-y-3">
                            {item?.options?.map((inputItem, key) => (
                              <input
                                key={key}
                                type="text"
                                placeholder={`Option ${key + 1}`}
                                value={inputItem}
                                onChange={(e) => {
                                  const itemSelect = [...fields];
                                  itemSelect[index].options[key] =
                                    e.target.value;
                                  setFields(itemSelect);
                                }}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              />
                            ))}
                          </div>

                          <div className="mt-4 flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                const itemSelect = [...fields];
                                itemSelect[index].options = [
                                  ...item.options,
                                  "",
                                ];
                                setFields(itemSelect);
                              }}
                              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0"
                            >
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-base">
                                +
                              </span>
                              Add Option
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default ModalCreateForm;
