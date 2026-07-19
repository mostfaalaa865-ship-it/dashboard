import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { forms } from "../../Api/Api";

function useGetForm(id) {
  const [form, setForm] = useState();
  useEffect(() => {
    Axios.get(`${forms}/${id}`)
      .then((res) => {
        console.log(res);
        setForm(res.data.form);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return form;
}

export default useGetForm;
