import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { documents } from "../../Api/Api";

function useDocuments() {
  const [documentsData, setdocumentsData] = useState([]);

  function getdata() {
    Axios.get(`${documents}`).then((res) => {
      setdocumentsData(res.data);
      console.log(res).catch((err) => {
        console.log(err);
      });
    });
  }
  useEffect(() => {
    getdata();
  }, []);
  console.log(documentsData);

  return { documentsData };
}

export default useDocuments;
