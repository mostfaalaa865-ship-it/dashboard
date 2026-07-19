import React, { useContext } from "react";
import { forms } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useCreateForm(setShowModal) {
  const { setRefresh } = useContext(ReRender);
  function CreateForm(data) {
    Axios.post(`${forms}`, data)
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setRefresh((prev) => ({ ...prev, form: prev.form + 1 }));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return CreateForm;
}

export default useCreateForm;
