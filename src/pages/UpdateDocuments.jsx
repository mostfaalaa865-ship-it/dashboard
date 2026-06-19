import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDocument from "../hooks/Documents/useDocument";
import { Axios } from "../Api/Axios";
import { documents } from "../Api/Api";

function UpdateDocuments() {
  const { id } = useParams();
  const { document } = useDocument(id);
  const [documentValue, setDocumentValue] = useState("");
  const [textareaValue, setTextareatValue] = useState("");

  function updatedocument() {
    Axios.put(`${documents}/${id}`, {
      name: documentValue,

      description: textareaValue,
      status: "published",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setDocumentValue(document?.name);
    setTextareatValue(document?.description);
  }, [document]);
  console.log(documentValue);

  return (
    <div className="mt-32">
      <input
        onBlur={updatedocument}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            updatedocument();
          }
        }}
        type="text"
        value={documentValue}
        onChange={(e) => {
          setDocumentValue(e.target.value);
        }}
        id="last_name"
        class="bg-neutral-secondary-medium  text-7xl border-none  outline-none  text-heading mb-3  rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5  placeholder:text-body placeholder:text-7xl "
        placeholder="Doe"
        required
      />
      <textarea
        id="message"
        onChange={(e) => {
          setTextareatValue(e.target.value);
        }}
        value={textareaValue}
        rows="4"
        class="bg-neutral-secondary-medium border-none  outline-none  text-heading text-5xl rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body placeholder:text-5xl"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}

export default UpdateDocuments;
