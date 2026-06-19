import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { documents } from "../../Api/Api";

function useDocument(id) {
  const [document, setdocument] = useState();

  useEffect(() => {
    Axios.get(`${documents}/${id}`)
      .then((res) => {
        setdocument(res.data.document);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { document, setdocument };
}

export default useDocument;
